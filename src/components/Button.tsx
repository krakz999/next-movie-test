import React from "react";
import { twMerge } from "tailwind-merge";

export default function Button({
  className,
  ...rest
}: React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>) {
  return (
    <button
      {...rest}
      className={twMerge(
        "border border-accent rounded-full px-12 py-2 text-sm font-medium",
        className
      )}
    />
  );
}
