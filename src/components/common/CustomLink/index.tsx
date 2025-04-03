"use client";

import Link from "next/link";

interface CustomLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  target?: "_blank" | "_self" | "_parent" | "_top";
  onClick?: () => void;
  disabled?: boolean;
}

export const CustomLink = ({
  href,
  children,
  className = "",
  target = "_self",
  onClick,
  disabled = false,
}: CustomLinkProps) => {
  const baseClassName =
    "font-medium text-indigo-600 hover:text-indigo-500 transition-colors duration-200";

  if (disabled) {
    return (
      <span
        className={`${baseClassName} opacity-50 cursor-not-allowed ${className}`}
      >
        {children}
      </span>
    );
  }

  return (
    <Link
      href={href}
      className={`${baseClassName} ${className}`}
      target={target}
      onClick={onClick}
    >
      {children}
    </Link>
  );
};
