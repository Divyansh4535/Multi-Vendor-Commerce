"use client"
import React, { useState } from 'react';
import { Apple, ChevronLeft, ChevronRight, LayoutDashboard, ShoppingBagIcon, ShoppingCart, User } from 'lucide-react';
import { title } from 'process';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store'; // adjust the path based on your file structure
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { NavItem } from './nav-items';
import { toggleSidebar } from '@/redux/reducer/SidebarReducer';
import { FaProductHunt } from 'react-icons/fa';

interface SidebarItem {
  title: string;
  href?: string;
  icon?: React.ReactNode;
  badge?: string;
  isPro?: boolean;
  submenu?: boolean;
  subItems?: SidebarItem[];
}

interface SidebarSectionProps {
  title: string,
  items: SidebarItem[],
  collapsed: boolean
}

const iconProps = {
  className: "w-5 h-5 text-inherit",
};


const mainMenuItem = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: <LayoutDashboard {...iconProps} />,
    submenu: true
  },

  {
    title: "Profile",
    href: "/profile",
    icon: <User {...iconProps} />,
  },

  {
    title: "Product",
    href: "/product",
    icon: <FaProductHunt {...iconProps} />,
    submenu: true,
    subItems: [
      {
        title: "Add Product",
        href: "/dashboard/product-add",
        icon: <FaProductHunt {...iconProps} />
      },
      {
        title: "List Product",
        href: "/dashboard/product-list",
        icon: <FaProductHunt {...iconProps} />
      }
    ]

  },
  {
    title: "Shop",
    href: "/shop",
    icon: <ShoppingBagIcon {...iconProps} />,
    submenu: true,
    subItems: [
      {
        title: "Shop List",
        href: "/shop-list",
        icon: <ShoppingCart {...iconProps} />
      },
      {
        title: "Add Shop",
        href: "/shop-add",
        icon: <ShoppingCart {...iconProps} />
      }
    ]

  },

];

const SidebarSection = ({ title, items, collapsed }: SidebarSectionProps) => {
  const pathname = usePathname();

  
  return (
    <div className="mb-6">
      {!collapsed && (
        <h2 className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
          {title}
        </h2>
      )}
      <nav role="navigation" aria-label={title}>
        <AnimatePresence>
          <ul className="space-y-1">
            {items.map((item, idx) => (
              <motion.div
                key={idx}
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
                transition={{ duration: 0.3 }}
              >
                <NavItem item={item} pathname={pathname} />
              </motion.div>
            ))}
          </ul>
        </AnimatePresence>
      </nav>
    </div>
  );
};

const Sidebar = () => {
  const { isOpen } = useSelector((state: RootState) => state.sidebar)
  const [isMobile, setIsMobile] = useState(false)
const dispatch = useDispatch();

  return (
    <>
      {isOpen && <div className="fixed inset-0 z-[10000] bg-black bg-opacity-50 md:hidden" />}
      <aside
        className={`fixed  md:sticky z-[1000000] flex h-screen flex-col border-r border-gray-200 bg-white transition-all duration-300 ease-in-out dark:border-gray-800 dark:bg-gray-900 ${isOpen ? "w-20" : "w-72"
          } ${isMobile ? `${isOpen ? "left-0 w-72" : "-left-full"}` : "left-0 top-0"
          }`}
        aria-label="Main navigation"
      >
        <div
          className='flex h-full flex-col overflow-y-auto p-4'
        >
          <div className="mb-8 flex items-center justify-between px-2">
            <Link href="/" className="flex items-center gap-2">
              <Apple />
            </Link>
            <button
              onClick={() => dispatch(toggleSidebar())}
              className="rounded-md p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-gray-800 dark:hover:text-gray-200"
              aria-label={isOpen ? "Expand sidebar" : "Collapse sidebar"}
            >
              {isOpen ? (
                <ChevronRight className="h-5 w-5" />
              ) : (
                <ChevronLeft className="h-5 w-5" />
              )}
            </button>
          </div>

          <div className="flex-1 overflow-y-auto">
            <SidebarSection
              title={isOpen ? "" : "Main Menu"}
              items={mainMenuItem}
              collapsed={isOpen}
            />
          </div>
        </div>

      </aside>
    </>
  );
};

export default Sidebar;
