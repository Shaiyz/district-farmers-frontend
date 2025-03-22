import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-indigo-700 animate-gradient"></div>

      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm z-10">
        <h2 className="text-2xl font-bold text-center mb-4">404 - Page Not Found</h2>

        <p className="text-gray-600 text-center mb-6">
          Oops! The page you're looking for doesn't exist.
        </p>

        <div className="text-center">
          <Link
            to="/"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700"
          >
            Go to Home
          </Link>
        </div>
      </div>
    </div>
  );
}