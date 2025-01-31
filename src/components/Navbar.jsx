import { Link } from "react-router-dom";

const Navbar = ({ cartCount }) => {
  return (
    <nav className="bg-gray-900 text-white p-4 flex justify-between">
      <Link to="/" className="text-xl font-bold">Shop</Link>
      <Link to="/cart" className="relative">
        🛒
        {cartCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white px-2 py-1 text-xs rounded-full">
            {cartCount}
          </span>
        )}
      </Link>
    </nav>
  );
};

export default Navbar;
