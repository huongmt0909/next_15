"use client";
import React, { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import { mockProducts, mockCategories } from "@/mocks/data";
import ProductCard from "@/components/common/ProductCard";
import { useRouter, useSearchParams } from "next/navigation";

interface SearchPageViewProps {
  initialQuery?: string;
}

const ITEMS_PER_PAGE = 12;

const SearchPageView = ({ initialQuery = "" }: SearchPageViewProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [inputQuery, setInputQuery] = useState(initialQuery);
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [sortBy, setSortBy] = useState<
    "relevance" | "price_asc" | "price_desc" | "rating"
  >("relevance");

  // Xử lý tìm kiếm khi nhấn nút Search
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchQuery(inputQuery);
    router.push(`/search?q=${encodeURIComponent(inputQuery)}`);
  };

  // Cập nhật URL khi thay đổi params
  useEffect(() => {
    const query = searchParams.get("q") || "";
    setInputQuery(query);
    setSearchQuery(query);
    setCurrentPage(1);
  }, [searchParams]);

  // Tìm kiếm sản phẩm
  const searchProducts = () => {
    if (!searchQuery.trim()) return mockProducts;

    const results = mockProducts.filter(
      (product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Sắp xếp kết quả
    switch (sortBy) {
      case "price_asc":
        results.sort((a, b) => a.price - b.price);
        break;
      case "price_desc":
        results.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        results.sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }

    return results;
  };

  const searchResults = searchProducts();
  const totalPages = Math.ceil(searchResults.length / ITEMS_PER_PAGE);
  const paginatedResults = searchResults.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Search Header */}
        <div className="mb-8">
          <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
            <div className="flex gap-4">
              <input
                type="text"
                value={inputQuery}
                onChange={(e) => setInputQuery(e.target.value)}
                placeholder="Search products..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 text-gray-300 placeholder-gray-500"
              />
              <button
                type="submit"
                className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
              >
                Search
              </button>
            </div>
          </form>
        </div>

        {/* Filters Section */}
        <div className="mb-6 flex flex-wrap gap-4 items-center">
          <div className="flex items-center gap-2">
            <span className="text-gray-700 font-medium">Category:</span>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            >
              <option value="all">All Categories</option>
              {mockCategories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-gray-700 font-medium">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            >
              <option value="relevance">Relevance</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>

        {/* Results Info */}
        <div className="mb-6">
          <p className="text-gray-600">
            Found {searchResults.length} results
            {searchQuery && ` for "${searchQuery}"`}
            {selectedCategory !== "all" &&
              ` in ${
                mockCategories.find((c) => c.id === selectedCategory)?.name
              }`}
          </p>
        </div>

        {/* Search Results */}
        {searchResults.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
              {paginatedResults.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center gap-2">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 rounded-md bg-gray-100 disabled:opacity-50"
                >
                  Previous
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`px-4 py-2 rounded-md ${
                        currentPage === page
                          ? "bg-blue-500 text-white"
                          : "bg-gray-100"
                      }`}
                    >
                      {page}
                    </button>
                  )
                )}
                <button
                  onClick={() =>
                    setCurrentPage((p) => Math.min(totalPages, p + 1))
                  }
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 rounded-md bg-gray-100 disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            )}
          </>
        ) : searchQuery ? (
          <div className="text-center py-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              No results found
            </h2>
            <p className="text-gray-600">
              Try adjusting your search or filter to find what you&apos;re
              looking for.
            </p>
          </div>
        ) : null}
      </div>
    </Layout>
  );
};

export default SearchPageView;
