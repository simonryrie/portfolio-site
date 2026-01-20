import { JSX } from "react";

type TypographyProps = {
  as?: keyof JSX.IntrinsicElements;
  variant?: "heading1" | "heading2" | "heading3" | "body" | "caption";
  className?: string;
  children: React.ReactNode;
};

export function Typography({
  as: Component = "p",
  variant = "body",
  className = "",
  children,
}: TypographyProps) {
  const variantClasses = {
    heading1: "text-8xl font-bold font-sans",
    heading2: "text-5xl font-semibold",
    heading3: "text-2xl font-semibold",
    body: "text-base leading-relaxed",
    caption: "text-sm",
  };
  return (
    <Component className={`${variantClasses[variant]} ${className}`}>
      {children}
    </Component>
  );
}
