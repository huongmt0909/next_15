"use client";
import React from "react";
import { mockProducts } from "@/mocks/data";
import ProductCard from "@/components/common/ProductCard";

const PopularProducts = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {mockProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default PopularProducts;
