"use client";
import React, { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Tab } from "@headlessui/react";
import {
  UserIcon,
  ShoppingBagIcon,
  HeartIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import { formatCurrency } from "@/utils/format";

// Mock data cho đơn hàng
const mockOrders = [
  {
    id: "1",
    date: "2024-03-15",
    status: "Delivered",
    total: 2500000,
    items: [
      {
        id: "1",
        name: "Product 1",
        price: 1500000,
        quantity: 1,
        image: "/images/product1.jpg",
      },
      {
        id: "2",
        name: "Product 2",
        price: 1000000,
        quantity: 1,
        image: "/images/product2.jpg",
      },
    ],
  },
  // Thêm các đơn hàng khác...
];

const ProfilePageView = () => {
  const [selectedTab, setSelectedTab] = useState(0);

  const tabs = [
    {
      name: "Personal Info",
      icon: UserIcon,
      content: (
        <div className="space-y-6">
          <h3 className="text-xl font-semibold">Personal Information</h3>
          <form className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <input
                  type="text"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  defaultValue="John Doe"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  defaultValue="john@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Phone
                </label>
                <input
                  type="tel"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  defaultValue="+84 123 456 789"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Date of Birth
                </label>
                <input
                  type="date"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  defaultValue="1990-01-01"
                />
              </div>
            </div>
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              Save Changes
            </button>
          </form>
        </div>
      ),
    },
    {
      name: "Orders",
      icon: ShoppingBagIcon,
      content: (
        <div className="space-y-6">
          <h3 className="text-xl font-semibold">Order History</h3>
          <div className="space-y-4">
            {mockOrders.map((order) => (
              <div
                key={order.id}
                className="bg-white rounded-lg shadow-md p-4 space-y-4"
              >
                <div className="flex justify-between items-center border-b pb-4">
                  <div>
                    <p className="font-medium">Order #{order.id}</p>
                    <p className="text-sm text-gray-600">
                      {new Date(order.date).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        order.status === "Delivered"
                          ? "bg-green-100 text-green-800"
                          : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {order.status}
                    </span>
                    <span className="font-medium text-blue-600">
                      {formatCurrency(order.total)}
                    </span>
                  </div>
                </div>
                <div className="space-y-3">
                  {order.items.map((item) => (
                    <div key={item.id} className="flex items-center gap-4">
                      <div className="relative w-16 h-16">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover rounded-md"
                        />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-gray-600">
                          {formatCurrency(item.price)} x {item.quantity}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      name: "Wishlist",
      icon: HeartIcon,
      content: (
        <div className="space-y-6">
          <h3 className="text-xl font-semibold">My Wishlist</h3>
          {/* Implement wishlist content */}
        </div>
      ),
    },
    {
      name: "Addresses",
      icon: MapPinIcon,
      content: (
        <div className="space-y-6">
          <h3 className="text-xl font-semibold">My Addresses</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border rounded-lg p-4">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h4 className="font-medium">Home</h4>
                  <p className="text-gray-600">John Doe</p>
                  <p className="text-gray-600">+84 123 456 789</p>
                </div>
                <div className="flex gap-2">
                  <button className="text-blue-600 hover:text-blue-700">
                    Edit
                  </button>
                  <button className="text-red-600 hover:text-red-700">
                    Delete
                  </button>
                </div>
              </div>
              <p className="text-gray-600">
                123 Street Name, District, City, Country
              </p>
            </div>
            <button className="border-2 border-dashed rounded-lg p-4 text-center text-gray-600 hover:text-blue-600 hover:border-blue-600 transition-colors">
              + Add New Address
            </button>
          </div>
        </div>
      ),
    },
  ];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-8">My Profile</h1>

        <Tab.Group selectedIndex={selectedTab} onChange={setSelectedTab}>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Sidebar Navigation */}
            <div className="md:col-span-1">
              <Tab.List className="flex flex-col space-y-2">
                {tabs.map((tab) => (
                  <Tab
                    key={tab.name}
                    className={({ selected }) =>
                      `flex items-center gap-3 px-4 py-3 rounded-lg text-left ${
                        selected
                          ? "bg-blue-50 text-blue-600"
                          : "text-gray-600 hover:bg-gray-50"
                      }`
                    }
                  >
                    <tab.icon className="h-5 w-5" />
                    <span>{tab.name}</span>
                  </Tab>
                ))}
              </Tab.List>
            </div>

            {/* Content Area */}
            <div className="md:col-span-3">
              <Tab.Panels>
                {tabs.map((tab) => (
                  <Tab.Panel
                    key={tab.name}
                    className="bg-white rounded-lg shadow-md p-6"
                  >
                    {tab.content}
                  </Tab.Panel>
                ))}
              </Tab.Panels>
            </div>
          </div>
        </Tab.Group>
      </div>
    </Layout>
  );
};

export default ProfilePageView;
