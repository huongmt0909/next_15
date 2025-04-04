"use client";
import React from "react";
import { mockProducts } from "@/mocks/data";
import ProductCard from "@/components/common/ProductCard";

const PopularProducts = () => {
  return (
    <div>
      <h2 className="text-3xl font-bold text-primary-800 mb-8 text-left">
        Popular Products
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {mockProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default PopularProducts;
