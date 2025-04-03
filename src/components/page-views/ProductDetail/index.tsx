"use client";
import React, { useState } from "react";
import Layout from "@/components/layout/Layout";
import Image from "next/image";
import { mockProducts, mockCategories } from "@/mocks/data";
import Link from "next/link";
import { useCart } from "@/contexts/CartContext";

interface ProductDetailPageViewProps {
  product: (typeof mockProducts)[0];
}

const ProductDetailPageView = ({ product }: ProductDetailPageViewProps) => {
  const [quantity, setQuantity] = useState(1);
  const category = mockCategories.find((c) => c.id === product.categoryId);
  const { addToCart } = useCart();
  // Lấy sản phẩm liên quan (cùng category)
  const relatedProducts = mockProducts
    .filter((p) => p.categoryId === product.categoryId && p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="text-sm breadcrumbs mb-8">
          <ul className="flex space-x-2">
            <li>
              <Link href="/" className="text-gray-500 hover:text-gray-700">
                Home
              </Link>
            </li>
            <li className="text-gray-500">/</li>
            <li>
              <Link
                href={`/categories/${category?.slug}`}
                className="text-gray-500 hover:text-gray-700"
              >
                {category?.name}
              </Link>
            </li>
            <li className="text-gray-500">/</li>
            <li className="text-gray-700">{product.name}</li>
          </ul>
        </div>

        {/* Product Detail */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Product Image */}
          <div className="relative h-[400px] md:h-[500px] rounded-lg overflow-hidden">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
            />
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <div className="flex items-center space-x-2">
              <div className="flex items-center text-yellow-500">
                {Array.from({ length: 5 }).map((_, index) => (
                  <span key={index}>
                    {index < Math.floor(product.rating) ? "★" : "☆"}
                  </span>
                ))}
              </div>
              <span className="text-gray-600">({product.rating})</span>
            </div>
            <p className="text-gray-600">{product.description}</p>
            <div className="text-3xl font-bold text-blue-500">
              ${product.price.toFixed(2)}
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center space-x-4">
              <label className="text-gray-600">Quantity:</label>
              <div className="flex items-center border rounded-md">
                <button
                  className="px-3 py-1 border-r hover:bg-gray-100"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  -
                </button>
                <span className="px-4 py-1">{quantity}</span>
                <button
                  className="px-3 py-1 border-l hover:bg-gray-100"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              className="w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 transition-colors"
            >
              Add to Cart
            </button>

            {/* Additional Info */}
            <div className="border-t pt-6 mt-6">
              <h3 className="font-semibold mb-2">Product Details:</h3>
              <ul className="space-y-2 text-gray-600">
                <li>Category: {category?.name}</li>
                <li>SKU: {product.id}</li>
                {/* Add more product details as needed */}
              </ul>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Related Products</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <Link
                  key={relatedProduct.id}
                  href={`/products/${relatedProduct.slug}`}
                  className="group"
                >
                  <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="relative h-48">
                      <Image
                        src={relatedProduct.image}
                        alt={relatedProduct.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold">{relatedProduct.name}</h3>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-blue-500 font-bold">
                          ${relatedProduct.price.toFixed(2)}
                        </span>
                        <span className="text-yellow-500">
                          ★ {relatedProduct.rating}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ProductDetailPageView;
