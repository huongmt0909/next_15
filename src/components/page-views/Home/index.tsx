"use client";
import React from "react";
import Layout from "@/components/layout/Layout";
import Banner from "@/components/sections/Banner";
// import BannerSlider from "@/components/sections/BannerSlider";
import PopularProducts from "@/components/sections/PopularProducts";
import BestSellers from "@/components/sections/BestSellers";
import Categories from "@/components/sections/Categories";

const HomePageView = () => {
  return (
    <Layout>
      <Banner />
      {/* <BannerSlider /> */}
      <div className="container mx-auto px-4 py-8 space-y-12 ">
        <Categories />
        <PopularProducts />
        <BestSellers />
      </div>
    </Layout>
  );
};

export default HomePageView;
