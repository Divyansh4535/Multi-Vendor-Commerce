"use client";

import  React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function ModeToggle() {
  const { setTheme, theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(resolvedTheme === "light" ? "dark" : "light");
  };

  if (!mounted) {
    return (
      <div className="h-8 w-8 rounded-full bg-gray-100 dark:bg-gray-800" />
    );
  }

  return (
    <motion.button
      onClick={toggleTheme}
      whileTap={{ scale: 0.95 }}
      whileHover={{ scale: 1.05 }}
      className="relative h-8 w-8 rounded-full bg-gray-100 p-1.5 outline-none ring-1 ring-gray-200 transition-colors hover:bg-gray-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 dark:bg-gray-800 dark:ring-gray-700 dark:hover:bg-gray-700"
      aria-label={resolvedTheme === "light" ? "Switch to dark mode" : "Switch to light mode"}
    >
      <AnimatePresence mode="wait" initial={false}>
        {resolvedTheme === "dark" ? (
          <motion.div
            key="moon"
            initial={{ opacity: 0, rotate: -30 }}
            animate={{ opacity: 1, rotate: 0 }}
            exit={{ opacity: 0, rotate: 30 }}
            transition={{ duration: 0.2 }}
          >
            <Moon className="h-5 w-5 text-yellow-300" />
          </motion.div>
        ) : (
          <motion.div
            key="sun"
            initial={{ opacity: 0, rotate: 30 }}
            animate={{ opacity: 1, rotate: 0 }}
            exit={{ opacity: 0, rotate: -30 }}
            transition={{ duration: 0.2 }}
          >
            <Sun className="h-5 w-5 text-amber-500" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Animated background gradient */}
      <motion.div
        className="absolute inset-0 -z-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-600 opacity-0 dark:opacity-15"
        animate={{
          opacity: resolvedTheme === "dark" ? 0.15 : 0,
        }}
        transition={{ duration: 0.5 }}
      />
    </motion.button>
  );
}