// Navigation.jsx
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";
import { logout } from "../../services/authService";
import { useToast } from "../toast/ToastContext";
import LogoutAlert from "./LogoutAlert";

const Navigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showLogoutAlert, setShowLogoutAlert] = useState(false);
  const { currentUser } = useAuth();
  const { cartItems } = useCart();
  const { showSuccess, showError } = useToast();
  const navigate = useNavigate();

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Shop", path: "/products" },
    { name: "Cart", path: "/cart", badge: cartItems.length },
  ];

  const handleLogoutClick = () => {
    setShowLogoutAlert(true);
  };

  const handleLogoutConfirm = async () => {
    try {
      await logout();
      setShowLogoutAlert(false);
      setIsMobileMenuOpen(false);
      showSuccess("Successfully logged out");
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
      showError("Failed to logout. Please try again.");
      setShowLogoutAlert(false);
    }
  };

  const handleLogoutCancel = () => {
    setShowLogoutAlert(false);
  };

  return (
    <>
      <nav className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <Link
                to="/"
                className="text-2xl font-bold text-gray-900 hover:text-gray-700 transition-colors"
              >
                Shopsmart
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-center space-x-8">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className="relative px-3 py-2 rounded-md text-sm font-medium transition-colors hover:text-gray-900 hover:bg-gray-50"
                  >
                    {item.name}
                    {item.badge > 0 && (
                      <span className="absolute -top-2 -right-2 bg-gray-900 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                ))}
              </div>
            </div>

            {/* User Section */}
            <div className="hidden md:flex items-center space-x-4">
              {currentUser ? (
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-700">
                    Welcome, {currentUser.email}
                  </span>
                  <button
                    onClick={handleLogoutClick}
                    className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Link
                    to="/login"
                    className="text-sm text-gray-700 hover:text-gray-900"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="bg-gray-900 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-800 transition-colors"
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-50"
              >
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t border-gray-100">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex justify-between items-center w-full px-3 py-2 rounded-md text-base font-medium hover:text-gray-900 hover:bg-gray-50"
                >
                  {item.name}
                  {item.badge > 0 && (
                    <span className="bg-gray-900 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
                      {item.badge}
                    </span>
                  )}
                </Link>
              ))}
              {currentUser ? (
                <div className="px-3 py-2 border-t border-gray-100 cursor-pointer">
                  <p className="text-sm text-gray-700 mb-2">
                    Welcome, {currentUser.email}
                  </p>
                  <button
                    onClick={handleLogoutClick}
                    className="text-sm text-gray-500 hover:text-gray-700 transition-colors cursor-pointer"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="px-3 py-2 border-t border-gray-100 space-y-2">
                  <Link
                    to="/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block w-full text-left text-sm text-gray-700 hover:text-gray-900 py-1"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block w-full bg-gray-900 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-800"
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* Logout Alert Modal */}
      <LogoutAlert
        isOpen={showLogoutAlert}
        onConfirm={handleLogoutConfirm}
        onCancel={handleLogoutCancel}
      />
    </>
  );
};

export default Navigation;
