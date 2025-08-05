import React from "react";
import { useNavigate } from "react-router-dom";
import AuthForm from "../components/AuthForm";

const API_URL = import.meta.env.VITE_API_URL;

const Register = () => {
    const navigate = useNavigate();

    const handleRegister = async ({ name, email, password }) => {
        try {
            const res = await fetch(`${API_URL}/auth/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, password }),
            });

            const data = await res.json();

            if (res.ok) {
                alert("Registered successfully!");
                navigate("/login");
            } else {
                alert(data.message || "Registration failed");
            }
        } catch (error) {
            alert("Something went wrong: " + error.message);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#6528F7] to-[#AD49E1] flex items-center justify-center px-4">
            <AuthForm type="register" onSubmit={handleRegister} />
        </div>
    );
};

export default Register;
