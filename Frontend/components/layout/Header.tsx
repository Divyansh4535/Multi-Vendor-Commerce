"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingCart, Heart, Search, Menu, User, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useCart } from "@/context/CartContext";
import { cn } from "@/lib/utils";
import { ModeToggle } from "@/components/theme/ModeToggle";
import MobileNav from "./MobileNav";
import CartDrawer from "../cart/CartDrawer";
import LoginModal from "../ui/LoginModel";
import { useRedux } from "@/hooks/useSelect";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const pathname = usePathname();
  const { cartItems } = useCart();
  const { selector } = useRedux();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearchOpen(false);
  };

  const navItems = [
    { label: "Home", href: "/" },
    { label: "Shop", href: "/products" },
    { label: "Categories", href: "/categories" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-background/90 backdrop-blur-md border-b shadow-sm"
          : "bg-background/80"
      )}
    >
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Mobile Menu Button (left side) */}
        <div className="flex md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="pr-0">
              <MobileNav navItems={navItems} />
            </SheetContent>
          </Sheet>
        </div>

        {/* Logo (centered on mobile) */}
        <Link
          href="/"
          className="font-bold text-xl md:text-2xl tracking-tight flex-1 md:flex-none text-center md:text-left"
        >
          <span className="text-primary">Ecom</span>Store
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6 lg:space-x-8 mx-8">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary relative group",
                pathname === item.href
                  ? "text-primary"
                  : "text-muted-foreground"
              )}
            >
              {item.label}
              <span
                className={cn(
                  "absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full",
                  pathname === item.href ? "w-full" : ""
                )}
              />
            </Link>
          ))}
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center space-x-2 sm:space-x-4">
          {/* Search Button */}
          <Button
            variant="ghost"
            size="icon"
            className="hidden sm:inline-flex"
            onClick={() => setIsSearchOpen(true)}
          >
            <Search className="h-[1.2rem] w-[1.2rem]" />
            <span className="sr-only">Search</span>
          </Button>

          {/* Wishlist */}
          <Button variant="ghost" size="icon" asChild>
            <Link href="/wishlist">
              <Heart className="h-[1.2rem] w-[1.2rem]" />
              <span className="sr-only">Wishlist</span>
            </Link>
          </Button>

          {/* Cart with badge */}
          <Button
            variant="ghost"
            size="icon"
            className="relative"
            onClick={() => setIsCartOpen(true)}
          >
            <ShoppingCart className="h-[1.2rem] w-[1.2rem]" />
            {cartItems.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground rounded-full w-5 h-5 text-xs flex items-center justify-center">
                {cartItems.length > 9 ? "9+" : cartItems.length}
              </span>
            )}
            <span className="sr-only">Cart</span>
          </Button>

          {/* Account */}
          {selector?.auth.user ? (
            <Button
              variant="ghost"
              size="icon"
              className="hidden sm:inline-flex"
              asChild
            >
              <Link href="/account">
                <User className="h-[1.2rem] w-[1.2rem]" />
                <span className="sr-only">Account</span>
              </Link>
            </Button>
          ) : (
            <Button
              variant="ghost"
              size="icon"
              className="hidden sm:inline-flex"
              onClick={() => setIsLoginModalOpen(true)}
            >
              <span className="sr-only">User account</span>
              <User className="h-5 w-5" />
            </Button>
          )}

          {/* Theme Toggle */}
          <ModeToggle />
        </div>
      </div>

      {/* Cart Drawer */}
      <CartDrawer isOpen={isCartOpen} setIsOpen={setIsCartOpen} />

      {/* Search Overlay */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-start justify-center pt-20 px-4">
          <div className="bg-background rounded-xl shadow-2xl w-full max-w-2xl animate-in fade-in-90 slide-in-from-top-10">
            <div className="relative">
              <form onSubmit={handleSearch} className="p-4">
                <div className="relative flex items-center">
                  <Search className="absolute left-4 h-5 w-5 text-muted-foreground" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search for products, brands, categories..."
                    className="w-full pl-12 pr-12 py-3 text-lg border-none bg-transparent focus:outline-none focus:ring-0 placeholder:text-muted-foreground/60"
                    autoFocus
                  />
                  <button
                    type="button"
                    onClick={() => setIsSearchOpen(false)}
                    className="absolute right-4 text-muted-foreground hover:text-primary transition-colors"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>
              </form>

              {/* Optional search suggestions */}
              <div className="border-t p-4 hidden sm:block">
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs text-muted-foreground">Try:</span>
                  <button
                    type="button"
                    onClick={() => setSearchQuery("Sneakers")}
                    className="text-xs px-3 py-1 rounded-full bg-muted hover:bg-muted/80 transition-colors"
                  >
                    Sneakers
                  </button>
                  <button
                    type="button"
                    onClick={() => setSearchQuery("Watches")}
                    className="text-xs px-3 py-1 rounded-full bg-muted hover:bg-muted/80 transition-colors"
                  >
                    Watches
                  </button>
                  <button
                    type="button"
                    onClick={() => setSearchQuery("Accessories")}
                    className="text-xs px-3 py-1 rounded-full bg-muted hover:bg-muted/80 transition-colors"
                  >
                    Accessories
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
