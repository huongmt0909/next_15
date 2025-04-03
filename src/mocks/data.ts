export interface Category {
  id: string;
  name: string;
  image: string;
  slug: string;
}

export const mockProducts = [
  {
    id: "1",
    name: "Nike Air Max 2024",
    price: 199.99,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
    slug: "nike-air-max-2024",
    description: "The latest in comfort and style",
    rating: 4.5,
    categoryId: "3", // Sports
  },
  {
    id: "2",
    name: "Wireless Headphones",
    price: 159.99,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
    slug: "wireless-headphones",
    description: "Premium sound quality",
    rating: 4.8,
    categoryId: "1", // Electronics
  },
  {
    id: "3",
    name: "Smart Watch Pro",
    price: 299.99,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
    slug: "smart-watch-pro",
    description: "Stay connected in style",
    rating: 4.6,
    categoryId: "1", // Electronics
  },
  {
    id: "4",
    name: "Gaming Laptop",
    price: 1299.99,
    image: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45",
    slug: "gaming-laptop",
    description: "Ultimate gaming experience",
    rating: 4.9,
    categoryId: "1", // Electronics
  },
  {
    id: "5",
    name: "Running Shoes",
    price: 129.99,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
    slug: "running-shoes",
    description: "Perfect for your daily run",
    rating: 4.7,
    categoryId: "3", // Sports
  },
  {
    id: "6",
    name: "Designer T-Shirt",
    price: 49.99,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",
    slug: "designer-t-shirt",
    description: "Trendy and comfortable",
    rating: 4.3,
    categoryId: "2", // Fashion
  },
  // Thêm nhiều sản phẩm hơn để test phân trang
  // ... thêm các sản phẩm khác
];

export const mockCategories: Category[] = [
  {
    id: "1",
    name: "Electronics",
    image: "/images/categories/electronics.jpg",
    slug: "electronics",
  },
  {
    id: "2",
    name: "Clothing",
    image: "/images/categories/clothing.jpg",
    slug: "clothing",
  },
  {
    id: "3",
    name: "Books",
    image: "/images/categories/books.jpg",
    slug: "books",
  },
  {
    id: "4",
    name: "Home & Garden",
    image: "/images/categories/home.jpg",
    slug: "home-garden",
  },
  {
    id: "5",
    name: "Sports",
    image: "/images/categories/sports.jpg",
    slug: "sports",
  },
  // Thêm các category khác nếu cần
];

export const mockBanners = [
  {
    id: "1",
    title: "Summer Sale",
    description: "Up to 50% off on selected items",
    image: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04",
    buttonText: "Shop Now",
    buttonLink: "/sale",
  },
  {
    id: "2",
    title: "New Collection",
    description: "Check out our latest fashion arrivals",
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b",
    buttonText: "Explore",
    buttonLink: "/new-arrivals",
  },
  {
    id: "3",
    title: "Electronics Week",
    description: "Latest gadgets at amazing prices",
    image: "https://images.unsplash.com/photo-1498049794561-7780e7231661",
    buttonText: "View Deals",
    buttonLink: "/electronics",
  },
];
