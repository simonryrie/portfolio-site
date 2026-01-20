import { ThemeProvider } from "../context/ThemeContext";

type ThemedLayoutProps = {
  children: React.ReactNode;
};

export function ThemedLayout({ children }: ThemedLayoutProps) {
  return <ThemeProvider>{children}</ThemeProvider>;
}
