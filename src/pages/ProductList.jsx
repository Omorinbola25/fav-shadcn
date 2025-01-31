import { Link } from "react-router-dom";

const ProductList = ({ products, handleAddToCart }) => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4">
        {products.map((product) => (
          <div key={product.id} className="border p-4 rounded-lg shadow-md">
            {/* Image with Fixed Size */}
            <img
              src={product.image}
              alt={product.name}
              className="w-48 h-48 object-cover mx-auto"
            />
  
            <h3 className="text-lg font-semibold mt-2">{product.name}</h3>
            <p className="text-gray-600">${product.price}</p>
  
            <button
              onClick={() => handleAddToCart(product)}
              className="mt-2 bg-green-500 text-white px-4 py-2 rounded"
            >
              Add to Cart
            </button>
            <Link to={`/product/${product.id}`}>
            <button className="bg-blue-500 text-white px-6 py-2 mt-4 rounded-lg">View Details</button>
          </Link>
          </div>
        ))}
      </div>
    );
  };
  
  export default ProductList;
  