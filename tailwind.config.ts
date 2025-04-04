/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      // Custom colors
      colors: {
        primary: {
          50: "#f0f9ff",
          100: "#e0f2fe",
          200: "#bae6fd",
          300: "#7dd3fc",
          400: "#38bdf8",
          500: "#0ea5e9",
          600: "#0284c7",
          700: "#0369a1",
          800: "#075985",
          900: "#0c4a6e",
        },
        secondary: {
          // Thêm màu secondary tùy chỉnh
          DEFAULT: "#FF6B6B",
          dark: "#FF5252",
        },
        // Thêm màu đơn lẻ
        accent: "#FFD93D",
      },

      // Custom font families
      fontFamily: {
        sans: ["Roboto", "system-ui", "sans-serif"],
        heading: ["Montserrat", "sans-serif"],
        body: ["Open Sans", "sans-serif"],
      },

      // Custom font sizes
      fontSize: {
        tiny: "0.625rem", // 10px
        regular: "1rem", // 16px
        medium: "1.125rem", // 18px
        large: "1.25rem", // 20px
        xl: "1.5rem", // 24px
        "2xl": "2rem", // 32px
      },

      // Custom spacing
      spacing: {
        "15": "3.75rem",
        "128": "32rem",
        "144": "36rem",
      },

      // Custom border radius
      borderRadius: {
        custom: "1.5rem",
      },

      // Custom box shadow
      boxShadow: {
        custom:
          "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
      },
    },
  },
  plugins: [],
};
