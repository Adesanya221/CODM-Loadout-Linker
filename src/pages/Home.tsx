import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Particles from '../Backgrounds/Particles';
import '../Backgrounds/Particles.css';
import { GiPistolGun, GiHelicopter } from "react-icons/gi";
import { MdBolt } from "react-icons/md";
import { motion, AnimatePresence } from 'framer-motion';

export default function Home() {
  const features = [
    {
      icon: <GiPistolGun className="text-4xl mb-4 text-codm-orange flex justify-center" />,
      title: 'Weapon Builder',
      desc: 'Choose from all available weapons and customize with attachments',
    },
    {
      icon: <MdBolt className="text-4xl mb-4 text-codm-orange flex justify-center" />,
      title: 'Perk Selection',
      desc: 'Select the perfect combination of red, green, and blue perks',
    },
    {
      icon: <GiHelicopter className="text-4xl mb-4 text-codm-orange flex justify-center" />,
      title: 'Scorestreaks',
      desc: 'Equip powerful scorestreaks to dominate the battlefield',
    },
  ];
  const [featureIdx, setFeatureIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const prevFeature = () => {
    setFeatureIdx((i) => (i === 0 ? features.length - 1 : i - 1));
    setPaused(true);
  };
  const nextFeature = () => {
    setFeatureIdx((i) => (i === features.length - 1 ? 0 : i + 1));
    setPaused(true);
  };

  useEffect(() => {
    if (!paused) {
      intervalRef.current = setInterval(() => {
        setFeatureIdx((i) => (i === features.length - 1 ? 0 : i + 1));
      }, 3000);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [paused, features.length]);

  // Resume auto-loop after 10s of no interaction
  useEffect(() => {
    if (paused) {
      const timeout = setTimeout(() => setPaused(false), 10000);
      return () => clearTimeout(timeout);
    }
  }, [paused]);

  // Animation variants
  const heroVariants = {
    hidden: { opacity: 0, y: -40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };
  const heroChild = {
    hidden: { opacity: 0, y: 20, scale: 0.98 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.7 } },
  };
  const featureGridVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.15 } },
  };
  const featureCardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <div>
      {/* Hero Section */}
      <motion.div
        className="relative overflow-hidden"
        variants={heroVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="relative z-10 container mx-auto px-4 py-16 sm:py-24">
          <div className="text-center max-w-4xl mx-auto">
            <motion.h1
              className="text-4xl sm:text-6xl lg:text-7xl font-bold text-codm-orange mb-6 font-orbitron animate-glow"
              variants={heroChild}
            >
              CODM LOADOUT LINKER
            </motion.h1>
            <motion.p
              className="text-xl sm:text-2xl text-white mb-8 font-rajdhani"
              variants={heroChild}
            >
              Create, customize, and share your ultimate Call of Duty: Mobile loadouts
            </motion.p>
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 justify-center max-w-xs mx-auto mb-8"
              variants={heroChild}
            >
              <Link to="/loadouts">
                <motion.button
                  className="codm-button text-lg px-8 py-4 w-full"
                  whileHover={{ scale: 1.07, boxShadow: '0 0 16px #ff8c00' }}
                  whileTap={{ scale: 0.97 }}
                  type="button"
                >
                  BUILD LOADOUT
                </motion.button>
              </Link>
              <Link to="/signup">
                <motion.button
                  className="border border-codm-orange text-codm-orange hover:bg-codm-orange hover:text-codm-dark text-lg px-8 py-4 bg-transparent w-full"
                  whileHover={{ scale: 1.07, boxShadow: '0 0 16px #ff8c00' }}
                  whileTap={{ scale: 0.97 }}
                  type="button"
                >
                  GET STARTED
                </motion.button>
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Features Section */}
      <motion.div
        className="container mx-auto px-4 py-16"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={featureGridVariants}
      >
        <motion.h2
          className="text-3xl sm:text-4xl font-bold text-center text-codm-orange mb-12 font-orbitron"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ delay: 0.1, duration: 0.7 }}
        >
          FEATURES
        </motion.h2>
        {/* Carousel for mobile, grid for md+ */}
        <div className="block md:hidden">
          <div className="relative flex items-center justify-center">
            <button
              aria-label="Previous feature"
              onClick={prevFeature}
              className="absolute left-0 z-10 p-2 bg-codm-dark/80 rounded-full text-codm-orange hover:bg-codm-orange hover:text-codm-dark transition-colors"
            >
              &#8592;
            </button>
            <div className="w-full">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={featureIdx}
                  initial={{ opacity: 0, scale: 0.95, x: 40 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.95, x: -40 }}
                  transition={{ duration: 0.5 }}
                  className="w-full"
                >
                  <Card className="codm-card w-full max-w-xs mx-auto">
                    <div className="p-6 text-center">
                      {features[featureIdx].icon}
                      <h3 className="text-xl font-semibold text-codm-orange mb-3">{features[featureIdx].title}</h3>
                      <p className="text-gray-300">{features[featureIdx].desc}</p>
                    </div>
                  </Card>
                </motion.div>
              </AnimatePresence>
            </div>
            <button
              aria-label="Next feature"
              onClick={nextFeature}
              className="absolute right-0 z-10 p-2 bg-codm-dark/80 rounded-full text-codm-orange hover:bg-codm-orange hover:text-codm-dark transition-colors"
            >
              &#8594;
            </button>
          </div>
          <div className="flex justify-center gap-2 mt-4">
            {features.map((_, i) => (
              <span
                key={i}
                className={`inline-block w-2 h-2 rounded-full ${i === featureIdx ? 'bg-codm-orange' : 'bg-gray-500'}`}
              />
            ))}
          </div>
        </div>
        <motion.div className="hidden md:grid grid-cols-3 gap-8" variants={featureGridVariants}>
          {features.map((f, i) => (
            <motion.div
              key={i}
              variants={featureCardVariants}
              whileHover={{ scale: 1.07, boxShadow: '0 0 16px #ff8c00' }}
              whileTap={{ scale: 0.97 }}
            >
              <Card className="codm-card hover:border-codm-orange/50 transition-all duration-300">
                <div className="p-6 text-center">
                  {f.icon}
                  <h3 className="text-xl font-semibold text-codm-orange mb-3">{f.title}</h3>
                  <p className="text-gray-300">{f.desc}</p>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
} 