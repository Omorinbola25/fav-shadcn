import { useParams, useNavigate } from "react-router-dom";

const ProductDetails = ({ products, handleAddToCart }) => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const product = products.find((p) => p.id === parseInt(productId));

  if (!product) {
    return <div>Product not found!</div>;
  }

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded-lg">
      {/* Product Image (Smaller) */}
      <img
        src={product.image}
        alt={product.name}
        className="w-40 h-40 object-cover mx-auto"
      />

      <h2 className="text-xl font-bold mt-4">{product.name}</h2>
      <p className="text-gray-600">{product.description}</p>
      <p className="text-lg font-semibold mt-2">${product.price}</p>

      {/* Product Rating (Stars) */}
      <div className="flex items-center mt-2">
        <span className="text-yellow-500 text-lg">
          {"★".repeat(Math.floor(product.rating))}{" "}
          <span className="text-gray-400">
            {"☆".repeat(5 - Math.floor(product.rating))}
          </span>
        </span>
        <span className="ml-2 text-gray-600 text-sm">({product.rating})</span>
      </div>

      {/* Stock Availability */}
      <p className={`mt-2 font-semibold ${product.stock > 0 ? "text-green-600" : "text-red-600"}`}>
        {product.stock > 0 ? `In Stock (${product.stock} available)` : "Out of Stock"}
      </p>

      {/* Category */}
      <p className="mt-2 text-gray-700">
        <span className="font-semibold">Category:</span> {product.category}
      </p>

      {/* Display Sizes (if available) */}
      {product.sizes && (
        <div className="mt-3">
          <span className="font-semibold">Sizes: </span>
          <select className="border p-1 ml-2 rounded">
            {product.sizes.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Display Colors (if available) */}
      {product.colors && (
        <div className="mt-3">
          <span className="font-semibold">Colors: </span>
          <div className="flex space-x-2 mt-1">
            {product.colors.map((color) => (
              <div
                key={color}
                className="w-5 h-5 rounded-full border"
                style={{ backgroundColor: color.toLowerCase() }}
                title={color}
              ></div>
            ))}
          </div>
        </div>
      )}

      {/* Product Specifications (if available) */}
      {product.specifications && (
        <div className="mt-3">
          <p className="font-semibold">Specifications:</p>
          <ul className="list-disc list-inside text-gray-600 text-sm">
            {product.specifications.map((spec, index) => (
              <li key={index}>{spec}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Customer Reviews (Placeholder) */}
      <div className="mt-3">
        <p className="font-semibold">Customer Reviews:</p>
        <div className="bg-gray-100 p-2 rounded mt-1 text-gray-700 text-sm">
          ⭐⭐⭐⭐☆ - "Great product! Would buy again."
        </div>
        <div className="bg-gray-100 p-2 rounded mt-1 text-gray-700 text-sm">
          ⭐⭐⭐⭐⭐ - "Exactly as described, fast shipping!"
        </div>
      </div>

      {/* Buttons */}
      <div className="mt-4 flex space-x-4">
        <button
          onClick={() => handleAddToCart(product)}
          className="bg-blue-500 text-white px-3 py-1 rounded"
        >
          Add to Cart
        </button>
        <button
  onClick={() => navigate(-1)}
  className="bg-gray-500 text-white px-3 py-1 rounded"
>
  Continue Shopping
</button>

      </div>
    </div>
  );
};

export default ProductDetails;
