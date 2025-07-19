import React, { createContext, useContext, useState } from "react";

// Toast Context
const ToastContext = createContext();

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};

// Toast Component
const Toast = ({ toast, onRemove }) => {
  const getToastStyles = () => {
    const baseStyles = "transform transition-all duration-300 ease-in-out";
    const visibleStyles = "translate-x-0 opacity-100";
    const hiddenStyles = "translate-x-full opacity-0";

    return `${baseStyles} ${toast.isVisible ? visibleStyles : hiddenStyles}`;
  };

  const getIconAndColors = () => {
    switch (toast.type) {
      case "success":
        return {
          icon: (
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          ),
          bgColor: "bg-emerald-50",
          borderColor: "border-emerald-200",
          iconColor: "text-emerald-600",
          textColor: "text-emerald-800",
        };
      case "error":
        return {
          icon: (
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            </svg>
          ),
          bgColor: "bg-red-50",
          borderColor: "border-red-200",
          iconColor: "text-red-600",
          textColor: "text-red-800",
        };
      case "warning":
        return {
          icon: (
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
          ),
          bgColor: "bg-amber-50",
          borderColor: "border-amber-200",
          iconColor: "text-amber-600",
          textColor: "text-amber-800",
        };
      default:
        return {
          icon: null,
          bgColor: "bg-gray-50",
          borderColor: "border-gray-200",
          iconColor: "text-gray-600",
          textColor: "text-gray-800",
        };
    }
  };

  const { icon, bgColor, borderColor, iconColor, textColor } =
    getIconAndColors();

  return (
    <div className={getToastStyles()}>
      <div
        className={`min-w-80 max-w-md w-full ${bgColor} border ${borderColor} rounded-xl shadow-lg backdrop-blur-sm`}
      >
        <div className="p-5">
          <div className="flex items-start gap-4">
            <div className={`flex-shrink-0 ${iconColor} mt-0.5`}>{icon}</div>
            <div className="flex-1 min-w-0">
              <p
                className={`text-base font-medium leading-relaxed ${textColor}`}
              >
                {toast.message}
              </p>
            </div>
            <div className="flex-shrink-0">
              <button
                className={`p-1 rounded-lg inline-flex ${textColor} hover:bg-black hover:bg-opacity-10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-gray-400 transition-all duration-200`}
                onClick={() => onRemove(toast.id)}
              >
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Toast Container
const ToastContainer = ({ toasts, removeToast }) => {
  return (
    <div className="fixed top-6 right-6 z-50 space-y-4">
      {toasts.map((toast) => (
        <Toast key={toast.id} toast={toast} onRemove={removeToast} />
      ))}
    </div>
  );
};

// Toast Provider
export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = (message, type = "success", duration = 4000) => {
    const id = Date.now() + Math.random();
    const newToast = { id, message, type, isVisible: false };

    setToasts((prev) => [...prev, newToast]);

    // Trigger animation
    setTimeout(() => {
      setToasts((prev) =>
        prev.map((toast) =>
          toast.id === id ? { ...toast, isVisible: true } : toast
        )
      );
    }, 50);

    // Auto remove
    setTimeout(() => {
      removeToast(id);
    }, duration);
  };

  const removeToast = (id) => {
    setToasts((prev) =>
      prev.map((toast) =>
        toast.id === id ? { ...toast, isVisible: false } : toast
      )
    );

    // Remove from array after animation
    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 300);
  };

  const showSuccess = (message, duration) =>
    addToast(message, "success", duration);
  const showError = (message, duration) => addToast(message, "error", duration);
  const showWarning = (message, duration) =>
    addToast(message, "warning", duration);

  return (
    <ToastContext.Provider
      value={{ showSuccess, showError, showWarning, addToast }}
    >
      {children}
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </ToastContext.Provider>
  );
};

// Demo Component
const Demo = () => {
  const { showSuccess, showError, showWarning } = useToast();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="space-y-4">
        <h1 className="text-3xl font-bold text-gray-900 text-center mb-12">
          Custom Toast Demo
        </h1>
        <div className="space-y-4">
          <button
            onClick={() =>
              showSuccess(
                "Account created successfully! Welcome to our platform."
              )
            }
            className="w-full px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors font-medium"
          >
            Show Success Toast
          </button>
          <button
            onClick={() =>
              showError(
                "Failed to create account. Please check your information and try again."
              )
            }
            className="w-full px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
          >
            Show Error Toast
          </button>
          <button
            onClick={() =>
              showWarning(
                "Please check your password strength before continuing."
              )
            }
            className="w-full px-6 py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors font-medium"
          >
            Show Warning Toast
          </button>
        </div>
      </div>
    </div>
  );
};

// Main App
const App = () => {
  return (
    <ToastProvider>
      <Demo />
    </ToastProvider>
  );
};

export default App;
