"use client";

import { motion } from "framer-motion";
import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "solid" | "outline";
type ButtonSize = "default" | "sm" | "lg";

const variantStyles: Record<ButtonVariant, string> = {
  solid: cn(
    "bg-white text-jeton-green",
    "hover:bg-white/95",
    "focus:ring-white focus:ring-offset-jeton-green"
  ),
  outline: cn(
    "bg-transparent text-white",
    "border-2 border-[#86efac]/50",
    "hover:border-[#86efac]/70 hover:bg-[#86efac]/10",
    "focus:ring-[#86efac]/40 focus:ring-offset-jeton-green"
  ),
};

const sizeStyles: Record<ButtonSize, string> = {
  default: "px-6 py-3",
  sm: "px-4 py-2",
  lg: "px-8 py-4",
};

const baseStyles = cn(
  "relative cursor-pointer",
  "text-sm font-medium",
  "rounded-xl",
  "transition-colors duration-200",
  "focus:outline-none focus:ring-2 focus:ring-offset-2",
  "disabled:pointer-events-none disabled:opacity-50"
);

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "solid", size = "default", children, type = "button", disabled, onClick, ...props }, ref) => {
    return (
      <motion.button
        ref={ref}
        type={type}
        disabled={disabled}
        onClick={onClick}
        whileHover={{ scale: 0.97 }}
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.2, ease: [0.33, 1, 0.68, 1] }}
        className={cn(baseStyles, variantStyles[variant], sizeStyles[size], className)}
        aria-label={props["aria-label"]}
        aria-haspopup={props["aria-haspopup"]}
      >
        <span className="inline-flex items-center gap-2">{children}</span>
      </motion.button>
    );
  }
);

Button.displayName = "Button";

export interface ButtonLinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

const ButtonLink = forwardRef<HTMLAnchorElement, ButtonLinkProps>(
  ({ className, variant = "solid", size = "default", children, href, ...props }, ref) => {
    return (
      <motion.a
        ref={ref}
        href={href}
        whileHover={{ scale: 0.97 }}
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.2, ease: [0.33, 1, 0.68, 1] }}
        className={cn(baseStyles, variantStyles[variant], sizeStyles[size], className)}
      >
        <span className="inline-flex items-center gap-2">{children}</span>
      </motion.a>
    );
  }
);

ButtonLink.displayName = "ButtonLink";

export { Button, ButtonLink };
