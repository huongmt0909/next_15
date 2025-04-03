"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

const banners = [
  {
    id: 1,
    image: "/images/banner1.jpg",
    title: "Welcome to Our Store",
    description: "Discover amazing products at great prices",
    buttonText: "Shop Now",
    link: "/products",
  },
  {
    id: 2,
    image: "/images/banner2.jpg",
    title: "Summer Collection",
    description: "New arrivals with up to 50% off",
    buttonText: "View Collection",
    link: "/products?category=summer",
  },
  {
    id: 3,
    image: "/images/banner3.jpg",
    title: "Special Offers",
    description: "Limited time deals on selected items",
    buttonText: "Shop Deals",
    link: "/products?sort=discount",
  },
];

const Banner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative h-[500px] w-full overflow-hidden">
      <Image
        src="/images/banner.jpg"
        alt="Welcome to our store"
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Welcome to Our Store
            </h1>
            <p className="text-xl text-white mb-8">
              Discover amazing products at great prices
            </p>
            <Link
              href="/products"
              className="inline-block bg-white text-blue-600 px-8 py-3 rounded-md font-medium hover:bg-blue-50 transition-colors"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
