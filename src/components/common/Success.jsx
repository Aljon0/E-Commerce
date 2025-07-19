import { CheckCircle2Icon } from "lucide-react";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const Success = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const userId = searchParams.get("user_id");

  useEffect(() => {
    // Auto redirect to home after 5 seconds
    const timer = setTimeout(() => {
      navigate("/");
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center">
        <div className="mx-auto flex items-center justify-center h-24 w-24 rounded-full bg-green-100 mb-8">
          <CheckCircle2Icon className="h-16 w-16 text-green-600" />
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Payment Successful!
        </h1>

        <p className="text-lg text-gray-600 mb-2">
          Thank you for your purchase. Your order has been confirmed.
        </p>

        <div className="bg-gray-50 rounded-lg p-4 mb-8 max-w-md mx-auto">
          <p className="text-sm text-gray-500 mb-2">
            <strong>Session ID:</strong> {sessionId}
          </p>
          <p className="text-sm text-gray-500">
            <strong>User ID:</strong> {userId}
          </p>
          <p className="text-xs text-gray-400 mt-2">
            * This is a demo transaction - no real payment was processed
          </p>
        </div>

        <div className="space-x-4">
          <button
            onClick={() => navigate("/")}
            className="bg-gray-900 text-white px-6 py-3 rounded-md hover:bg-gray-800 transition-colors"
          >
            Continue Shopping
          </button>

          <button
            onClick={() => navigate("/orders")} // if you have an orders page
            className="bg-white text-gray-900 px-6 py-3 rounded-md border border-gray-300 hover:bg-gray-50 transition-colors"
          >
            View Orders
          </button>
        </div>

        <p className="text-sm text-gray-500 mt-8">
          Redirecting to home page in 5 seconds...
        </p>
      </div>
    </div>
  );
};

export default Success;
