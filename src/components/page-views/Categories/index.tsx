"use client";
import React, { useState } from "react";
import Layout from "@/components/layout/Layout";
import { mockCategories, mockProducts } from "@/mocks/data";
import Image from "next/image";
import ProductCard from "@/components/common/ProductCard";

interface CategoriesPageViewProps {
  initialCategory?: string | null;
}

const CategoriesPageView = ({
  initialCategory = mockCategories[0]?.id || null,
}: CategoriesPageViewProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    initialCategory
  );

  // Lấy sản phẩm theo category
  const getProductsByCategory = (categoryId: string) => {
    return mockProducts.filter((product) => product.categoryId === categoryId);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Product Categories</h1>
          <p className="text-gray-600">
            Explore our wide range of products by category
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {mockCategories.map((category) => (
            <div
              key={category.id}
              className={`relative rounded-lg overflow-hidden cursor-pointer transition-transform hover:scale-105 ${
                selectedCategory === category.id
                  ? "ring-2 ring-blue-500"
                  : "ring-1 ring-gray-200"
              }`}
              onClick={() => setSelectedCategory(category.id)}
            >
              <div className="relative h-48">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                  <h2 className="text-white text-2xl font-semibold">
                    {category.name}
                  </h2>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Products Section */}
        {selectedCategory && (
          <div className="mt-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold">
                {
                  mockCategories.find(
                    (category) => category.id === selectedCategory
                  )?.name
                }{" "}
                Products
              </h2>
              <button
                className="text-blue-500 hover:text-blue-700"
                onClick={() => setSelectedCategory(null)}
              >
                View All Categories
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {getProductsByCategory(selectedCategory).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {!selectedCategory && (
          <div className="text-center text-gray-600 mt-8">
            <p>Select a category to view its products</p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default CategoriesPageView;
