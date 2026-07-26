import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/axios";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Get Current Logged-in User
    const fetchCurrentUser = async () => {
        try {
            const response = await api.get("/auth/me/");
            setUser(response.data);
        } catch (error) {
            setUser(null);
            console.error("Fetch User Error:", error.response?.data || error.message);
        } finally {
            setLoading(false);
        }
    };

    // Register
    const register = async (data) => {
        const response = await api.post("/auth/register/", data);
        return response.data;
    };

    // Login
    const login = async (data) => {
        await api.post("/auth/login/", data);
        await fetchCurrentUser();
    };

    // Logout
    const logout = async () => {
        try {
            await api.post("/auth/logout/");
        } finally {
            setUser(null);
        }
    };

    useEffect(() => {
        fetchCurrentUser();
    }, []);

    const value = {
        user,
        loading,
        register,
        login,
        logout,
        fetchCurrentUser,
        setUser,
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useAuth must be used inside AuthProvider");
    }

    return context;
};