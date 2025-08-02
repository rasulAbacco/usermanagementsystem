import React, { useState, useEffect } from 'react';
import { ShoppingBag, Search, Menu, Play, ShoppingCart } from 'lucide-react';
import pngwing from '../assets/pngwing.png';
import Navbar from '../components/Navbar';
const NikeLandingPage = () => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        setIsLoaded(true);

        const handleMouseMove = (e) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    const slideNumbers = ['35', '37', '38', '39'];

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 relative overflow-hidden">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                {[...Array(20)].map((_, i) => (
                    <div
                        key={i}
                        className={`absolute rounded-full border-2 ${i % 3 === 0 ? 'border-orange-500' : i % 3 === 1 ? 'border-purple-400' : 'border-blue-400'
                            } animate-pulse`}
                        style={{
                            width: Math.random() * 40 + 20 + 'px',
                            height: Math.random() * 40 + 20 + 'px',
                            left: Math.random() * 100 + '%',
                            top: Math.random() * 100 + '%',
                            animationDelay: Math.random() * 1 + 's',
                            animationDuration: (Math.random() * 4 + 1) + 's'
                        }}
                    />
                ))}

                {/* Floating triangular shapes */}
                {[...Array(8)].map((_, i) => (
                    <div
                        key={`triangle-${i}`}
                        className="absolute w-0 h-0 animate-bounce"
                        style={{
                            borderLeft: '15px solid transparent',
                            borderRight: '15px solid transparent',
                            borderBottom: i % 2 === 0 ? '25px solid rgba(239, 68, 68, 0.3)' : '25px solid rgba(168, 85, 247, 0.3)',
                            left: Math.random() * 90 + '%',
                            top: Math.random() * 90 + '%',
                            animationDelay: Math.random() * 2 + 's',
                            animationDuration: (Math.random() * 3 + 2) + 's'
                        }}
                    />
                ))}
            </div>

            {/* Grid Pattern Overlay */}
            <div className="absolute inset-0 opacity-10">
                <div className="grid grid-cols-12 grid-rows-12 h-full w-full">
                    {[...Array(144)].map((_, i) => (
                        <div key={i} className="border border-white/20" />
                    ))}
                </div>
            </div>

            {/* Header */}
            <Navbar />
            {/* Main Content */}
            <div className="relative z-10 flex items-center justify-between px-12 py-8 h-[calc(100vh-120px)]">
                {/* Left Content */}
                <div className="flex-1 max-w-lg">
                    <div className="mb-6">
                        <span className="inline-block bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-semibold mb-6">
                            FEATURED
                        </span>
                    </div>

                    <h1 className={`text-8xl font-black mb-4 transform transition-all duration-1000 ${isLoaded ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'
                        }`}>
                        <span className="text-white text-[180px] tracking-widest">NIKE </span>
                        <span className="text-transparent bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text">2025</span>
                    </h1>

                    <h2 className={`text-3xl font-bold text-gray-300 mb-8 transform transition-all duration-1000 delay-300 ${isLoaded ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'
                        }`}>
                        COLLECTIONS
                    </h2>

                    <div className={`flex space-x-4 transform transition-all duration-1000 delay-500 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
                        }`}>
                        <button className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold flex items-center space-x-2 transition-all duration-300 transform hover:scale-105">
                            <span>Shop Now</span>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>

                        <button className="border border-white text-white hover:bg-white hover:text-purple-900 px-8 py-3 rounded-lg font-semibold flex items-center space-x-2 transition-all duration-300 transform hover:scale-105">
                            <ShoppingCart className="w-4 h-4" />
                            <span>Add to Bag</span>
                        </button>
                    </div>
                </div>

                {/* Center Shoe Display */}
                <div className="flex-1 flex justify-center items-center relative">
                    <div className={`relative transform transition-all duration-1000 ${isLoaded ? 'scale-100 rotate-0' : 'scale-0 rotate-45'
                        }`}>
                        {/* Circular Platform */}
                        <div className="absolute inset-0 w-96 h-96 rounded-full border border-white/20 animate-spin-slow" />
                        <div className="absolute inset-4 w-88 h-88 rounded-full border border-purple-400/30" />

                        {/* Shoe Container */}
                        <div className="relative w-96 h-96 flex items-center justify-center">
                            <div
                                className="relative transform hover:scale-110 transition-transform duration-500 cursor-pointer"
                                style={{
                                    filter: 'drop-shadow(0 0 30px rgba(147, 51, 234, 0.5))'
                                }}
                            >
                                {/* Shoe Body */}

                                <div className="w-80 h-40 relative shoes-box">

                                    <img src={pngwing} className='w-[100vh]' alt="Descriptive text" />
                                </div>

                                {/* Glow Effect */}
                                <div className="absolute inset-0 bg-gradient-to-r from-purple-400/20 to-blue-400/20 rounded-full blur-xl animate-pulse" />
                            </div>
                        </div>

                        {/* Floating UI Elements */}
                        <div className="absolute -top-8 -right-8 bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20">
                            <div className="text-white text-sm font-semibold">Get upto 30% off</div>
                            <div className="text-gray-300 text-xs">on your first purchase</div>
                        </div>
                    </div>
                </div>

                {/* Right Side - Size Selection */}
                <div className="flex-1 flex flex-col items-end">
                    <div className={`mb-8 transform transition-all duration-1000 delay-700 ${isLoaded ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
                        }`}>
                        <div className="text-right mb-4">
                            <div className="text-6xl font-black text-white/20">01</div>
                        </div>

                        {/* Size Selector */}
                        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                            <div className="text-white text-sm font-semibold mb-3">Size</div>
                            <div className="flex space-x-2">
                                {slideNumbers.map((size, index) => (
                                    <button
                                        key={size}
                                        onClick={() => setCurrentSlide(index)}
                                        className={`w-12 h-12 rounded-lg font-semibold transition-all duration-300 ${currentSlide === index
                                            ? 'bg-blue-500 text-white shadow-lg'
                                            : 'bg-white/10 text-gray-300 hover:bg-white/20'
                                            }`}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Navigation Dots */}
                    <div className="flex flex-col space-y-3">
                        {[0, 1, 2, 3].map((dot) => (
                            <button
                                key={dot}
                                className={`w-3 h-3 rounded-full transition-all duration-300 ${dot === 0 ? 'bg-white' : 'bg-white/30 hover:bg-white/50'
                                    }`}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* Bottom Progress Indicator */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex items-center space-x-4">
                <Play className="w-6 h-6 text-white" />
                <div className="w-64 h-1 bg-white/20 rounded-full overflow-hidden">
                    <div className="w-1/4 h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" />
                </div>
            </div>

            {/* Cursor Follower */}
            <div
                className="fixed w-4 h-4 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full pointer-events-none z-50 mix-blend-difference transition-transform duration-100"
                style={{
                    left: mousePosition.x - 8,
                    top: mousePosition.y - 8,
                    transform: 'scale(1)',
                }}
            />
        </div>
    );
};

export default NikeLandingPage;