import { Heart, Star } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  const [isLiked, setIsLiked] = useState(false);

  return (
    <div className="group relative">
      <Link to={`/product/${product.id}`}>
        <div className="w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden group-hover:opacity-75 transition-opacity">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-64 object-center object-cover"
          />
        </div>
        <div className="mt-4 flex justify-between">
          <div>
            <h3 className="text-sm text-gray-700">
              <span className="font-medium">{product.title}</span>
            </h3>
            <p className="mt-1 text-sm text-gray-500 capitalize">
              {product.category}
            </p>
          </div>
          <p className="text-sm font-medium text-gray-900">${product.price}</p>
        </div>
        <div className="mt-2 flex items-center">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < Math.floor(product.rating.rate)
                    ? "text-yellow-400 fill-current"
                    : "text-gray-300"
                }`}
              />
            ))}
          </div>
          <span className="ml-2 text-sm text-gray-500">
            ({product.rating.count})
          </span>
        </div>
      </Link>
      <button
        onClick={(e) => {
          e.preventDefault();
          setIsLiked(!isLiked);
        }}
        className="absolute top-2 right-2 p-2 rounded-full bg-white shadow-md hover:shadow-lg transition-shadow cursor-pointer"
      >
        <Heart
          className={`h-5 w-5 ${
            isLiked ? "text-red-500 fill-current" : "text-gray-400"
          }`}
        />
      </button>
    </div>
  );
};

export default ProductCard;
