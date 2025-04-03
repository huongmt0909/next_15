"use client";
import React from "react";
import ProductCard from "@/components/common/ProductCard";
import { mockProducts } from "@/mocks/data";

const BestSellers = () => {
  // Use mock products but sort by rating to simulate best sellers
  const bestSellers = [...mockProducts].sort((a, b) => b.rating - a.rating);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {bestSellers.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default BestSellers;
