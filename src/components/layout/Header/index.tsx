"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  ShoppingCartIcon as CartIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import SearchBox from "@/components/common/SearchBox";
import { useCart } from "@/contexts/CartContext";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { cartCount } = useCart();

  // Theo dõi scroll và cập nhật state
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`${
        isScrolled
          ? "fixed top-0 left-0 right-0 bg-white shadow-md animate-slideDown"
          : "bg-white shadow"
      } z-50 transition-all duration-300`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="font-bold text-xl">
            Store Logo
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link
              href="/products"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Products
            </Link>
            <Link
              href="/categories"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Categories
            </Link>
            <Link
              href="/about"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Contact
            </Link>
          </nav>

          {/* Search and User Actions */}
          <div className="flex items-center space-x-4">
            <SearchBox />
            <Link href="/cart" className="relative inline-flex items-center">
              <CartIcon className="h-6 w-6 text-gray-900 hover:text-blue-600 transition-colors" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
            <Link
              href="/profile"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              <UserIcon className="h-6 w-6" />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
