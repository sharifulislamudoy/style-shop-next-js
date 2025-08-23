'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Clock, Send, ArrowRight } from 'lucide-react';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Form submission logic would go here
    console.log('Form submitted:', formData);
    // Reset form
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
  };

  const contactInfo = [
    {
      icon: <Mail className="h-6 w-6" />,
      title: 'Email Us',
      content: 'support@styleshop.com',
      description: 'Send us an email anytime'
    },
    {
      icon: <Phone className="h-6 w-6" />,
      title: 'Call Us',
      content: '+1 (555) 123-4567',
      description: 'Mon-Fri from 8am to 6pm'
    },
    {
      icon: <MapPin className="h-6 w-6" />,
      title: 'Visit Us',
      content: '123 Fashion Street, Trend District',
      description: 'New York, NY 10001'
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: 'Store Hours',
      content: 'Mon-Sat: 9AM - 8PM',
      description: 'Sunday: 10AM - 6PM'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300 pt-20">
      <div className="w-11/12 mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Get in Touch</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Have questions about our products or need assistance? We'd love to hear from you. 
            Send us a message and we'll respond as soon as possible.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Contact Information</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-8">
              We're here to help you with any questions about our products, shipping, returns, or anything else.
            </p>

            <div className="space-y-6">
              {contactInfo.map((item, index) => (
                <motion.div 
                  key={index}
                  whileHover={{ x: 5 }}
                  className="flex items-start gap-4"
                >
                  <div className="p-3 bg-indigo-100 dark:bg-indigo-900/30 rounded-full text-indigo-600 dark:text-indigo-400">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">{item.title}</h3>
                    <p className="text-gray-900 dark:text-white mt-1">{item.content}</p>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mt-1">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Social Media Links */}
            <div className="mt-12">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                {['Facebook', 'Instagram', 'Twitter', 'Pinterest'].map((social, index) => (
                  <motion.a
                    key={index}
                    href="#"
                    whileHover={{ scale: 1.1, y: -2 }}
                    className="p-3 bg-white dark:bg-gray-800 rounded-lg shadow-sm text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200"
                  >
                    {social}
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 md:p-8"
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Send us a Message</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white transition-colors duration-200"
                    placeholder="John Doe"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white transition-colors duration-200"
                    placeholder="john@example.com"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white transition-colors duration-200"
                  placeholder="How can we help?"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white transition-colors duration-200"
                  placeholder="Tell us more about your inquiry..."
                />
              </div>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md font-medium flex items-center justify-center gap-2 transition-colors duration-200"
              >
                Send Message
                <Send size={18} />
              </motion.button>
            </form>
          </motion.div>
        </div>

        {/* FAQ Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-24"
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-12">Frequently Asked Questions</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                question: "How long does shipping take?",
                answer: "Standard shipping takes 3-5 business days. Express shipping is available for delivery within 1-2 business days."
              },
              {
                question: "What is your return policy?",
                answer: "We offer a 30-day return policy for unused items in original packaging with receipt."
              },
              {
                question: "Do you ship internationally?",
                answer: "Yes, we ship to over 50 countries worldwide. International shipping fees apply."
              },
              {
                question: "How can I track my order?",
                answer: "Once your order ships, you'll receive a tracking number via email to monitor your delivery."
              }
            ].map((faq, index) => (
              <motion.div 
                key={index}
                whileHover={{ y: -5 }}
                className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm transition-colors duration-200"
              >
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">{faq.question}</h3>
                <p className="text-gray-600 dark:text-gray-300">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <motion.a
              href="#"
              whileHover={{ scale: 1.05 }}
              className="inline-flex items-center text-indigo-600 dark:text-indigo-400 font-medium hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors duration-200"
            >
              View all FAQs
              <ArrowRight size={16} className="ml-1" />
            </motion.a>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ContactPage;