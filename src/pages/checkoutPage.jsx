import { useNavigate, useLocation } from "react-router-dom";

const CheckoutPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { cart } = location.state || {}; // Get cart data from the state object

  if (!cart || cart.length === 0) {
    return (
      <p className="text-center text-gray-500 mt-10 text-lg">
        Your cart is empty. Please add items before proceeding to checkout.
      </p>
    );
  }

  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  const handlePlaceOrder = () => {
    alert("Thank you for your purchase!");
    localStorage.removeItem("cart");
    navigate("/", { replace: true });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-3xl">
        <h2 className="text-3xl font-bold mb-6 text-center">Checkout</h2>

        {/* Order Summary */}
        <div className="border-t pt-4">
          <h3 className="text-2xl font-semibold mb-4">Order Summary</h3>
          <ul className="divide-y divide-gray-300">
            {cart.map((item) => (
              <li key={item.id} className="flex justify-between items-center py-4">
                <div className="flex items-center">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-lg mr-4"
                  />
                  <div>
                    <p className="font-semibold text-lg">{item.name}</p>
                    <p className="text-gray-600">${item.price} x {item.quantity}</p>
                  </div>
                </div>
                <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
              </li>
            ))}
          </ul>
        </div>

        {/* Total Price */}
        <div className="flex justify-between items-center border-t mt-6 pt-4 text-lg font-bold">
          <p>Total Amount:</p>
          <p className="text-green-600 text-2xl">${totalPrice.toFixed(2)}</p>
        </div>

        {/* Place Order Button */}
        <button
          className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 mt-6 rounded-lg transition-all"
          onClick={handlePlaceOrder}
        >
          Place Order
        </button>
      </div>
    </div>
  );
};

export default CheckoutPage;
