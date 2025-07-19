import { Minus, Plus, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";
import LoadingSpinner from "../common/LoadingSpinner";

const ShoppingCart = () => {
  const navigate = useNavigate();
  const { cartItems, updateCartItem, removeFromCart } = useCart();
  const { currentUser, loading: authLoading } = useAuth();

  if (authLoading) return <LoadingSpinner />;

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  if (cartItems.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>
        <div className="text-center py-12">
          <div className="mx-auto h-12 w-12 text-gray-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          </div>
          <h3 className="mt-2 text-lg font-medium text-gray-900">
            Your cart is empty
          </h3>
          <p className="mt-1 text-gray-500">
            Start shopping to add items to your cart.
          </p>
          <div className="mt-6">
            <button
              onClick={() => navigate("/products")}
              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium cursor-pointer rounded-md text-white bg-gray-900 hover:bg-gray-800 transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

      <div className="lg:grid lg:grid-cols-12 lg:gap-x-12">
        <div className="lg:col-span-7">
          <ul className="border-b border-gray-200 divide-y divide-gray-200">
            {cartItems.map((item, index) => (
              <li key={`${item.id}-${index}`} className="py-6 flex">
                <div className="flex-shrink-0">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-24 h-24 rounded-md object-center object-cover sm:w-32 sm:h-32"
                  />
                </div>

                <div className="ml-4 flex-1 flex flex-col justify-between sm:ml-6">
                  <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                    <div>
                      <div className="flex justify-between">
                        <h3 className="text-lg font-medium text-gray-900">
                          {item.title}
                        </h3>
                      </div>
                      <p className="mt-1 text-sm text-gray-500 capitalize">
                        {item.category}
                      </p>
                      <p className="mt-1 text-lg font-medium text-gray-900">
                        ${item.price}
                      </p>
                    </div>

                    <div className="mt-4 sm:mt-0 sm:pr-9">
                      <div className="flex items-center border border-gray-300 rounded-md">
                        <button
                          onClick={() =>
                            updateCartItem(
                              index,
                              Math.max(1, item.quantity - 1)
                            )
                          }
                          className="p-2 text-gray-600 hover:text-gray-900"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="px-4 py-2 text-gray-900 font-medium">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateCartItem(index, item.quantity + 1)
                          }
                          className="p-2 text-gray-600 hover:text-gray-900"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>

                      <div className="absolute top-0 right-0">
                        <button
                          onClick={() => removeFromCart(index)}
                          className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  </div>

                  <p className="mt-4 flex text-sm text-gray-700">
                    Subtotal: ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Order Summary */}
        <div className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:p-8 lg:mt-0 lg:col-span-5">
          <h2 className="text-lg font-medium text-gray-900">Order Summary</h2>

          <dl className="mt-6 space-y-4">
            <div className="flex items-center justify-between">
              <dt className="text-sm text-gray-600">Subtotal</dt>
              <dd className="text-sm font-medium text-gray-900">
                ${subtotal.toFixed(2)}
              </dd>
            </div>
            <div className="flex items-center justify-between border-t border-gray-200 pt-4">
              <dt className="text-sm text-gray-600">Tax</dt>
              <dd className="text-sm font-medium text-gray-900">
                ${tax.toFixed(2)}
              </dd>
            </div>
            <div className="flex items-center justify-between border-t border-gray-200 pt-4">
              <dt className="text-base font-medium text-gray-900">
                Order total
              </dt>
              <dd className="text-base font-medium text-gray-900">
                ${total.toFixed(2)}
              </dd>
            </div>
          </dl>

          <div className="mt-6">
            <button
              onClick={() =>
                currentUser ? navigate("/checkout") : navigate("/login")
              }
              className="w-full bg-gray-900 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
            >
              Proceed to Checkout
            </button>
          </div>

          <div className="mt-6 text-center">
            <button
              onClick={() => navigate("/products")}
              className="text-sm font-medium text-gray-600 hover:text-gray-900"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
