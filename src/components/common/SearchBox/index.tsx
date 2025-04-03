"use client";
import React, { useState, useRef, useEffect } from "react";
import { MagnifyingGlassIcon as SearchIcon } from "@heroicons/react/24/outline";
import { mockProducts } from "@/mocks/data";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

const SearchBox = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState<typeof mockProducts>([]);
  const searchRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Xử lý click outside để đóng dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Xử lý search và filter suggestions
  const handleSearch = (value: string) => {
    setSearchTerm(value);
    if (value.trim() === "") {
      setSuggestions([]);
      return;
    }

    const filtered = mockProducts
      .filter((product) =>
        product.name.toLowerCase().includes(value.toLowerCase())
      )
      .slice(0, 5); // Giới hạn 5 kết quả

    setSuggestions(filtered);
    setIsOpen(true);
  };

  // Xử lý khi nhấn Enter
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && searchTerm.trim() !== "") {
      router.push(`/search?q=${encodeURIComponent(searchTerm)}`);
      setIsOpen(false);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);
  };

  return (
    <div className="relative" ref={searchRef}>
      {/* Search Input - Điều chỉnh màu chữ và placeholder */}
      <div className="relative">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
          onKeyPress={handleKeyPress}
          onFocus={() => setIsOpen(true)}
          placeholder="Search products..."
          className="w-64 pl-10 pr-4 py-2 rounded-full border border-gray-300 
            focus:outline-none focus:border-blue-500 transition-colors
            text-gray-900 placeholder-gray-500 bg-white"
        />
        <SearchIcon className="h-5 w-5 text-gray-500 absolute left-3 top-1/2 transform -translate-y-1/2" />
      </div>

      {/* Suggestions Dropdown - Điều chỉnh màu tên sản phẩm */}
      {isOpen && suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg overflow-hidden z-50">
          {suggestions.map((product) => (
            <Link
              key={product.id}
              href={`/products/${product.slug}`}
              className="flex items-center p-3 hover:bg-gray-50 transition-colors"
              onClick={() => {
                setIsOpen(false);
                setSearchTerm("");
              }}
            >
              <div className="relative w-12 h-12 flex-shrink-0">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover rounded"
                />
              </div>
              <div className="ml-4 flex-grow">
                <h4 className="text-base font-semibold text-black">
                  {product.name}
                </h4>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-sm text-blue-600 font-medium">
                    {formatPrice(product.price)}
                  </span>
                  <div className="flex items-center">
                    <span className="text-yellow-500 mr-1">★</span>
                    <span className="text-sm text-gray-700">
                      {product.rating}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* No Results - Điều chỉnh màu chữ thông báo không tìm thấy */}
      {isOpen && searchTerm && suggestions.length === 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg p-4 text-center text-gray-700 z-50">
          No products found
        </div>
      )}
    </div>
  );
};

export default SearchBox;
