"use client";

import React, { useState, useEffect } from "react";
// import { ModeToggle } from "./mode-toggle";
import { Bell, Menu, Search, ChevronDown, User, Settings, LogOut, X } from "lucide-react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { toggleSidebar } from "@/redux/reducer/SidebarReducer";
import { motion, AnimatePresence } from "framer-motion";
import { ModeToggle } from "./mode-toggle";


interface HeaderProps {
  title?: string;
  description?: string;
}

const notifications = [
  {
    id: 1,
    title: "New message received",
    description: "You have 3 unread messages",
    time: "2 mins ago",
    icon: <Bell className="h-4 w-4" />,
    color: "text-blue-500"
  },
  // {
  //   id: 2,
  //   title: "System update available",
  //   description: "Version 2.3 is ready to install",
  //   time: "1 hour ago",
  //   icon: <Settings className="h-4 w-4" />,
  //   color: "text-purple-500"
  // },
  // {
  //   id: 3,
  //   title: "New user registered",
  //   description: "John Doe just signed up",
  //   time: "3 hours ago",
  //   icon: <User className="h-4 w-4" />,
  //   color: "text-green-500"
  // }
];

export function Header({ title = "Dashboard", description = "" }: HeaderProps) {
  const user: any = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);



  return (
    <header
      className={`sticky rounded-2xl mt-4 mx-4  top-0 z-50 flex h-16 items-center justify-between transition-all duration-300 ${isScrolled
        ? "border-b border-stroke/50 bg-white/90 backdrop-blur-sm dark:border-stroke-dark/50 dark:bg-gray-dark/90"
        : "border-b border-stroke bg-white dark:border-stroke-dark dark:bg-gray-dark"
        } px-4 sm:px-6 lg:px-8`}
    >
      {/* Left Section */}
      <div className="flex items-center gap-4">
        {/* Sidebar Toggle */}
        <motion.button
          whileTap={{ scale: 0.95 }}
          className="flex size-10 items-center justify-center rounded-lg transition-all hover:bg-gray-100 dark:hover:bg-dark-4"
          onClick={() => dispatch(toggleSidebar())}
          aria-label="Toggle sidebar"
        >
          <Menu className="h-5 w-5 text-gray-600 dark:text-gray-300" />
        </motion.button>

        {/* Title */}
        <div className="hidden sm:block">
          <motion.h1
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-lg font-semibold text-gray-900 dark:text-white"
          >
            {title}
          </motion.h1>
          {description && (
            <motion.p
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="text-sm text-gray-500 dark:text-gray-400"
            >
              {description}
            </motion.p>
          )}
        </div>
      </div>

      {/* Middle Section - Search (Desktop) */}
      {!showMobileSearch && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="hidden flex-1 max-w-md px-4 lg:block"
        >
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full rounded-xl border-0 bg-gray-100 py-2 pl-10 pr-4 text-sm text-gray-900 placeholder-gray-500 transition-all focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:bg-dark-3 dark:text-white dark:placeholder-gray-400"
              placeholder="Search anything..."
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute inset-y-0 right-0 flex items-center pr-3"
              >
                <X className="h-4 w-4 text-gray-400 hover:text-gray-600" />
              </button>
            )}
          </div>
        </motion.div>
      )}

      {/* Right Section */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Mobile Search Toggle */}
        <motion.button
          whileTap={{ scale: 0.95 }}
          className="flex size-10 items-center justify-center rounded-full sm:hidden"
          onClick={() => setShowMobileSearch(!showMobileSearch)}
          aria-label="Search"
        >
          {showMobileSearch ? (
            <X className="h-5 w-5 text-gray-600 dark:text-gray-300" />
          ) : (
            <Search className="h-5 w-5 text-gray-600 dark:text-gray-300" />
          )}
        </motion.button>

        {/* Mobile Search Bar */}
        <AnimatePresence>
          {showMobileSearch && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute left-0 top-16 z-50 w-full bg-white px-4 py-3 shadow-sm dark:bg-gray-dark sm:hidden"
            >
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <Search className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="block w-full rounded-xl border-0 bg-gray-100 py-2 pl-10 pr-4 text-sm text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-primary-500 dark:bg-dark-3 dark:text-white dark:placeholder-gray-400"
                  placeholder="Search..."
                  autoFocus
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute inset-y-0 right-0 flex items-center pr-3"
                  >
                    <X className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Dark Mode Toggle */}
        <div className="hidden sm:block">
          <ModeToggle />
        </div>

        {/* Notifications */}
        <div className="relative">
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="relative flex size-10 items-center justify-center rounded-full transition-all hover:bg-gray-100 dark:hover:bg-dark-4"
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowProfileMenu(false);
            }}
            aria-label="Notifications"
          >
            <Bell className="h-5 w-5 text-gray-600 dark:text-gray-300" />
            <span className="absolute right-2 top-2 size-2 rounded-full bg-red-500">
              <span className="absolute inset-0 animate-ping rounded-full bg-red-500 opacity-75"></span>
            </span>
          </motion.button>

          {/* Notifications Dropdown */}
          <AnimatePresence>
            {showNotifications && (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.95 }}
                className="absolute right-0 mt-2 w-80 origin-top-right rounded-xl border border-gray-200 bg-white shadow-lg dark:border-dark-4 dark:bg-dark-2"
              >
                <div className="p-3">
                  <div className="flex items-center justify-between border-b border-gray-100 pb-2 dark:border-dark-4">
                    <h3 className="font-medium text-gray-900 dark:text-white">
                      Notifications
                    </h3>
                    <button
                      className="text-xs text-primary-600 hover:text-primary-800 dark:text-primary-400 dark:hover:text-primary-300"
                      onClick={() => setShowNotifications(false)}
                    >
                      Clear all
                    </button>
                  </div>
                  <div className="mt-2 max-h-60 overflow-y-auto">
                    {notifications.map((notification) => (
                      <motion.div
                        key={notification.id}
                        whileHover={{ scale: 1.02 }}
                        className="flex cursor-pointer items-start gap-3 rounded-lg p-3 transition-colors hover:bg-gray-50 dark:hover:bg-dark-3"
                      >
                        <div className={`flex size-8 items-center justify-center rounded-full ${notification.color} bg-opacity-20`}>
                          {notification.icon}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900 dark:text-white">
                            {notification.title}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {notification.description}
                          </p>
                        </div>
                        <span className="text-xs text-gray-400">
                          {notification.time}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* User Profile */}
        <div className="relative">
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 rounded-full p-1 transition-all hover:bg-gray-100 dark:hover:bg-dark-4"
            onClick={() => {
              setShowProfileMenu(!showProfileMenu);
              setShowNotifications(false);
            }}
            aria-label="User menu"
          >
            <div className="size-8 overflow-hidden rounded-full border-2 border-primary-500/20">
              <Image
                src={user?.avatar || "https://ext.same-assets.com/1978936293/849522504.png"}
                alt="User profile"
                width={32}
                height={32}
                className="h-full w-full object-cover"
                priority
              />
            </div>
            <span className="hidden items-center gap-1 text-sm font-medium text-gray-700 dark:text-gray-300 md:flex">
              {user?.name || "Admin"}
              <ChevronDown
                className={`h-4 w-4 transition-transform ${showProfileMenu ? "rotate-180" : ""
                  }`}
              />
            </span>
          </motion.button>

          {/* Profile Dropdown */}
          <AnimatePresence>
            {showProfileMenu && (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.95 }}
                className="absolute right-0 mt-2 w-56 origin-top-right rounded-xl border border-gray-200 bg-white shadow-lg dark:border-dark-4 dark:bg-dark-2"
              >
                <div className="p-2">
                  <div className="flex items-center gap-3 rounded-lg px-3 py-2">
                    <div className="size-9 overflow-hidden rounded-full border-2 border-primary-500/20">
                      <Image
                        src={user?.avatar || "https://ext.same-assets.com/1978936293/849522504.png"}
                        alt="User profile"
                        width={36}
                        height={36}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {user?.name || "Admin"}
                      </p>
                      <p className="text-xs text-gray-800 dark:text-gray-300">
                        {user?.email || "admin@example.com"}
                      </p>
                    </div>
                  </div>
                  <div className="my-2 border-t border-gray-100 dark:border-dark-4"></div>
                  <motion.button
                    whileHover={{ x: 5 }}
                    className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-gray-700 transition-colors hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-dark-3"
                  >
                    <User className="h-4 w-4" />
                    <span>Profile</span>
                  </motion.button>
                  <motion.button
                    whileHover={{ x: 5 }}
                    className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-gray-700 transition-colors hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-dark-3"
                  >
                    <Settings className="h-4 w-4" />
                    <span>Settings</span>
                  </motion.button>
                  <div className="my-2 border-t border-gray-100 dark:border-dark-4"></div>
                  <motion.button
                    whileHover={{ x: 5 }}
                    className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-red-600 transition-colors hover:bg-gray-50 dark:text-red-400 dark:hover:bg-dark-3"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Sign out</span>
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}