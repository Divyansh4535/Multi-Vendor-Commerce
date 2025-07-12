"use client";
import React, { useState, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/navigation";

import { motion } from "framer-motion";

import { useDispatch } from "react-redux";
import { postCall } from "@/lib/api";
import { setToken } from "@/lib/token";
import { Twitter } from "lucide-react";
import { BsGoogle, BsTwitter } from "react-icons/bs";
import { FaEye, FaEyeSlash, FaGithub } from "react-icons/fa";
import { FaEnvelope, FaLock } from "react-icons/fa6";
import { toast } from "sonner";

const Page = () => {
  // const dispatch = useDispatch();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    // Check for saved credentials if "Remember me" was checked
    const savedEmail = localStorage.getItem("rememberedEmail");
    if (savedEmail) {
      setEmail(savedEmail);
      setRememberMe(true);
    }
  }, []);

  const validateForm = () => {
    let valid = true;
    const newErrors = { email: "", password: "" };

    if (!email) {
      newErrors.email = "Email is required";
      valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Please enter a valid email";
      valid = false;
    }

    if (!password) {
      newErrors.password = "Password is required";
      valid = false;
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      if (rememberMe) {
        localStorage.setItem("rememberedEmail", email);
      } else {
        localStorage.removeItem("rememberedEmail");
      }

      const payload = {
        username: email,
        password: password,
      };

      // const response = await postRequestNoToken("/auth/sign-in", payload);
      const response = await postCall("/auth/sign-in", payload);
      if (response) {
        console.log("response.data.token", response.data.token);
        setToken(response.data.token);
        // router.push("/dashboard");
        // dispatch(addUser(response.data));
        toast.success(response.message || "Login Successfull !!");
        setTimeout(() => {
          window.location.href = "/dashboard";
        }, 2000);
      }
    } catch (error) {
      console.error("Login error:", error);
      setErrors({
        ...errors,
        password: "Invalid email or password",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = (provider: string) => {
    // In a real app, this would redirect to the provider's auth page
    console.log(`Logging in with ${provider}`);
    setIsLoading(true);
    setTimeout(() => {
      router.push("/dashboard");
      setIsLoading(false);
    }, 1000);
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const formVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delay: 0.3,
        duration: 0.5,
      },
    },
  };

  return (
    <>
      <Head>
        <title>Login | Modern App</title>
        <meta name="description" content="Login to your account" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 flex items-center justify-center p-4">
        <motion.div
          className="w-full max-w-md"
          initial="hidden"
          animate={isMounted ? "visible" : "hidden"}
          variants={containerVariants}
        >
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="p-8">
              <motion.div
                initial="hidden"
                animate="visible"
                variants={formVariants}
              >
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-gray-800 mb-2">
                    {"Welcome Back"}
                  </h2>
                  <p className="text-gray-600">
                    {"Sign in to access your dashboard"}
                  </p>
                </div>

                {/* Social Login Buttons */}
                <div className="grid grid-cols-3 gap-3 mb-6">
                  <button
                    onClick={() => handleSocialLogin("google")}
                    className="flex items-center justify-center py-2 px-4 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg transition-colors"
                  >
                    <BsGoogle className="mr-2" />
                  </button>
                  <button
                    onClick={() => handleSocialLogin("github")}
                    className="flex items-center justify-center py-2 px-4 bg-gray-50 hover:bg-gray-100 text-gray-800 rounded-lg transition-colors"
                  >
                    <FaGithub className="mr-2" />
                  </button>
                  <button
                    onClick={() => handleSocialLogin("twitter")}
                    className="flex items-center justify-center py-2 px-4 bg-blue-50 hover:bg-blue-100 text-blue-500 rounded-lg transition-colors"
                  >
                    <BsTwitter className="mr-2" />
                  </button>
                </div>

                <div className="flex items-center my-6">
                  <div className="flex-1 border-t border-gray-200"></div>
                  <span className="px-4 text-gray-500 text-sm">OR</span>
                  <div className="flex-1 border-t border-gray-200"></div>
                </div>

                {/* Login Form */}
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Email Address
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaEnvelope className="text-gray-400" />
                      </div>
                      <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={`pl-10 w-full py-3 px-4 border ${
                          errors.email ? "border-red-500" : "border-gray-300"
                        } rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition`}
                        placeholder="your@email.com"
                      />
                    </div>
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div className="mb-6">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Password
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaLock className="text-gray-400" />
                      </div>
                      <input
                        type={showPassword ? "text" : "password"}
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className={`pl-10 w-full py-3 px-4 border ${
                          errors.password ? "border-red-500" : "border-gray-300"
                        } rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition`}
                        placeholder="*********"
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <FaEyeSlash className="text-gray-400 hover:text-gray-600" />
                        ) : (
                          <FaEye className="text-gray-400 hover:text-gray-600" />
                        )}
                      </button>
                    </div>
                    {errors.password && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.password}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center">
                      <input
                        id="remember-me"
                        type="checkbox"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                      />
                      <label
                        htmlFor="remember-me"
                        className="ml-2 block text-sm text-gray-700"
                      >
                        Remember me
                      </label>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className={`w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors ${
                      isLoading ? "opacity-75 cursor-not-allowed" : ""
                    }`}
                  >
                    {isLoading ? (
                      <span className="flex items-center justify-center">
                        <svg
                          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Processing...
                      </span>
                    ) : (
                      "Sign In"
                    )}
                  </button>
                </form>
              </motion.div>
            </div>
          </div>

          <div className="mt-6 text-center">
            <p className="text-gray-500 text-xs">
              By continuing, you agree to our{" "}
              <a href="#" className="text-indigo-600 hover:underline">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className="text-indigo-600 hover:underline">
                Privacy Policy
              </a>
              .
            </p>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default Page;
