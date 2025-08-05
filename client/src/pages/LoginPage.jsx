import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import AuthForm from "../components/AuthForm";

const API_URL = import.meta.env.VITE_API_URL;

const Login = () => {
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleLogin = async ({ email, password }) => {
        try {
            const res = await fetch(`${API_URL}/auth/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();

            if (res.ok) {
                localStorage.setItem("token", data.token);
                login(data.user); // Store user data globally
                alert("Login successful!");
                navigate("/");
            } else {
                alert(data.message || "Login failed");
            }
        } catch (error) {
            alert("Something went wrong: " + error.message);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#6528F7] to-[#AD49E1] flex items-center justify-center px-4">
            <AuthForm type="login" onSubmit={handleLogin} />
        </div>
    );
};

export default Login;
