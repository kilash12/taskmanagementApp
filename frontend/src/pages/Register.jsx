import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Register() {
    const navigate = useNavigate();
    const { register } = useAuth();

    const [formData, setFormData] = useState({
        full_name: "",
        email: "",
        password: "",
        confirm_password: "",
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));

        if (error) setError("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");
        setSuccess("");

        if (formData.password !== formData.confirm_password) {
            setError("Passwords do not match.");
            return;
        }

        try {
            setLoading(true);

            await register(formData);

            setSuccess("Registration successful. Please login.");

            setTimeout(() => {
                navigate("/");
            }, 1500);

        } catch (err) {

            console.error("Register Error:", err.response?.data);

            const data = err.response?.data;

            if (typeof data === "string") {
                setError(data);
            } else if (data?.error) {
                setError(data.error);
            } else if (data?.message) {
                setError(data.message);
            } else if (data) {
                // DRF field-level errors
                const firstError = Object.values(data)
                    .flat()
                    .join(" ");
                setError(firstError);
            } else {
                setError("Registration failed. Please try again.");
            }

        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
            <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-xl">

                <h1 className="text-center text-3xl font-bold text-blue-600">
                    Register
                </h1>

                <p className="mt-2 text-center text-gray-500">
                    Create your account
                </p>

                {error && (
                    <div className="mt-5 rounded-lg bg-red-100 p-3 text-red-600">
                        {error}
                    </div>
                )}

                {success && (
                    <div className="mt-5 rounded-lg bg-green-100 p-3 text-green-700">
                        {success}
                    </div>
                )}

                <form
                    onSubmit={handleSubmit}
                    className="mt-6 space-y-5"
                >
                    <div>
                        <label className="mb-2 block font-medium">
                            Full Name
                        </label>

                        <input
                            type="text"
                            name="full_name"
                            value={formData.full_name}
                            onChange={handleChange}
                            required
                            className="w-full rounded-lg border px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="mb-2 block font-medium">
                            Email
                        </label>

                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            autoComplete="email"
                            className="w-full rounded-lg border px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="mb-2 block font-medium">
                            Password
                        </label>

                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            autoComplete="new-password"
                            className="w-full rounded-lg border px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="mb-2 block font-medium">
                            Confirm Password
                        </label>

                        <input
                            type="password"
                            name="confirm_password"
                            value={formData.confirm_password}
                            onChange={handleChange}
                            required
                            autoComplete="new-password"
                            className="w-full rounded-lg border px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {loading ? "Creating Account..." : "Register"}
                    </button>
                </form>

                <p className="mt-6 text-center">
                    Already have an account?{" "}
                    <Link
                        to="/"
                        className="font-semibold text-blue-600 hover:underline"
                    >
                        Login
                    </Link>
                </p>

            </div>
        </div>
    );
}

export default Register;