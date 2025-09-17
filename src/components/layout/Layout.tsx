// Add at the top for module declarations if not present elsewhere
// declare module 'three';
// declare module 'vanta/dist/vanta.net.min';

import React, { ReactNode } from "react";
import { Navbar } from "./Navbar";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  // Static background handled via CSS

  return (
    <>
      {/* Static background */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          zIndex: 0,
          pointerEvents: "none",
          background: "radial-gradient(1200px 600px at 10% 10%, rgba(255,140,0,0.15), transparent 60%), radial-gradient(1000px 500px at 90% 20%, rgba(255,165,0,0.12), transparent 55%), linear-gradient(180deg, #0a0b0d 0%, #0a0b0d 100%)",
        }}
      />
      {/* Navbar */}
      <div style={{ position: "relative", zIndex: 2 }}>
        <Navbar />
      </div>
      {/* App content */}
      <div style={{ position: "relative", zIndex: 1 }}>
        {children}
      </div>
    </>
  );
};

export default Layout;