// Add at the top for module declarations if not present elsewhere
// declare module 'three';
// declare module 'vanta/dist/vanta.net.min';

import React, { useEffect, useRef, ReactNode } from "react";
import * as THREE from "three";
import NET from "vanta/dist/vanta.net.min";
import { Navbar } from "./Navbar";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const vantaRef = useRef<HTMLDivElement>(null);
  const vantaEffect = useRef<any>(null);

  useEffect(() => {
    if (!vantaEffect.current) {
      vantaEffect.current = NET({
        el: vantaRef.current,
        THREE,
        color: 0xffa500, // orange
        backgroundColor: 0x111111, // black
        points: 10.0,
        maxDistance: 25.0,
        spacing: 20.0,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
      });
    }
    return () => {
      if (vantaEffect.current && vantaEffect.current.destroy) vantaEffect.current.destroy();
    };
  }, []);

  return (
    <>
      {/* Vanta background */}
      <div
        ref={vantaRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          zIndex: 0,
          pointerEvents: "none", // allows clicks to pass through
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