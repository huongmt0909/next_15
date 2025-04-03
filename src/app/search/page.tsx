import React from "react";
import SearchPageView from "@/components/page-views/Search";

export const metadata = {
  title: "Search Results - Your Store",
  description: "Search results for products",
};

export default function SearchPage({
  searchParams,
}: {
  searchParams: { q: string };
}) {
  return <SearchPageView initialQuery={searchParams.q} />;
}
