"use client";
import React from "react";
import Link from "next/link";
import { mockCategories } from "@/mocks/data";

const Categories = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {mockCategories.map((category) => (
        <Link
          key={category.id}
          href={`/categories/${category.slug}`}
          className="group relative h-48 overflow-hidden rounded-lg"
        >
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-110"
            style={{ backgroundImage: `url(${category.image})` }}
          >
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
              <h3 className="text-white text-xl font-semibold">
                {category.name}
              </h3>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Categories;
