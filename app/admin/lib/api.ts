export interface AdminUser {
  id: string;
  email: string;
}

export interface AdminAuthResponse {
  admin: AdminUser;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export type OverviewRange = '7d' | '30d' | 'all';

export interface OverviewKpis {
  unreadFeedback: number;
  unreadContacts: number;
  totalSessions: number;
  totalEvents: number;
}

export interface OverviewFeedbackBreakdown {
  new: number;
  read: number;
  archived: number;
  total: number;
}

export interface OverviewContactBreakdown {
  new: number;
  read: number;
  archived: number;
  total: number;
}

export interface OverviewHighIntentClicks {
  resume: number;
  github: number;
  linkedin: number;
  liveDemo: number;
}

export interface OverviewRecentActivityItem {
  type: string;
  title: string;
  timestamp: string;
}

export interface OverviewData {
  range: OverviewRange;
  kpis: OverviewKpis;
  feedbackBreakdown: OverviewFeedbackBreakdown;
  contactBreakdown: OverviewContactBreakdown;
  highIntentClicks: OverviewHighIntentClicks;
  recentActivity: OverviewRecentActivityItem[];
}

export interface OverviewApiResponse {
  success: boolean;
  data: OverviewData;
}

export type FeedbackStatus = 'NEW' | 'READ' | 'ARCHIVED';

export interface AdminFeedbackItem {
  id: string;
  whatBroughtYouHere: string;
  anythingYouSuggest: string;
  status: FeedbackStatus;
  createdAt: string;
}

export interface FeedbackPagination {
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
}

export interface AdminFeedbackData {
  items: AdminFeedbackItem[];
  pagination: FeedbackPagination;
}

export interface AdminFeedbackApiResponse {
  success: boolean;
  data: AdminFeedbackData;
}

export interface AdminFeedbackUpdateApiResponse {
  success: boolean;
  data: AdminFeedbackItem;
}

export type ContactStatus = 'NEW' | 'READ' | 'ARCHIVED';

export interface AdminContactItem {
  id: string;
  name: string;
  email: string;
  message: string;
  status: ContactStatus;
  createdAt: string;
}

export interface ContactPagination {
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
  hasNextPage?: boolean;
  hasPreviousPage?: boolean;
}

export interface AdminContactData {
  items: AdminContactItem[];
  pagination: ContactPagination;
}

export interface AdminContactApiResponse {
  success: boolean;
  data: AdminContactData;
}

export interface AdminContactUpdateApiResponse {
  success: boolean;
  data: AdminContactItem;
}

export type AnalyticsRange = '7d' | '30d' | 'all';

export interface AnalyticsEventTypeCount {
  eventType: string;
  count: number;
}

export interface AnalyticsTopSection {
  section: string;
  count: number;
}

export interface AnalyticsTopProject {
  projectId: string;
  projectTitle: string;
  count: number;
}

export interface AnalyticsOutboundClicks {
  resume: number;
  github: number;
  linkedin: number;
  liveDemo: number;
}

export interface AdminAnalyticsData {
  range: AnalyticsRange;
  eventsByType: AnalyticsEventTypeCount[];
  topSections: AnalyticsTopSection[];
  topProjects: AnalyticsTopProject[];
  outboundClicks: AnalyticsOutboundClicks;
}

export interface AdminAnalyticsApiResponse {
  success: boolean;
  data: AdminAnalyticsData;
}

export class ApiError extends Error {
  public readonly status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

function getApiBaseUrl(): string {
  const envUrl = process.env.NEXT_PUBLIC_API_URL;
  if (envUrl) {
    return envUrl.replace(/\/+$/, '');
  }
  if (process.env.NODE_ENV === 'production') {
    throw new Error('NEXT_PUBLIC_API_URL environment variable is required in production');
  }
  return 'http://localhost:5000';
}

export async function loginAdmin(credentials: LoginCredentials): Promise<AdminUser> {
  const baseUrl = getApiBaseUrl();

  let response: Response;
  try {
    response = await fetch(`${baseUrl}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(credentials),
    });
  } catch {
    throw new ApiError('Unable to connect to server. Please verify your connection.', 0);
  }

  if (response.status === 401) {
    throw new ApiError('Invalid email or password', 401);
  }

  if (response.status === 429) {
    throw new ApiError('Too many login attempts. Please try again later.', 429);
  }

  if (!response.ok) {
    throw new ApiError('Login failed. Please try again.', response.status);
  }

  const data = (await response.json()) as AdminAuthResponse;
  return data.admin;
}

export async function getAdminMe(): Promise<AdminUser | null> {
  const baseUrl = getApiBaseUrl();

  let response: Response;
  try {
    response = await fetch(`${baseUrl}/api/auth/me`, {
      method: 'GET',
      credentials: 'include',
    });
  } catch {
    throw new ApiError('Unable to verify session with server.', 0);
  }

  if (response.status === 401) {
    return null;
  }

  if (!response.ok) {
    return null;
  }

  const data = (await response.json()) as AdminAuthResponse;
  return data.admin;
}

export async function logoutAdmin(): Promise<void> {
  const baseUrl = getApiBaseUrl();

  let response: Response;
  try {
    response = await fetch(`${baseUrl}/api/auth/logout`, {
      method: 'POST',
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
      },
      credentials: 'include',
    });
  } catch {
    throw new ApiError('Unable to reach server to complete logout.', 0);
  }

  if (!response.ok && response.status !== 401) {
    throw new ApiError('Logout failed. Please try again.', response.status);
  }
}

export async function getAdminOverview(range: OverviewRange = '30d'): Promise<OverviewData> {
  const baseUrl = getApiBaseUrl();

  let response: Response;
  try {
    response = await fetch(`${baseUrl}/api/admin/overview?range=${range}`, {
      method: 'GET',
      credentials: 'include',
    });
  } catch {
    throw new ApiError('Unable to connect to server. Please verify your connection.', 0);
  }

  if (response.status === 401) {
    throw new ApiError('Authentication required', 401);
  }

  if (!response.ok) {
    throw new ApiError('Unable to load overview data.', response.status);
  }

  const json = (await response.json()) as OverviewApiResponse;
  return json.data;
}

export async function getAdminFeedback(page = 1, pageSize = 20): Promise<AdminFeedbackData> {
  const baseUrl = getApiBaseUrl();

  let response: Response;
  try {
    response = await fetch(`${baseUrl}/api/admin/feedback?page=${page}&pageSize=${pageSize}`, {
      method: 'GET',
      credentials: 'include',
    });
  } catch {
    throw new ApiError('Unable to connect to server. Please verify your connection.', 0);
  }

  if (response.status === 401) {
    throw new ApiError('Authentication required', 401);
  }

  if (!response.ok) {
    throw new ApiError('Unable to load feedback data.', response.status);
  }

  const json = (await response.json()) as AdminFeedbackApiResponse;
  return json.data;
}

export async function updateAdminFeedbackStatus(
  id: string,
  status: FeedbackStatus
): Promise<AdminFeedbackItem> {
  const baseUrl = getApiBaseUrl();

  let response: Response;
  try {
    response = await fetch(`${baseUrl}/api/admin/feedback/${encodeURIComponent(id)}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
      },
      credentials: 'include',
      body: JSON.stringify({ status }),
    });
  } catch {
    throw new ApiError('Unable to connect to server. Please verify your connection.', 0);
  }

  if (response.status === 401) {
    throw new ApiError('Authentication required', 401);
  }

  if (response.status === 403) {
    throw new ApiError('Action forbidden. CSRF or permission error.', 403);
  }

  if (response.status === 404) {
    throw new ApiError('Feedback item not found.', 404);
  }

  if (!response.ok) {
    throw new ApiError('Failed to update feedback status.', response.status);
  }

  const json = (await response.json()) as AdminFeedbackUpdateApiResponse;
  return json.data;
}

export async function getAdminContact(page = 1, pageSize = 20): Promise<AdminContactData> {
  const baseUrl = getApiBaseUrl();

  let response: Response;
  try {
    response = await fetch(`${baseUrl}/api/admin/contact?page=${page}&pageSize=${pageSize}`, {
      method: 'GET',
      credentials: 'include',
    });
  } catch {
    throw new ApiError('Unable to connect to server. Please verify your connection.', 0);
  }

  if (response.status === 401) {
    throw new ApiError('Authentication required', 401);
  }

  if (!response.ok) {
    throw new ApiError('Unable to load contact data.', response.status);
  }

  const json = (await response.json()) as AdminContactApiResponse;
  return json.data;
}

export async function updateAdminContactStatus(
  id: string,
  status: ContactStatus
): Promise<AdminContactItem> {
  const baseUrl = getApiBaseUrl();

  let response: Response;
  try {
    response = await fetch(`${baseUrl}/api/admin/contact/${encodeURIComponent(id)}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
      },
      credentials: 'include',
      body: JSON.stringify({ status }),
    });
  } catch {
    throw new ApiError('Unable to connect to server. Please verify your connection.', 0);
  }

  if (response.status === 401) {
    throw new ApiError('Authentication required', 401);
  }

  if (response.status === 403) {
    throw new ApiError('Action forbidden. CSRF or permission error.', 403);
  }

  if (response.status === 404) {
    throw new ApiError('Contact submission not found.', 404);
  }

  if (!response.ok) {
    throw new ApiError('Failed to update contact status.', response.status);
  }

  const json = (await response.json()) as AdminContactUpdateApiResponse;
  return json.data;
}

export async function getAdminAnalytics(range: AnalyticsRange = '30d'): Promise<AdminAnalyticsData> {
  const baseUrl = getApiBaseUrl();

  let response: Response;
  try {
    response = await fetch(`${baseUrl}/api/admin/analytics?range=${range}`, {
      method: 'GET',
      credentials: 'include',
    });
  } catch {
    throw new ApiError('Unable to connect to server. Please verify your connection.', 0);
  }

  if (response.status === 401) {
    throw new ApiError('Authentication required', 401);
  }

  if (!response.ok) {
    throw new ApiError('Unable to load analytics data.', response.status);
  }

  const json = (await response.json()) as AdminAnalyticsApiResponse;
  return json.data;
}
