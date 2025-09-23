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
    hidden: { opacity: 0, y: -24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
    exit: { opacity: 0, y: -24, transition: { duration: 0.3 } },
  };

  return (
    <motion.header
      className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
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
                        <Link to="/profile" className="cursor-pointer">Profile</Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
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
      {/* Mobile nav */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            key="mobile-menu"
            className="md:hidden"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={mobileMenuVariants}
            style={{ overflow: "hidden" }}
          >
            <nav className="bg-background border-t border-codm-orange/30 shadow-lg">
              <ul className="flex flex-col items-center p-4 space-y-4">
                {[
                  { label: "View Shared Loadout", type: "button", onClick: () => { setShowModal(true); setMobileMenuOpen(false); }, className: "w-full rounded-full border-2 border-codm-orange py-2 hover:text-codm-orange", variant: "outline" },
                  { label: "Home", to: "/", className: "block py-2 text-center w-full rounded-full border-2 border-codm-orange hover:bg-codm-orange/10 hover:text-codm-orange transition-colors" },
                  { label: "About the Dev", to: "/about-dev", className: "block py-2 text-center w-full rounded-full border-2 border-codm-orange hover:bg-codm-orange/10 hover:text-codm-orange transition-colors" },
                ].map((item, i) => (
                  <motion.li
                    className="w-full"
                    key={item.label}
                    custom={i}
                    variants={menuItemVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                  >
                    {item.type === "button" ? (
                      <Button variant={item.variant as any} className={item.className} onClick={item.onClick}>{item.label}</Button>
                    ) : (
                      <Link to={item.to!} className={item.className} onClick={() => setMobileMenuOpen(false)}>{item.label}</Link>
                    )}
                  </motion.li>
                ))}
                {currentUser ? (
                  <>
                    <motion.li
                      className="w-full"
                      custom={3}
                      variants={menuItemVariants}
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                    >
                      <Link to="/profile" className="block py-2 text-center w-full rounded-full border-2 border-codm-orange hover:bg-codm-orange/10 hover:text-codm-orange transition-colors" onClick={() => setMobileMenuOpen(false)}>
                        <Button variant="ghost" className="w-full rounded-full hover:text-codm-orange">Profile</Button>
                      </Link>
                    </motion.li>
                    <motion.li
                      className="w-full"
                      custom={4}
                      variants={menuItemVariants}
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                    >
                      <Button variant="ghost" className="w-full rounded-full border-2 border-codm-orange hover:text-codm-orange" onClick={() => { handleLogout(); setMobileMenuOpen(false); }}>
                        Log out
                      </Button>
                    </motion.li>
                  </>
                ) : (
                  <>
                    <motion.li
                      className="w-full"
                      custom={3}
                      variants={menuItemVariants}
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                    >
                      <Link to="/login" className="block py-2 text-center w-full rounded-full border-2 border-codm-orange hover:bg-codm-orange/10 hover:text-codm-orange transition-colors" onClick={() => setMobileMenuOpen(false)}>
                        <Button variant="ghost" className="w-full rounded-full hover:text-codm-orange">Login</Button>
                      </Link>
                    </motion.li>
                    <motion.li
                      className="w-full"
                      custom={4}
                      variants={menuItemVariants}
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                    >
                      <Link to="/signup" className="block py-2 text-center w-full rounded-full border-2 border-codm-orange hover:bg-codm-orange/10 hover:text-codm-orange transition-colors" onClick={() => setMobileMenuOpen(false)}>
                        <Button className="w-full rounded-full text-white hover:text-codm-orange">Sign up</Button>
                      </Link>
                    </motion.li>
                  </>
                )}
              </ul>
            </nav>
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