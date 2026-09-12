"use client";

import React, { forwardRef } from "react";
import { motion, useReducedMotion, type HTMLMotionProps } from "motion/react";

export type ButtonVariant = "primary" | "secondary" | "link" | "icon" | "subtle-icon";
export type ButtonSize = "default" | "sm" | "icon";

interface BaseButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  animateIcon?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export type ButtonAsButton = BaseButtonProps &
  Omit<HTMLMotionProps<"button">, keyof BaseButtonProps | "href"> & {
    href?: undefined;
  };

export type ButtonAsAnchor = BaseButtonProps &
  Omit<HTMLMotionProps<"a">, keyof BaseButtonProps> & {
    href: string;
  };

export type ButtonProps = ButtonAsButton | ButtonAsAnchor;

const sizeStyles: Record<ButtonSize, string> = {
  default: "min-h-11 px-5 text-sm gap-2",
  sm: "min-h-10 px-4 text-sm gap-2",
  icon: "size-9 sm:size-10 p-0 justify-center",
};

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "border border-portfolio-ink bg-portfolio-ink text-portfolio-surface hover:bg-[#252825] hover:border-[#252825] active:bg-portfolio-ink",
  secondary:
    "border border-portfolio-line bg-portfolio-surface text-portfolio-ink hover:border-portfolio-ink hover:bg-portfolio-ink/[0.04] active:bg-portfolio-ink/[0.08]",
  link: "border-0 bg-transparent p-0 text-portfolio-ink hover:text-portfolio-accent h-auto",
  icon: "border border-portfolio-line bg-portfolio-surface text-portfolio-ink hover:border-portfolio-ink hover:bg-portfolio-ink/[0.04] active:bg-portfolio-ink/[0.08]",
  "subtle-icon":
    "border border-portfolio-line/25 bg-transparent text-[#343632] hover:border-portfolio-line/60 hover:bg-portfolio-ink/[0.05] hover:text-portfolio-ink active:bg-portfolio-ink/[0.08]",
};

export const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  function Button(props, ref) {
    const shouldReduceMotion = useReducedMotion();

    const {
      variant = "primary",
      size = "default",
      icon,
      iconPosition = "right",
      animateIcon = true,
      className = "",
      children,
      style,
    } = props;

    const isIconVariant = variant === "icon" || variant === "subtle-icon";
    const tapScale = variant === "subtle-icon" ? 0.97 : variant === "icon" ? 0.93 : 0.97;

    const baseClasses =
      "group inline-flex items-center justify-center font-medium select-none rounded-portfolio transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-portfolio-accent disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none";

    const resolvedSize = isIconVariant || variant === "link" ? "" : sizeStyles[size];
    const resolvedVariant = variantStyles[variant];
    const combinedClasses = `${baseClasses} ${resolvedSize} ${resolvedVariant} ${
      isIconVariant ? sizeStyles.icon : ""
    } ${className}`.trim();

    // High-contrast guarantee for primary buttons against global CSS a { color: inherit }
    const primaryColorStyle =
      variant === "primary"
        ? { color: "var(--color-portfolio-surface, #fffefa)" }
        : undefined;

    const mergedStyle = {
      ...primaryColorStyle,
      ...style,
    };

    const iconAnimationClass = animateIcon
      ? "transition-transform duration-150 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
      : "";

    const renderedIcon = icon ? (
      <span aria-hidden="true" className={`inline-flex shrink-0 ${iconAnimationClass}`}>
        {icon}
      </span>
    ) : null;

    const content = (
      <>
        {icon && iconPosition === "left" ? renderedIcon : null}
        {children ? <span>{children}</span> : null}
        {icon && iconPosition === "right" ? renderedIcon : null}
      </>
    );

    const motionWhileTap = shouldReduceMotion ? undefined : { scale: tapScale };
    const motionTransition = shouldReduceMotion ? undefined : { duration: 0.15, ease: "easeOut" as const };

    if ("href" in props && typeof props.href === "string") {
      const {
        href,
        target,
        rel,
        variant: _v,
        size: _s,
        icon: _i,
        iconPosition: _ip,
        animateIcon: _ai,
        className: _cn,
        children: _ch,
        style: _st,
        ...restAnchorProps
      } = props;

      const isExternal = href.startsWith("http");
      const resolvedRel = rel || (isExternal ? "noopener noreferrer" : undefined);
      const resolvedTarget = target || (isExternal ? "_blank" : undefined);

      return (
        <motion.a
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={href}
          target={resolvedTarget}
          rel={resolvedRel}
          style={mergedStyle}
          className={combinedClasses}
          whileTap={motionWhileTap}
          transition={motionTransition}
          {...restAnchorProps}
        >
          {content}
        </motion.a>
      );
    }

    const {
      type = "button",
      variant: _v,
      size: _s,
      icon: _i,
      iconPosition: _ip,
      animateIcon: _ai,
      className: _cn,
      children: _ch,
      style: _st,
      ...restButtonProps
    } = props as ButtonAsButton;

    return (
      <motion.button
        ref={ref as React.Ref<HTMLButtonElement>}
        type={type}
        style={mergedStyle}
        className={combinedClasses}
        whileTap={motionWhileTap}
        transition={motionTransition}
        {...restButtonProps}
      >
        {content}
      </motion.button>
    );
  },
);

Button.displayName = "Button";

export default Button;
