"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

const banners = [
  {
    id: 1,
    image:
      "https://static.vecteezy.com/system/resources/previews/005/467/223/non_2x/new-arrival-banner-design-template-for-shoes-store-sports-fashion-business-illustration-vector.jpg",
    title: "Welcome to Our Store",
    description: "Discover amazing products at great prices",
    buttonText: "Shop Now",
    link: "/products",
  },
  {
    id: 2,
    image:
      "https://static.vecteezy.com/system/resources/previews/005/467/223/non_2x/new-arrival-banner-design-template-for-shoes-store-sports-fashion-business-illustration-vector.jpg",
    title: "Summer Collection",
    description: "New arrivals with up to 50% off",
    buttonText: "View Collection",
    link: "/products?category=summer",
  },
  {
    id: 3,
    image:
      "https://static.vecteezy.com/system/resources/previews/005/467/223/non_2x/new-arrival-banner-design-template-for-shoes-store-sports-fashion-business-illustration-vector.jpg",
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

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % banners.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length);
  };

  return (
    <div className="relative h-[500px] w-full overflow-hidden">
      {banners.map((banner, index) => (
        <div
          key={banner.id}
          className={`absolute inset-0 transition-opacity duration-500 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={banner.image}
            alt={banner.title}
            fill
            className="object-cover"
            priority={index === 0}
          />
          <div className="absolute inset-0 bg-opacity-40 flex items-center">
            <div className="container mx-auto px-4">
              <div className="max-w-2xl">
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                  {banner.title}
                </h1>
                <p className="text-xl text-white mb-8">{banner.description}</p>
                <Link
                  href={banner.link}
                  className="inline-block bg-white text-blue-600 px-8 py-3 rounded-md font-medium hover:bg-blue-50 transition-colors"
                >
                  {banner.buttonText}
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 text-white p-2 rounded-full transition-colors"
      >
        <ChevronLeftIcon className="h-6 w-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 text-white p-2 rounded-full transition-colors"
      >
        <ChevronRightIcon className="h-6 w-6" />
      </button>

      {/* Dots Navigation */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === currentSlide ? "bg-white" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Banner;
