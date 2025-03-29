import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";

interface CardProps extends Omit<HTMLMotionProps<"div">, "children"> {
  title?: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export function Card({
  title,
  icon,
  children,
  className = "",
  hover = true,
  ...props
}: CardProps) {
  return (
    <motion.div
      className={`bg-[rgb(var(--card))] text-[rgb(var(--card-foreground))] rounded-lg border border-[rgb(var(--border))] shadow-sm ${
        hover ? "hover:shadow-md transition-shadow" : ""
      } ${className}`}
      {...props}
    >
      {(title || icon) && (
        <div className="flex flex-row items-center space-x-2 p-6 pb-2">
          {icon && <div className="text-[rgb(var(--primary))]">{icon}</div>}
          {title && <h3 className="text-lg font-semibold">{title}</h3>}
        </div>
      )}
      <div className={`${title || icon ? "px-6 pb-6 pt-2" : "p-6"}`}>
        {children}
      </div>
    </motion.div>
  );
}

export function CardGrid({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${className}`}>
      {children}
    </div>
  );
} 