import * as React from "react";
import { cn } from "@/lib/utils";

const badgeVariants = {
  default: "bg-axiom-card border-axiom-border text-white",
  green: "bg-axiom-green/10 text-axiom-green border-axiom-green/20",
  red: "bg-axiom-red/10 text-axiom-red border-axiom-red/20",
  blue: "bg-axiom-cyan/10 text-axiom-cyan border-axiom-cyan/20",
  outline: "border border-axiom-border bg-transparent text-axiom-muted"
};

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: keyof typeof badgeVariants;
}

export function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <div className={cn("inline-flex items-center rounded-md border px-1.5 py-0.5 text-[10px] font-medium transition-colors", badgeVariants[variant], className)} {...props} />
  );
}