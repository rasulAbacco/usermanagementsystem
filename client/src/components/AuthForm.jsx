// components/AuthForm.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";

const glass = "bg-white/10 backdrop-blur-md border border-white/30 shadow-lg";

const AuthForm = ({ type = "login", onSubmit }) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        rememberMe: false,
    });

    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleChange = (e) => {
        const { name, type, value, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (type === "register" && formData.password !== formData.confirmPassword) {
            return setError("Passwords do not match");
        }
        setError("");
        onSubmit(formData);
    };

    const handleGoogleLogin = () => {
        alert("Google login integration coming soon.");
        // You can integrate react-oauth/google or Firebase here.
    };

    return (
        <motion.div
            className={`w-full max-w-md mx-auto mt-20 p-8 rounded-2xl ${glass}`}
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
        >
            <h2 className="text-2xl font-bold text-white text-center mb-6 capitalize">
                {type === "login" ? "Login to your account" : "Create an account"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
                {type === "register" && (
                    <input
                        type="text"
                        name="name"
                        placeholder="Full Name"
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg bg-white/20 text-white placeholder-white focus:outline-none"
                        required
                    />
                )}

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-white/20 text-white placeholder-white focus:outline-none"
                    required
                />

                {/* Password */}
                <div className="relative">
                    <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder="Password"
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg bg-white/20 text-white placeholder-white focus:outline-none pr-12"
                        required
                    />
                    <div
                        className="absolute right-4 top-3 text-white cursor-pointer"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                    </div>
                </div>

                {/* Confirm Password */}
                {type === "register" && (
                    <div className="relative">
                        <input
                            type={showConfirmPassword ? "text" : "password"}
                            name="confirmPassword"
                            placeholder="Confirm Password"
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-lg bg-white/20 text-white placeholder-white focus:outline-none pr-12"
                            required
                        />
                        <div
                            className="absolute right-4 top-3 text-white cursor-pointer"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                            {showConfirmPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                        </div>
                    </div>
                )}

                {/* Remember Me & Forgot */}
                {type === "login" && (
                    <div className="flex items-center justify-between text-white text-sm">
                        <label className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                name="rememberMe"
                                checked={formData.rememberMe}
                                onChange={handleChange}
                            />
                            <span>Remember me</span>
                        </label>
                        <button
                            type="button"
                            onClick={() => alert("Redirect to forgot password page")}
                            className="underline"
                        >
                            Forgot password?
                        </button>
                    </div>
                )}

                {/* Error */}
                {error && <p className="text-red-300 text-sm">{error}</p>}

                {/* Submit */}
                <button
                    type="submit"
                    className="w-full py-3 rounded-lg bg-purple-600 hover:bg-purple-700 text-white font-semibold transition duration-300"
                >
                    {type === "login" ? "Login" : "Register"}
                </button>
            </form>

            {/* Google Login */}
            <button
                onClick={handleGoogleLogin}
                className="w-full mt-4 flex items-center justify-center gap-3 py-3 rounded-lg bg-white text-black font-medium shadow hover:bg-gray-100 transition"
            >
                <FcGoogle size={20} />
                Continue with Google
            </button>

            {/* Switch */}
            <p className="text-sm text-center text-white mt-4">
                {type === "login" ? (
                    <>
                        Don’t have an account?{" "}
                        <span
                            onClick={() => navigate("/register")}
                            className="underline cursor-pointer"
                        >
                            Register here
                        </span>
                    </>
                ) : (
                    <>
                        Already have an account?{" "}
                        <span
                            onClick={() => navigate("/login")}
                            className="underline cursor-pointer"
                        >
                            Login here
                        </span>
                    </>
                )}
            </p>
        </motion.div>
    );
};

export default AuthForm;
