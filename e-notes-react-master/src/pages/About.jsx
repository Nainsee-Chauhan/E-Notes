import React from 'react';
import Layout from '../components/Layout';
import { NavLink } from 'react-router-dom';

const About = () => {
  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Page Heading */}
          <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">About E-Notes</h1>

          {/* Introduction Section */}
          <div className="bg-white p-8 rounded-lg shadow-md mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">What is E-Notes?</h2>
            <p className="text-gray-600 mb-4">
              E-Notes is a modern, user-friendly application designed to help you organize your thoughts, ideas, and tasks effortlessly. Whether you're a student, professional, or just someone who loves staying organized, E-Notes is here to make your life easier.
            </p>
            <p className="text-gray-600">
              With features like categorized notes, easy editing, and secure storage, E-Notes ensures that your information is always at your fingertips.
            </p>
          </div>

          {/* Mission Section */}
          <div className="bg-white p-8 rounded-lg shadow-md mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Our Mission</h2>
            <p className="text-gray-600">
              Our mission is to provide a simple yet powerful tool for note-taking and organization. We believe that everyone deserves a reliable way to capture and manage their ideas, and we're committed to making E-Notes the best platform for that purpose.
            </p>
          </div>

          {/* Team Section */}
          <div className="bg-white p-8 rounded-lg shadow-md mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Meet the Team</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Team Member 1 */}
              <div className="bg-gray-100 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">John Doe</h3>
                <p className="text-gray-600 mb-2">Founder & CEO</p>
                <p className="text-gray-600">
                  John is passionate about creating tools that simplify life. He leads the team with a vision to make E-Notes the go-to app for note-taking.
                </p>
              </div>

              {/* Team Member 2 */}
              <div className="bg-gray-100 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Jane Smith</h3>
                <p className="text-gray-600 mb-2">Lead Developer</p>
                <p className="text-gray-600">
                  Jane is the brains behind the technical development of E-Notes. She ensures the app is fast, reliable, and easy to use.
                </p>
              </div>

              {/* Team Member 3 */}
              <div className="bg-gray-100 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Alice Johnson</h3>
                <p className="text-gray-600 mb-2">UI/UX Designer</p>
                <p className="text-gray-600">
                  Alice focuses on creating a seamless and visually appealing experience for E-Notes users.
                </p>
              </div>

              {/* Team Member 4 */}
              <div className="bg-gray-100 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Bob Brown</h3>
                <p className="text-gray-600 mb-2">Customer Support</p>
                <p className="text-gray-600">
                  Bob is here to help you with any questions or issues you might have. He ensures that every user has a great experience with E-Notes.
                </p>
              </div>
            </div>
          </div>

          {/* Call-to-Action Section */}
          <div className="text-center mt-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Ready to Get Started?</h2>
            <p className="text-gray-600 mb-6">
              Join thousands of users who are already organizing their lives with E-Notes. Sign up today and take control of your notes!
            </p>
            <NavLink
              to="/register"
              className="inline-block bg-gradient-to-r from-teal-600 to-blue-600 text-white font-semibold px-8 py-3 rounded-lg hover:from-teal-700 hover:to-blue-700 transition-all shadow-lg"
            >
              Sign Up Now
            </NavLink>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;