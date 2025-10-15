import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuthContext } from "@/contexts/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import React, { useState } from "react";
import { FaBars } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
  const { currentUser, logout } = useAuthContext();
  const [showModal, setShowModal] = useState(false);
  const [loadoutInput, setLoadoutInput] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  async function handleLogout() {
    try {
      await logout();
      toast.success("Logged out successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to log out");
    }
  }

  function getInitials(name: string) {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  }

  function handleViewSharedLoadout(e: React.FormEvent) {
    e.preventDefault();
    let id = loadoutInput.trim();
    // If user pasted a full URL, extract the ID
    const match = id.match(/loadout\/(.+)$/);
    if (match) id = match[1];
    if (id) {
      setShowModal(false);
      setLoadoutInput("");
      navigate(`/loadout/${id}`);
    } else {
      toast.error("Please enter a valid loadout ID or link");
    }
  }

  // Animation variants
  const navVariants = {
    hidden: { opacity: 0, y: -32 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };
  const menuItemVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: 0.08 * i, duration: 0.4 } }),
  };
  const mobileMenuVariants = {
    hidden: { opacity: 0, x: '100%' },
    visible: { 
      opacity: 1, 
      x: 0, 
      transition: { 
        duration: 0.3,
        ease: [0.16, 1, 0.3, 1]
      } 
    },
    exit: { 
      opacity: 0, 
      x: '100%', 
      transition: { 
        duration: 0.2,
        ease: [0.4, 0, 0.2, 1]
      } 
    },
  };

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.3 }
    },
    exit: { 
      opacity: 0,
      transition: { duration: 0.2 }
    }
  };

  return (
    <motion.header
      className="sticky top-0 z-[9998] w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
      variants={navVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold flex items-center gap-2">
          <span className="text-primary">CODM</span> Loadout Linker
        </Link>
        {/* Hamburger for mobile */}
        <motion.button
          className="md:hidden p-2 rounded focus:outline-none focus:ring-2 focus:ring-codm-orange"
          onClick={() => setMobileMenuOpen((open) => !open)}
          aria-label="Open navigation menu"
          animate={{ rotate: mobileMenuOpen ? 90 : 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <FaBars className="text-2xl text-codm-orange" />
        </motion.button>
        {/* Desktop nav */}
        <nav className="hidden md:block">
          <ul className="flex items-center space-x-6">
            <li>
              <motion.div whileHover={{ scale: 1.07 }} whileTap={{ scale: 0.97 }}>
                <Button
                  className="border border-codm-orange px-4 py-2 rounded-full hover:bg-codm-orange/10 hover:text-codm-orange transition-colors"
                  onClick={() => setShowModal(true)}
                  type="button"
                >
                  View Shared Loadout
                </Button>
              </motion.div>
            </li>
            <li>
              <motion.div whileHover={{ scale: 1.07 }} whileTap={{ scale: 0.97 }}>
                <Link to="/" className="hover:text-primary transition-colors">
                  Home
                </Link>
              </motion.div>
            </li>
            <li>
              <motion.div whileHover={{ scale: 1.07 }} whileTap={{ scale: 0.97 }}>
                <Link to="/about-dev" className="hover:text-primary transition-colors">
                  About the Dev
                </Link>
              </motion.div>
            </li>
            {currentUser ? (
              <li>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.97 }}>
                      <Button variant="ghost" className="relative h-8 w-8 rounded-full" type="button">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={currentUser.photoURL || ""} alt={currentUser.displayName || "User"} />
                          <AvatarFallback>
                            {currentUser.displayName ? getInitials(currentUser.displayName) : "U"}
                          </AvatarFallback>
                        </Avatar>
                      </Button>
                    </motion.div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.25 }}
                    >
                      <div className="flex items-center justify-start gap-2 p-2">
                        <div className="flex flex-col space-y-1 leading-none">
                          {currentUser.displayName && (
                            <p className="font-medium">{currentUser.displayName}</p>
                          )}
                          {currentUser.email && (
                            <p className="w-[200px] truncate text-sm text-muted-foreground">
                              {currentUser.email}
                            </p>
                          )}
                        </div>
                      </div>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link to="/profile" className="w-full">Profile</Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={handleLogout}
                        className="w-full text-red-500 focus:bg-red-50 focus:text-red-600"
                      >
                        Log out
                      </DropdownMenuItem>
                    </motion.div>
                  </DropdownMenuContent>
                </DropdownMenu>
              </li>
            ) : (
              <>
                <li>
                  <Link to="/login">
                    <motion.div whileHover={{ scale: 1.07 }} whileTap={{ scale: 0.97 }}>
                      <Button variant="ghost" type="button">Login</Button>
                    </motion.div>
                  </Link>
                </li>
                <li>
                  <Link to="/signup">
                    <motion.div whileHover={{ scale: 1.07 }} whileTap={{ scale: 0.97 }}>
                      <Button type="button">Sign up</Button>
                    </motion.div>
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-[9999] md:hidden"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={backdropVariants}
            onClick={() => setMobileMenuOpen(false)}
          >
            {/* Backdrop with blur */}
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
            
            {/* Side Menu */}
            <motion.div
              className="fixed top-0 right-0 h-full w-3/4 max-w-xs bg-gradient-to-b from-background/95 to-background/90 backdrop-blur-lg border-l border-border/50 shadow-2xl p-6 overflow-y-auto z-[10000]"
              variants={mobileMenuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-muted transition-colors"
                aria-label="Close menu"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <div className="h-full flex flex-col">
                <ul className="space-y-2 flex-1">
                  <motion.li variants={menuItemVariants} custom={0}>
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-base px-4 py-6 hover:bg-muted/50 rounded-lg transition-all"
                      onClick={() => {
                        setShowModal(true);
                        setMobileMenuOpen(false);
                      }}
                    >
                      <span className="flex items-center gap-3">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        View Shared Loadout
                      </span>
                    </Button>
                  </motion.li>
                  
                  <motion.li variants={menuItemVariants} custom={1}>
                    <Link
                      to="/loadout/new"
                      className="flex items-center gap-3 w-full text-left px-4 py-6 text-base hover:bg-muted/50 rounded-lg transition-all"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                      Create New Loadout
                    </Link>
                  </motion.li>
                  
                  {currentUser && (
                    <motion.li variants={menuItemVariants} custom={2}>
                      <Link
                        to="/my-loadouts"
                        className="flex items-center gap-3 w-full text-left px-4 py-6 text-base hover:bg-muted/50 rounded-lg transition-all"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                        </svg>
                        My Loadouts
                      </Link>
                    </motion.li>
                  )}
                  
                  <motion.li variants={menuItemVariants} custom={3}>
                    <Link
                      to="/leaderboard"
                      className="flex items-center gap-3 w-full text-left px-4 py-6 text-base hover:bg-muted/50 rounded-lg transition-all"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                      Leaderboard
                    </Link>
                  </motion.li>
                </ul>
                
                {currentUser ? (
                  <motion.div 
                    className="mt-auto pt-6 border-t border-border/30"
                    variants={menuItemVariants}
                    custom={4}
                  >
                    <Button variant="ghost" className="w-full justify-start rounded-md border border-codm-orange/40 hover:text-codm-orange" onClick={() => { handleLogout(); setMobileMenuOpen(false); }}>
                      Log out
                    </Button>
                  </motion.div>
                ) : (
                  <motion.div 
                    className="mt-auto pt-6 border-t border-border/30"
                    variants={menuItemVariants}
                    custom={4}
                  >
                    <div className="space-y-3">
                      <Button
                        variant="outline"
                        className="w-full border-codm-orange text-codm-orange hover:bg-codm-orange/10 hover:text-codm-orange"
                        onClick={() => {
                          navigate("/login");
                          setMobileMenuOpen(false);
                        }}
                      >
                        Sign In
                      </Button>
                      <Button
                        className="w-full bg-codm-orange hover:bg-codm-orange/90"
                        onClick={() => {
                          navigate("/register");
                          setMobileMenuOpen(false);
                        }}
                      >
                        Sign Up
                      </Button>
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Modal for viewing shared loadout */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="bg-background rounded-lg shadow-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4 text-codm-orange">View Shared Loadout</h2>
            <form onSubmit={handleViewSharedLoadout}>
              <input
                type="text"
                className="w-full p-2 rounded border border-codm-orange mb-4 bg-background text-foreground"
                placeholder="Paste loadout link or ID..."
                value={loadoutInput}
                onChange={e => setLoadoutInput(e.target.value)}
                autoFocus
              />
              <div className="flex justify-end gap-2">
                <Button type="button" variant="ghost" onClick={() => setShowModal(false)}>
                  Cancel
                </Button>
                <Button type="submit" className="codm-button">
                  View
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </motion.header>
  );
} 