import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { useTheme } from "../../providers/theme/ThemeProvider";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { theme } = useTheme();

  return (
    <div
      style={{
        backgroundColor: theme.colors.background,
        color: theme.colors.text,
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Header />
      <main style={{ flex: 1 }}>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
