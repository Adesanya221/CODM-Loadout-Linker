import React from "react";
import { FaLinkedin, FaGithub } from "react-icons/fa";

const AboutDev: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-11 px-4">
      <div className="bg-codm-gray/80 rounded-lg shadow-lg p-8 max-w-xl w-full text-center">
        <img
          src="src/profile/About_dev.jpg"
          alt="Developer profile"
          className="mx-auto mb-4 w-24 h-24 rounded-full object-cover object-top border-4 border-codm-orange shadow bg-codm-dark"
        />
        <h1 className="text-3xl font-bold text-codm-orange mb-4 font-orbitron">About the Developer</h1>
        <div className="flex justify-center gap-4 mb-6">
          <a href="https://www.linkedin.com/in/oluwafisayomi-adesanya-09452922b/" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-codm-orange/20 text-codm-orange font-semibold hover:bg-codm-orange hover:text-codm-dark transition-colors shadow">
            <FaLinkedin className="text-xl" />
            <span className="hidden sm:inline">LinkedIn</span>
          </a>
          <a href="https://github.com/Adesanya221" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-codm-orange/20 text-codm-orange font-semibold hover:bg-codm-orange hover:text-codm-dark transition-colors shadow">
            <FaGithub className="text-xl" />
            <span className="hidden sm:inline">GitHub</span>
          </a>
        </div>
        <p className="text-gray-200 text-lg mb-2">
          Gaming isn’t just for kids—it's for everyone. My passion for gaming and technology inspired me to create this platform, where players of all backgrounds can collaborate, experiment, and showcase their best Call of Duty: Mobile loadouts. CoDM Loadout Linker is designed to help gamers connect, share strategies, and grow together as a community. Whether you’re a casual player or a competitive enthusiast, you’re welcome here!
        </p>
        <div className="flex justify-center gap-3 mt-6">
          <span title="React"><svg className="w-6 h-6" fill="none" viewBox="0 0 32 32"><circle cx="16" cy="16" r="2.5" fill="#61DAFB"/><g stroke="#61DAFB" stroke-width="2" fill="none"><ellipse rx="11" ry="4.2" transform="matrix(.866 .5 -.866 .5 16 16)"/><ellipse rx="11" ry="4.2" transform="matrix(-.866 .5 .866 .5 16 16)"/><ellipse rx="11" ry="4.2" transform="matrix(0 1 -1 0 16 16)"/></g></svg></span>
          <span title="TypeScript"><svg className="w-6 h-6" fill="none" viewBox="0 0 32 32"><rect width="32" height="32" rx="6" fill="#3178C6"/><path d="M13.5 14.5v-2h-7v2h2.5v7h2v-7h2.5zm2.5 7v-2h4.5v-1.5h-4.5v-2h7v2h-4.5v1.5h4.5v2h-7z" fill="#fff"/></svg></span>
          <span title="Tailwind CSS"><svg className="w-6 h-6" fill="none" viewBox="0 0 32 32"><path d="M16 8c-4.418 0-6.627 2.209-6.627 6.627 0 2.209 1.104 3.313 3.313 3.313 1.104 0 1.657-.553 2.209-1.657.553-1.104 1.104-1.657 2.209-1.657 2.209 0 3.313 1.104 3.313 3.313C22.627 21.791 20.418 24 16 24c-4.418 0-6.627-2.209-6.627-6.627" stroke="#38BDF8" stroke-width="2" fill="none"/></svg></span>
          <span title="Supabase"><svg className="w-6 h-6" fill="none" viewBox="0 0 32 32"><rect width="32" height="32" rx="6" fill="#3ECF8E"/><path d="M16 8l8 16h-8l-8-16h8z" fill="#fff"/></svg></span>
          <span title="Gaming"><svg className="w-6 h-6" fill="none" viewBox="0 0 32 32"><rect width="32" height="32" rx="6" fill="#FFA500"/><path d="M10 22v-2h12v2H10zm1-4v-2h10v2H11zm2-4v-2h6v2h-6z" fill="#fff"/></svg></span>
        </div>
      </div>
    </div>
  );
};

export default AboutDev; 