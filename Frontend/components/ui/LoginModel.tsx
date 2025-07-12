"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { CircleX } from "lucide-react";
import { postRequest } from "@/connections/apiCall";
import { apiEndPoint } from "@/connections/endPoints";
import { useToast } from "@/hooks/use-toast";
import { useRedux } from "@/hooks/useSelect";
import { addUser } from "@/redux/slices/AuthSlice";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginModal = ({ isOpen, onClose }: LoginModalProps) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const { dispatch } = useRedux();

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    } else {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "auto";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "auto";
    };
  }, [isOpen, onClose]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(isLogin ? "Logging in" : "Signing up", { email, password });
    setLoading(true);
    const payload = isLogin
      ? {
          userName: email,
          password,
        }
      : {
          name,
          email,
          password,
          mobile,
        };

    try {
      const response = await postRequest(apiEndPoint.login, payload);
      console.log(response, "eeee");
      if (response?.status === 200) {
        dispatch(addUser(response?.data));
        toast({
          title: "Success!",
          description: "Login Succssfull",
        });
        onClose();
        setEmail("");
        setPassword("");
        setName("");
        setMobile("");
      } else {
        toast({
          title: "Error",
          description: response?.response?.data?.message || "Error",
        });
      }
    } catch (error: any) {
      console.log("error", error);
      toast({
        title: "Error!",
        description: error?.message,
      });
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] overflow-y-auto">
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/30 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Modal container */}
      <div className="flex min-h-full items-center justify-center p-4">
        {/* Modal content */}
        <div
          className="relative w-full max-w-md rounded-xl bg-white shadow-2xl dark:bg-black border border-gray-200 dark:border-gray-800 overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Decorative top border */}
          <div className="h-1 bg-gradient-to-r from-white via-black to-white dark:from-black dark:via-white dark:to-black" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <CircleX className="h-5 w-5 text-gray-900 dark:text-gray-100" />
            <span className="sr-only">Close</span>
          </button>

          {/* Modal content */}
          <div className="p-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
                {isLogin ? "Welcome back" : "Create account"}
              </h2>
              <p className="text-gray-500 dark:text-gray-400 mt-1">
                {isLogin
                  ? "Sign in to your account"
                  : "Get started with your new account"}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {!isLogin && (
                <>
                  <div className="space-y-1">
                    <label
                      htmlFor="Name"
                      className="block text-sm font-medium text-gray-900 dark:text-gray-100"
                    >
                      Name
                    </label>
                    <input
                      id="name"
                      type="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="w-full px-4 py-3 text-gray-900 dark:text-white bg-white dark:bg-black border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent transition-all"
                      placeholder="eg: John Carter"
                    />
                  </div>
                  <div className="space-y-1">
                    <label
                      htmlFor="Name"
                      className="block text-sm font-medium text-gray-900 dark:text-gray-100"
                    >
                      Mobile
                    </label>
                    <input
                      id="mobile"
                      type="mobile"
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value)}
                      required
                      className="w-full px-4 py-3 text-gray-900 dark:text-white bg-white dark:bg-black border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent transition-all"
                      placeholder="eg: 1234567890"
                    />
                  </div>
                </>
              )}
              <div className="space-y-1">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-900 dark:text-gray-100"
                >
                  Email Address or Username
                </label>
                <input
                  id="email"
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3 text-gray-900 dark:text-white bg-white dark:bg-black border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent transition-all"
                  placeholder="your@email.com or username"
                />
              </div>

              <div className="space-y-1">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-900 dark:text-gray-100"
                >
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-4 py-3 text-gray-900 dark:text-white bg-white dark:bg-black border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent transition-all"
                  placeholder="••••••••"
                  minLength={4}
                />
              </div>

              {!isLogin && (
                <div className="space-y-1">
                  <label
                    htmlFor="confirm-password"
                    className="block text-sm font-medium text-gray-900 dark:text-gray-100"
                  >
                    Confirm Password
                  </label>
                  <input
                    id="confirm-password"
                    type="password"
                    className="w-full px-4 py-3 text-gray-900 dark:text-white bg-white dark:bg-black border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent transition-all"
                    placeholder="••••••••"
                    minLength={6}
                  />
                </div>
              )}

              <Button
                type="submit"
                disabled={loading}
                className="w-full h-12 bg-black text-white hover:bg-gray-900 dark:bg-white dark:text-black dark:hover:bg-gray-100 rounded-lg transition-all transform hover:scale-[1.01] active:scale-[0.99]"
              >
                {loading
                  ? "Loading..."
                  : isLogin
                  ? "Sign in"
                  : "Create account"}
              </Button>
            </form>

            <div className="mt-6 text-center text-sm">
              <button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="text-gray-900 dark:text-gray-100 hover:text-gray-700 dark:hover:text-gray-300 transition-colors underline underline-offset-4"
              >
                {isLogin
                  ? "Don't have an account? Sign up"
                  : "Already have an account? Sign in"}
              </button>
            </div>

            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-gray-300 dark:border-gray-700" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white dark:bg-black px-3 text-gray-500 dark:text-gray-400 tracking-wider">
                  OR CONTINUE WITH
                </span>
              </div>
            </div>

            <div className="space-y-3">
              <Button
                variant="outline"
                className="w-full h-12 border-2 border-gray-900 dark:border-gray-100 text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-900 rounded-lg transition-all"
              >
                Request OTP
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
