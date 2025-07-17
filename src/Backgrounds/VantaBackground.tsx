import React, { useRef, useEffect } from "react";
import NET from "vanta/dist/vanta.net.min";
import * as THREE from "three";

const VantaBackground: React.FC = () => {
  const vantaRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let vantaEffect: any;
    if (vantaRef.current) {
      vantaEffect = NET({
        el: vantaRef.current,
        THREE,
        mouseControls: true,
        touchControls: true,
        minHeight: 200.00,
        minWidth: 200.00,
        scale: 1.00,
        scaleMobile: 1.00,
        color: 0xff8c00, // solid orange
        backgroundColor: 0x0a0b0d, // black
        points: 8, // fewer points for subtlety
        maxDistance: 20.0, // shorter lines
        spacing: 18.0, // more space between points
        showDots: true,
        showLines: true,
        // Subtle movement
        gyroControls: false,
        mouseEase: 0.1,
        mouseMax: 0.2,
        // Lower animation speed
        animationDuration: 1.5,
      });
    }
    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, []);
  return <div ref={vantaRef} style={{ width: "100vw", height: "100vh", position: "fixed", top: 0, left: 0, zIndex: 0 }} />;
};

export default VantaBackground; 