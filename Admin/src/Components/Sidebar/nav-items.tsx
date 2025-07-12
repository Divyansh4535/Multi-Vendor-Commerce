"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronDown, ChevronRight } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

interface NavItemProps {
  item: {
    title: string;
    href?: string;
    icon?: React.ReactNode;
    badge?: string;
    isPro?: boolean;
    submenu?: boolean;
    subItems?: {
      title: string;
      href?: string;
      icon?: React.ReactNode;
      badge?: string;
      isPro?: boolean;
    }[];
  };
  pathname: string;
}

export function NavItem({ item, pathname }: NavItemProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const isActive = item.href === pathname;
  const hasSubItems = item.submenu && item.subItems && item.subItems.length > 0;

  const toggleSubMenu = () => {
    setIsExpanded(!isExpanded);
  };

  if (hasSubItems) {
    return (
      <li>
        <div>
          <button
            onClick={toggleSubMenu}
            aria-expanded={isExpanded}
            className="rounded-lg px-3.5 font-medium text-dark-4 transition-all duration-200 dark:text-dark-6 hover:bg-gray-100 hover:text-dark hover:dark:bg-[#FFFFFF1A] hover:dark:text-white flex w-full items-center gap-3 py-3"
          >
            {item.icon && <span>{item.icon}</span>}
            <span>{item.title}</span>
            {isExpanded ? (
              <ChevronDown className="ml-auto h-4 w-4" />
            ) : (
              <ChevronRight className="ml-auto h-4 w-4" />
            )}
          </button>
          {isExpanded && (
            <AnimatePresence>
              <ul className="ml-3 space-y-1 mt-1">
                {item.subItems?.map((subItem, idx) => (
                  <motion.li
                    initial={{
                      opacity: 0,
                      height: 0,
                    }}
                    animate={{
                      opacity: 1,
                      height: "auto",
                    }}
                    exit={{
                      opacity: 0,
                      height: 0,
                    }}
                    transition={{ duration: 0.5 }}
                    key={idx}
                  >
                    <Link
                      href={subItem.href || "#"}
                      className={`rounded-lg px-3.5 font-medium transition-all duration-200 relative flex items-center gap-3 py-2 ${
                        subItem.href === pathname
                          ? "bg-[rgba(87,80,241,0.07)] text-primary hover:bg-[rgba(87,80,241,0.07)] dark:bg-[#FFFFFF1A] dark:text-white"
                          : "text-dark-4 dark:text-dark-6 hover:bg-gray-100 hover:text-dark hover:dark:bg-[#FFFFFF1A] hover:dark:text-white"
                      }`}
                    >
                      {subItem.icon && <span>{subItem.icon}</span>}
                      <span>{subItem.title}</span>
                      {subItem.badge && (
                        <div className="ml-auto mr-10 flex size-[19px] items-center justify-center rounded-full bg-red-light-5 text-[10px] font-medium text-red">
                          {subItem.badge}
                        </div>
                      )}
                      {subItem.isPro && (
                        <span className="absolute right-3.5 top-1/2 flex h-5 -translate-y-1/2 items-center justify-center rounded-md bg-primary px-1.5 text-xs text-white">
                          Pro
                        </span>
                      )}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </AnimatePresence>
          )}
        </div>
      </li>
    );
  }

  return (
    <li>
      <Link
        href={item.href || "#"}
        className={`rounded-lg px-3.5 font-medium transition-all duration-200 relative flex items-center gap-3 py-3 ${
          isActive
            ? "bg-[rgba(87,80,241,0.07)] text-primary hover:bg-[rgba(87,80,241,0.07)] dark:bg-[#FFFFFF1A] dark:text-white"
            : "text-dark-4 dark:text-dark-6 hover:bg-gray-100 hover:text-dark hover:dark:bg-[#FFFFFF1A] hover:dark:text-white"
        }`}
      >
        {item.icon && <span>{item.icon}</span>}
        <span>{item.title}</span>
        {item.badge && (
          <div className="ml-auto mr-10 flex size-[19px] items-center justify-center rounded-full bg-red-light-5 text-[10px] font-medium text-red">
            {item.badge}
          </div>
        )}
        {item.isPro && (
          <span className="absolute right-3.5 top-1/2 flex h-5 -translate-y-1/2 items-center justify-center rounded-md bg-primary px-1.5 text-xs text-white">
            Pro
          </span>
        )}
      </Link>
    </li>
  );
}
