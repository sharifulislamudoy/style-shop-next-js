'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Menu,
    X,
    User,
} from 'lucide-react';
import { signOut, useSession } from "next-auth/react";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const [theme, setTheme] = useState('light');
    const pathname = usePathname();
    const { data: session, status } = useSession();
    const isLoggedIn = status === "authenticated";

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme') ||
            (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
        setTheme(savedTheme);
        document.documentElement.classList.toggle('dark', savedTheme === 'dark');
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

                        {/* User section */}
                        {isLoggedIn ? (
                            <div className="relative">
                                <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                                    className="p-2 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                                    aria-label="User menu"
                                >
                                    <User size={20} />
                                </motion.button>

                                {/* User dropdown menu */}
                                <AnimatePresence>
                                    {userMenuOpen && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            transition={{ duration: 0.2 }}
                                            className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-50"
                                        >
                                            <Link
                                                href="/dashboard/add-product"
                                                className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                                                onClick={() => setUserMenuOpen(false)}
                                            >
                                                Add Product
                                            </Link>
                                            <button
                                                onClick={() => {
                                                    setUserMenuOpen(false);
                                                    signOut({ callbackUrl: "/" });
                                                }}
                                                className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                                            >
                                                Sign Out
                                            </button>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ) : (
                            // Show Join Us button if not logged in
                            <Link href="/register">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="px-4 py-2 rounded-md text-sm font-medium bg-indigo-600 text-white hover:bg-indigo-700"
                                >
                                    Join Us
                                </motion.button>
                            </Link>
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
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav >
    );
};

export default Navbar;