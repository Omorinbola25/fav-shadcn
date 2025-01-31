import { useNavigate } from "react-router-dom";
import { FaHeart, FaTrash } from "react-icons/fa";
import { FiLock } from "react-icons/fi";
import { IoArrowBack } from "react-icons/io5";
import { useState } from "react";

const CartPage = ({ cartItems, handleAddToCart, handleRemoveFromCart }) => {
  const navigate = useNavigate();
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);

  const toggleLike = (id) => {
    const updatedCart = cartItems.map((item) =>
      item.id === id ? { ...item, liked: !item.liked } : item
    );
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleApplyPromo = () => {
    if (promoCode === "DISCOUNT10") {
      setDiscount(10); // Example discount
    } else {
      setDiscount(0);
    }
  };

  const handleCheckout = () => {
    navigate("/checkout", { state: { cart: cartItems } });
  };

  const orderAmount = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const totalPayment = orderAmount - discount;

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <button onClick={() => navigate(-1)} className="text-2xl">
          <IoArrowBack />
        </button>
        <h2 className="text-xl font-bold">Cart</h2>
        <FiLock className="text-2xl" />
      </div>

      {/* Cart Items */}
      {cartItems.length === 0 ? (
        <p className="text-gray-500 text-center">Your cart is empty.</p>
      ) : (
        <div>
          <ul>
            {cartItems.map((item) => (
              <li key={item.id} className="flex items-center justify-between p-4 border-b">
                <div className="flex items-center">
                  <img src={item.image} alt={item.name} className="w-16 h-16 rounded-lg object-cover mr-4" />
                  <div>
                    <p className="font-bold">{item.name}</p>
                    <p className="text-gray-600 text-sm flex items-center">
                      ⭐ {item.rating || "3.5"} &nbsp;|&nbsp; ${item.price}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  {/* Like Button */}
                  <button onClick={() => toggleLike(item.id)} className={`text-xl ${item.liked ? "text-red-500" : "text-gray-400"}`}>
                    <FaHeart />
                  </button>

                  {/* Quantity Controls */}
                  <div className="flex items-center border px-2 py-1 rounded-lg">
                    <button onClick={() => handleRemoveFromCart(item.id)} className="px-2">-</button>
                    <span className="px-2">{item.quantity}</span>
                    <button onClick={() => handleAddToCart(item)} className="px-2">+</button>
                  </div>

                  {/* Delete Button */}
                  <button onClick={() => handleRemoveFromCart(item.id)} className="text-red-500">
                    <FaTrash />
                  </button>
                </div>
              </li>
            ))}
          </ul>

          {/* Promo Code */}
          <div className="flex items-center mt-4 border p-3 rounded-lg">
            <input
              type="text"
              placeholder="Promo Code"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              className="w-full outline-none"
            />
            <button onClick={handleApplyPromo} className="bg-black text-white px-4 py-2 rounded-lg">
              Apply
            </button>
          </div>

          {/* Order Summary */}
          <div className="mt-4 text-sm space-y-2">
            <div className="flex justify-between">
              <span>Order Amount</span>
              <span>${orderAmount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Discount</span>
              <span>${discount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold">
              <span>Total Payment</span>
              <span>${totalPayment.toFixed(2)}</span>
            </div>
          </div>

          {/* Checkout Button */}
          <button
            onClick={handleCheckout}
            className="w-full bg-black text-white text-lg py-3 rounded-lg mt-6"
          >
            Checkout
          </button>
        </div>
      )}
    </div>
  );
};

export default CartPage;
