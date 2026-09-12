export const profile = {
  name: "Amarnath Sharma",
  role: "Software Developer",
  location: "Faridabad, India",
  phone: "+91 8076580612",
  email: "612amar@gmail.com",
  portfolio: "https://amar-295.me",
  portfolioLabel: "amar-295.me",
  statement:
    "Full-stack MERN developer building responsive React interfaces, REST APIs, database-backed products, and AI-integrated tools.",
  sidebarStatement:
    "Software developer focused on clean UI, reliable APIs, and practical product engineering.",
};

export const person = profile;

export const contact = {
  email: profile.email,
  location: profile.location,
  phone: profile.phone,
};

export const socials = [
  {
    label: "GitHub",
    href: "https://github.com/amar-295",
    display: "github.com/amar-295",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/amarnath-webdev",
    display: "linkedin.com/in/amarnath-webdev",
  },
] as const;

export const navigation = [
  { label: "About", href: "#about" },
  { label: "Work", href: "#work" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export const resumeHref = "/Amarnath_Sharma_Resume.pdf";

export const about = [
  "I am a BCA student and full-stack developer with hands-on production experience building React.js UI components from Figma designs and integrating REST APIs during a Software Developer Internship at Welldone Healthcare Private Limited.",
  "My current work centers on responsive UI engineering, REST API design, JWT authentication, database schema modeling, debugging, and GenAI tooling where it solves a real product problem.",
];

export const skills = {
  core: [
    "React.js",
    "Next.js",
    "TypeScript",
    "Node.js",
    "Express.js",
    "MongoDB",
    "PostgreSQL",
    "Tailwind CSS",
  ],
  backend: [
    "REST APIs",
    "JWT Auth",
    "Mongoose",
    "Prisma",
    "FastAPI",
    "Middleware Design",
  ],
  tooling: [
    "AWS Amplify",
    "Vercel",
    "Render",
    "Postman",
    "Git",
    "Figma-to-Web",
  ],
  ai: ["Groq LLM API", "Tavily API", "Prompt Engineering"],
};

export type Project = {
  number: string;
  title: string;
  problem: string;
  description: string;
  technologies: string[];
  architecture: string;
  outcome: string;
  image: string;
  imageAlt: string;
  githubUrl: string;
  liveUrl: string | null;
  featured: boolean;
};

export const projects: Project[] = [
  {
    number: "01",
    title: "CRM",
    problem:
      "Managing clients, projects, and tasks across different tools made it difficult to keep track of who was working on what.",
    description:
      "A CRM and project management application with separate workflows for admins, project managers, and developers. It covers client and project management, task assignment and status updates, overdue tasks, and live notifications.",
    technologies: [
      "React",
      "TypeScript",
      "Express.js",
      "Prisma",
      "PostgreSQL",
      "Socket.IO",
      "JWT",
    ],
    architecture:
      "The frontend is a Vite/React application that communicates with an Express REST API. Prisma handles the database layer with PostgreSQL, while Socket.IO is used to push task and notification updates to connected users.",
    outcome:
      "Built the main workflows for managing clients, projects, and tasks from creation through completion, with role-based access and real-time updates for changes that need to reach other users.",
    image: "/projects/crm.webp",
    imageAlt:
      "Product-style CRM interface visual showing customer records, task workflow, and business status panels.",
    githubUrl: "https://github.com/amar-295/crm",
    liveUrl: "https://crm-xi-steel-34.vercel.app/login",
    featured: true,
  },
  {
    number: "02",
    title: "Research Synthesizer",
    problem:
      "Researching a topic across several sources means jumping between tabs, notes, and documents, then organizing the useful information afterward.",
    description:
      "A research tool that searches the web, summarizes individual sources, combines the findings, and turns the result into Markdown notes that can be imported directly into Obsidian.",
    technologies: [
      "React",
      "Vite",
      "FastAPI",
      "Python",
      "Groq",
      "Tavily",
      "IndexedDB",
      "JSZip",
      "Vercel",
      "Render",
    ],
    architecture:
      "The React/Vite frontend handles the research interface and stores previous results in IndexedDB. A FastAPI backend manages web searches through Tavily and sends the sources to Groq for individual and combined summaries. Markdown and ZIP files are generated in the browser with JSZip, so the server doesn't need to handle exported files.",
    outcome:
      "The tool can run research at three depths — Quick, Standard, and Deep — using 3–7 sources. Results can be saved locally and exported as an Obsidian-ready ZIP containing Markdown files with YAML frontmatter and wikilinks.",
    image: "/projects/research-synthesizer.webp",
    imageAlt:
      "Product-style research synthesizer interface visual showing sources, synthesis pipeline, and structured Obsidian export.",
    githubUrl: "https://github.com/amar-295/Research-Synthesizer",
    liveUrl: "https://research-synthesizer-gamma.vercel.app",
    featured: true,
  },
  {
    number: "03",
    title: "ChangelogHub",
    problem:
      "Publishing product updates can get messy when releases, drafts, and subscriber communication are handled in different places.",
    description:
      "A changelog platform where teams can create workspaces, write and edit releases, save drafts, publish updates, and share them through public changelog pages.",
    technologies: [
      "React",
      "Vite",
      "Express.js",
      "MongoDB",
      "Mongoose",
      "TipTap",
      "React Query",
      "JWT",
    ],
    architecture:
      "The React frontend uses React Query to manage API data and caching, while an Express backend handles authentication, workspaces, releases, and subscribers. Mongoose models the application data and keeps workspace-related content separated between users and teams.",
    outcome:
      "Built the core workflow from drafting a release to publishing it publicly, including workspace management, release versions and statuses, TipTap rich-text editing, public changelog routes, and subscriber handling.",
    image: "/projects/changeloghub.webp",
    imageAlt:
      "Product-style changelog interface visual showing release history, version cards, and publishing workflow.",
    githubUrl: "https://github.com/amar-295/changelog-hub",
    liveUrl: "https://changelog-hub.vercel.app/",
    featured: true,
  },
];

export type Experience = {
  company: string;
  role: string;
  startDate: string;
  endDate: string;
  location: string;
  description: string;
  achievements: string[];
  technologies: string[];
};

export const experience: Experience[] = [
  {
    company: "Welldone Healthcare Private Limited",
    role: "Software Developer Intern",
    startDate: "Apr 2026",
    endDate: "Jul 2026",
    location: "Remote",
    description:
      "Worked on production React interfaces, Figma-to-web implementation, REST API integration, and AWS Amplify frontend deployments.",
    achievements: [
      "Engineered responsive React.js UI components from Figma design files across desktop and mobile breakpoints.",
      "Integrated REST APIs into production React interfaces with loading and error states for more reliable data display.",
      "Identified and resolved UI and functional bugs using Chrome DevTools and React DevTools.",
      "Monitored frontend deployments via AWS Amplify and collaborated through daily sprint meetings.",
    ],
    technologies: ["React.js", "Figma-to-Web", "REST APIs", "AWS Amplify"],
  },
];

export const education = [
  {
    institution: "DAV Centenary College, Faridabad",
    affiliation: "MDU Rohtak",
    program: "Bachelor of Computer Applications (BCA)",
    startDate: "2024",
    endDate: "2027",
  },
];

export type Achievement = {
  title: string;
  url?: string;
};

export const achievements: Achievement[] = [
  {
    title: "Top 10 — UnvibeCode Engineering Challenge 2026",
    url: "https://github.com/FinanceFlash/unvibecode/blob/main/docs/OSS_Contributor_Credentials/UVC26-TOP10-010.md",
  },
];
