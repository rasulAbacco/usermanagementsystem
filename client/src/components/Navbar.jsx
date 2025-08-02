import React from 'react';
import { Link } from 'react-router-dom';
// import './Navbar.css'; // optional: for styling
import { ShoppingBag, Search, Menu } from 'lucide-react';
import MenShoes from '../pages/MenShoes';
const Navbar = () => {
    return (
        <header className="relative z-20 flex justify-between items-center p-6">
            <nav className="flex space-x-8">
                <Link to="/" className="text-black font-medium hover:text-orange-400 transition-colors">HOME</Link>
                <Link to="/men" className="text-black font-medium hover:text-orange-400 transition-colors">MEN</Link>
                <Link to="/women" className="text-black font-medium hover:text-orange-400 transition-colors">WOMEN</Link>
                <Link to="/kids" className="text-black font-medium hover:text-orange-400 transition-colors">KIDS</Link>
            </nav>


            <div className="absolute left-1/2 transform -translate-x-1/2">
                <svg className="w-16 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M24 7.8L6.442 15.276c-1.456.616-2.679.925-3.668.925-1.456 0-2.452-.616-2.452-1.848 0-.924.493-1.848 1.947-2.464L24 7.8z" />
                </svg>
            </div>

            <div className="flex items-center space-x-4">
                <Search className="w-6 h-6 text-white hover:text-orange-400 cursor-pointer transition-colors" />
                <ShoppingBag className="w-6 h-6 text-white hover:text-orange-400 cursor-pointer transition-colors" />
                <Menu className="w-6 h-6 text-white hover:text-orange-400 cursor-pointer transition-colors" />
            </div>
        </header>

    );
};

export default Navbar;