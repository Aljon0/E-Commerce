import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchProducts } from "../../services/api";
import LoadingSpinner from "../common/LoadingSpinner";

const HomePage = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const products = await fetchProducts();
        setFeaturedProducts(products.slice(0, 3));
        setLoading(false);
      } catch (error) {
        console.error("Error loading products:", error);
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative bg-gray-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
              <span className="block">Shopsmart</span>
              <span className="block text-gray-600">Mini Store</span>
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              Discover carefully curated products that combine functionality
              with beautiful, clean design.
            </p>
            <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
              <div className="rounded-md shadow">
                <button
                  onClick={() => navigate("/products")}
                  className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium cursor-pointer rounded-md text-white bg-gray-900 hover:bg-gray-800 md:py-4 md:text-lg md:px-10 transition-colors"
                >
                  Shop Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Products */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">
            Featured Products
          </h2>
          <p className="mt-4 text-lg text-gray-500">
            Handpicked items that embody our minimalist philosophy
          </p>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:gap-x-8">
          {featuredProducts.map((product) => (
            <div
              key={product.id}
              className="group cursor-pointer"
              onClick={() => navigate(`/product/${product.id}`)}
            >
              <div className="w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden group-hover:opacity-75 transition-opacity">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-64 object-center object-cover"
                />
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900">
                {product.title}
              </h3>
              <p className="mt-2 text-lg font-medium text-gray-900">
                ${product.price}
              </p>
            </div>
          ))}
        </div>
        <div className="mt-12 text-center">
          <button
            onClick={() => navigate("/products")}
            className="inline-flex items-center px-6 py-3 border border-gray-300 cursor-pointer text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors"
          >
            View All Products
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
