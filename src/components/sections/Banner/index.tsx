"use client";
import React from "react";
import Image from "next/image";

const Banner = () => {
  return (
    <div className="relative h-[500px] w-full overflow-hidden bg-cyan-100">
      <Image
        src="https://t4.ftcdn.net/jpg/03/06/69/49/360_F_306694930_S3Z8H9Qk1MN79ZUe7bEWqTFuonRZdemw.jpg"
        alt="Welcome to our store"
        fill
        className="object-contain"
        priority
      />
    </div>
  );
};

export default Banner;
