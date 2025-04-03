import React from "react";
import { mockCategories } from "@/mocks/data";
import { notFound } from "next/navigation";
import CategoriesPageView from "@/components/page-views/Categories";

interface CategoryPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: CategoryPageProps) {
  const category = mockCategories.find((cat) => cat.slug === params.slug);

  if (!category) {
    return {
      title: "Category Not Found",
    };
  }

  return {
    title: `${category.name} - Your Store`,
    description: `Explore our ${category.name} products`,
  };
}

export async function generateStaticParams() {
  return mockCategories.map((category) => ({
    slug: category.slug,
  }));
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const category = mockCategories.find((cat) => cat.slug === params.slug);

  if (!category) {
    notFound();
  }

  return <CategoriesPageView initialCategory={category.id} />;
}
