import { Link } from "react-router-dom";

function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="text-center">

                <h1 className="text-8xl font-bold text-blue-600">
                    404
                </h1>

                <h2 className="mt-4 text-3xl font-semibold">
                    Page Not Found
                </h2>

                <p className="mt-3 text-gray-600">
                    The page you're looking for doesn't exist.
                </p>

                <Link
                    to="/dashboard"
                    className="inline-block mt-8 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition"
                >
                    Back to Dashboard
                </Link>

            </div>
        </div>
    );
}

export default NotFound;