import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
    const { user, logout } = useAuth();

    return (
        <nav className="bg-white shadow-md">
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                {/* Logo */}
                <Link
                    to="/dashboard"
                    className="text-2xl font-bold text-blue-600"
                >
                    Task Manager
                </Link>

                {/* Navigation */}
                <div className="flex items-center gap-6">

                    <Link
                        to="/dashboard"
                        className="text-gray-700 hover:text-blue-600 font-medium"
                    >
                        Dashboard
                    </Link>

                    <Link
                        to="/create-task"
                        className="text-gray-700 hover:text-blue-600 font-medium"
                    >
                        Create Task
                    </Link>

                    <span className="font-semibold text-gray-700">
                        {user?.full_name}
                    </span>

                    <button
                        onClick={logout}
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
                    >
                        Logout
                    </button>

                </div>
            </div>
        </nav>
    );
}

export default Navbar;