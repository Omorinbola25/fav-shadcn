import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductList from "./pages/ProductList";
import ProductDetails from "./pages/ProductDetails";
import CartPage from "./pages/CartPage";
import Navbar from "./components/Navbar";
import CheckoutPage from "./pages/CheckoutPage";

const products = [
    { id: 1, name: "Shoe", price: 50, image: "/assets/shoe.png", description: "A comfortable shoe.", category: "Footwear", stock: 100, rating: 4.5, sizes: ["40", "41", "42", "43"] },
    { id: 2, name: "Bag", price: 80, image: "/assets/my.jpg", description: "A stylish bag.", category: "Accessories", stock: 50, rating: 4.2, colors: ["Black", "Brown", "Gray"] },
    { id: 3, name: "Car", price: 20000, image: "/assets/car.png", description: "A fast car.", category: "Vehicles", stock: 5, rating: 4.8, colors: ["Red", "Blue", "Black"] },
    { id: 4, name: "Laptop", price: 1200, image: "/assets/laptop.png", description: "A high-performance laptop.", category: "Electronics", stock: 30, rating: 4.7, colors: ["Silver", "Black"] },
    { id: 5, name: "Smartphone", price: 800, image: "/assets/phone.png", description: "A modern smartphone.", category: "Electronics", stock: 50, rating: 4.6, colors: ["Black", "White", "Blue"] },
    { id: 6, name: "Headphones", price: 150, image: "/assets/headphone.png", description: "Noise-cancelling headphones.", category: "Electronics", stock: 200, rating: 4.3, colors: ["Black", "gray", "blue"] },
    { id: 7, name: "Watch", price: 200, image: "/assets/black sport watch.png", description: "A stylish wristwatch.", category: "Accessories", stock: 80, rating: 4.4, colors: ["Black", "Silver", "Gold"] },
    { id: 8, name: "Jacket", price: 120, image: "/assets/jacket.png", description: "A warm and cozy jacket.", category: "Clothing", stock: 40, rating: 4.5, sizes: ["S", "M", "L", "XL"] },
    { id: 9, name: "Sunglasses", price: 90, image: "/assets/sunglass.png", description: "Stylish sunglasses for sunny days.", category: "Accessories", stock: 60, rating: 4.2, colors: ["Black", "Brown", "Blue"] },
  ];
  
function App() {
  const [cart, setCart] = useState(() => {
    // Get cart from localStorage or initialize as an empty array
    const savedCart = JSON.parse(localStorage.getItem("cart"));
    return savedCart || [];
  });

  // Sync cart to localStorage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Add to Cart
  const handleAddToCart = (product) => {
    setCart((prevCart) => {
      const itemExists = prevCart.find((item) => item.id === product.id);
      if (itemExists) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  // Remove from Cart
  const handleRemoveFromCart = (productId) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  // Calculate total items in cart
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <Router>
      <Navbar cartCount={cartCount} />
       {/* Header Section with Background Image */}
       <header
  className="relative w-full h-[400px] bg-no-repeat bg-cover bg-center"
  style={{ backgroundImage: "url('/assets/header.png')" }}
>
  {/* Gradient Overlay */}
  <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/70"></div>

  {/* Centered Content */}
  <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4">
    <h1 className="text-5xl font-extrabold tracking-wide drop-shadow-lg">
      Simple is More
    </h1>
    <p className="mt-4 text-lg font-light opacity-90">
      Discover the finest collections for your style.
    </p>

    {/* Search Bar */}
    <div className="relative mt-6 w-full max-w-md">
      <input
        type="text"
        placeholder="What are you looking for?"
        className="w-full p-3 pl-12 rounded-full bg-white text-gray-700 focus:ring-2 focus:ring-gray-500 outline-none shadow-md"
      />
      <svg
        className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500"
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        fill="currentColor"
        viewBox="0 0 16 16"
      >
        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h.001a1 1 0 0 0 .282.217l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.217-.282zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
      </svg>
    </div>
  </div>
</header>
      <div className="container mx-auto p-4">
        <Routes>
          <Route path="/" element={<ProductList products={products} handleAddToCart={handleAddToCart} />} />
          <Route path="/product/:productId" element={<ProductDetails products={products} handleAddToCart={handleAddToCart} />} />
          <Route path="/cart" element={<CartPage cartItems={cart} handleAddToCart={handleAddToCart} handleRemoveFromCart={handleRemoveFromCart} />} />
          <Route path="/checkout" element={<CheckoutPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
