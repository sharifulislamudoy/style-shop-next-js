'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ShoppingCart,
    User,
    Search,
    Sun,
    Moon,
    Menu,
    X
} from 'lucide-react';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [theme, setTheme] = useState('light');
    const [isLoggedIn, setIsLoggedIn] = useState(false); // Authentication state
    const pathname = usePathname();

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme') ||
            (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
        setTheme(savedTheme);
        document.documentElement.classList.toggle('dark', savedTheme === 'dark');
        
        // Check if user is authenticated (you'll need to implement your actual auth check)
        const checkAuthStatus = () => {
            // This is a placeholder - replace with your actual authentication logic
            const token = localStorage.getItem('authToken');
            setIsLoggedIn(!!token);
        };
        
        checkAuthStatus();
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
        document.documentElement.classList.toggle('dark', newTheme === 'dark');
    };

    const routes = [
        { name: 'Home', path: '/' },
        { name: 'Products', path: '/products' },
        { name: 'New Arrivals', path: '/new' },
        { name: 'Sale', path: '/sale' },
        { name: 'Contact', path: '/contact' },
    ];

    const toggleMenu = () => setIsOpen(!isOpen);

    return (
        <nav className="sticky top-0 z-50 bg-white dark:bg-black shadow-md transition-colors duration-300">
            <div className="w-11/12 mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link href="/" className="flex-shrink-0">
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            className="text-2xl font-bold text-indigo-600 dark:text-indigo-400"
                        >
                            StyleShop
                        </motion.div>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-4">
                            {routes.map((route) => (
                                <Link
                                    key={route.name}
                                    href={route.path}
                                    className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${pathname === route.path
                                            ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-100 dark:bg-indigo-950/30'
                                            : 'text-gray-700 dark:text-gray-300 hover:text-indigo-500 dark:hover:text-indigo-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                                        }`}
                                >
                                    {route.name}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Right side icons */}
                    <div className="flex items-center space-x-4">
                        {/* Show search and theme toggle for all users */}
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            className="p-2 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                            aria-label="Search"
                        >
                            <Search size={20} />
                        </motion.button>

                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={toggleTheme}
                            className="p-2 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                            aria-label="Toggle theme"
                        >
                            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
                        </motion.button>

                        {/* Show cart and user account only if logged in */}
                        {isLoggedIn ? (
                            <>
                                <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="p-2 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 relative"
                                    aria-label="Shopping cart"
                                >
                                    <ShoppingCart size={20} />
                                    <span className="absolute -top-1 -right-1 bg-indigo-600 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                                        3
                                    </span>
                                </motion.button>

                                <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="p-2 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                                    aria-label="User account"
                                >
                                    <User size={20} />
                                </motion.button>
                            </>
                        ) : (
                            // Show login/register buttons if not logged in
                            <div className="hidden md:flex items-center space-x-2">
                                <Link href="/login">
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="px-4 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                                    >
                                        Login
                                    </motion.button>
                                </Link>
                                <Link href="/register">
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="px-4 py-2 rounded-md text-sm font-medium bg-indigo-600 text-white hover:bg-indigo-700"
                                    >
                                        Register
                                    </motion.button>
                                </Link>
                            </div>
                        )}

                        {/* Mobile menu button */}
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={toggleMenu}
                            className="md:hidden p-2 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                            aria-label="Toggle menu"
                        >
                            {isOpen ? <X size={20} /> : <Menu size={20} />}
                        </motion.button>
                    </div>
                </div>
            </div>

            {/* Mobile Navigation */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="md:hidden bg-white dark:bg-gray-950 shadow-lg"
                    >
                        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                            {routes.map((route) => (
                                <Link
                                    key={route.name}
                                    href={route.path}
                                    onClick={() => setIsOpen(false)}
                                    className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${pathname === route.path
                                            ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-100 dark:bg-indigo-950/30'
                                            : 'text-gray-700 dark:text-gray-300 hover:text-indigo-500 dark:hover:text-indigo-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                                        }`}
                                >
                                    {route.name}
                                </Link>
                            ))}
                            
                            {/* Mobile login/register buttons for non-authenticated users */}
                            {!isLoggedIn && (
                                <div className="pt-4 pb-2 border-t border-gray-200 dark:border-gray-700">
                                    <Link 
                                        href="/login" 
                                        onClick={() => setIsOpen(false)}
                                        className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-indigo-500 dark:hover:text-indigo-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                                    >
                                        Login
                                    </Link>
                                    <Link 
                                        href="/register" 
                                        onClick={() => setIsOpen(false)}
                                        className="block px-3 py-2 rounded-md text-base font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                                    >
                                        Register
                                    </Link>
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;