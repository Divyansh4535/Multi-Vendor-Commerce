"use client";
import type React from "react";
import { useEffect, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { motion } from "framer-motion";

import { postCallNoToken } from "@/lib/api";
import { setToken } from "@/lib/token";
import { toast } from "sonner";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const payload = { email, password };
      const result = await postCallNoToken("/login", payload);
      if (result.status) {
        toast.success(result.message);
        setToken(result?.token);
        window.location.href = "/dashboard";
      } else {
        toast.error(result.message);
      }
    } catch {
      toast.error("Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-800 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Subtle floating background bubbles */}

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="relative bg-white/5 backdrop-blur-xl rounded-2xl p-8 w-full max-w-md shadow-2xl border border-white/10 z-10"
      >
        <div className="text-center mb-8">
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-3xl font-semibold text-white mb-1"
          >
            Welcome Back
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-white/70 text-sm"
          >
            Admin portal access only
          </motion.p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <label
                htmlFor="username"
                className="block text-sm font-medium text-white/80 mb-2"
              >
                Admin Username
              </label>
              <input
                type="text"
                id="username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/30 text-white placeholder-white/40"
                required
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <label
                htmlFor="password"
                className="block text-sm font-medium text-white/80 mb-2"
              >
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 pr-12 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/30 text-white placeholder-white/40"
                  required
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex items-center"
          >
            <input
              type="checkbox"
              id="remember"
              className="w-4 h-4 bg-white/5 border-white/10 rounded focus:ring-white/30 focus:ring-2"
            />
            <label htmlFor="remember" className="ml-2 text-sm text-white/70">
              Remember this device
            </label>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <motion.button
              type="submit"
              disabled={isLoading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-gradient-to-r from-violet-600 to-blue-600 text-white py-3 rounded-lg font-medium hover:from-violet-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-white/30 transition-all duration-200 shadow-lg disabled:opacity-70 flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                  />
                  Authenticating...
                </>
              ) : (
                "Sign in"
              )}
            </motion.button>
          </motion.div>
        </form>
      </motion.div>
    </div>
  );
}
