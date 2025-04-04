import React, { useState } from 'react';
import Layout from '../components/Layout';
import { Toaster, toast } from 'react-hot-toast';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate form submission (replace with actual API call)
    toast.success('Your message has been sent!');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Contact Us</h1>

          {/* Contact Form */}
          <div className="bg-white p-8 rounded-lg shadow-md">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Field */}
              <div>
                <label htmlFor="name" className="block text-lg font-medium text-gray-700 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                />
              </div>

              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-lg font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                />
              </div>

              {/* Message Field */}
              <div>
                <label htmlFor="message" className="block text-lg font-medium text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  placeholder="Enter your message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                ></textarea>
              </div>

              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-teal-600 to-blue-600 text-white font-semibold py-3 rounded-lg hover:from-teal-700 hover:to-blue-700 transition-all shadow-lg"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>

          {/* Additional Contact Information */}
          <div className="mt-12 text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Other Ways to Reach Us</h2>
            <div className="space-y-4">
              <p className="text-gray-600">
                <strong>Email:</strong>{' '}
                <a href="mailto:support@enotes.com" className="text-teal-600 hover:text-teal-700">
                  support@enotes.com
                </a>
              </p>
              <p className="text-gray-600">
                <strong>Phone:</strong>{' '}
                <a href="tel:+1234567890" className="text-teal-600 hover:text-teal-700">
                  +1 (234) 567-890
                </a>
              </p>
              <p className="text-gray-600">
                <strong>Address:</strong> 123 E-Notes Street, Tech City, TC 12345
              </p>
            </div>
          </div>
        </div>
      </div>
      <Toaster position="top-right" />
    </Layout>
  );
};

export default Contact;