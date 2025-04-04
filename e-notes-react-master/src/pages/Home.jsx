import React from 'react';
import Layout from '../components/Layout';
import { NavLink } from 'react-router-dom';
import notes from '../assets/notes.jpg'; // Add your image path here

const Home = () => {
    return (
        <Layout>
            <div className="flex items-center justify-center min-h-screen bg-gray-200">
                <div className="w-screen max-w-4xl bg-white bg-opacity-90 p-8 rounded-2xl shadow-2xl flex items-center justify-between backdrop-blur-sm">
                    {/* Text Section */}
                    <div className="text-left w-1/2 pr-8">
                        <h1 className="text-5xl font-bold font-serif mb-6 text-gray-800">
                            Welcome to <span className="text-teal-600"><br/>E-Notes!</span>
                        </h1>
                        <p className="text-xl font-serif text-gray-600 mb-8 leading-relaxed">
                            Your ultimate destination for organized, digital note-taking. Capture your ideas, manage tasks, and stay productive effortlessly.
                        </p>
                        <NavLink 
                            to="/login" 
                            className="inline-block bg-gradient-to-r from-teal-600 to-blue-600 text-white font-sans font-semibold py-3 px-8 rounded-lg transition-all duration-300 hover:from-teal-700 hover:to-blue-700 hover:shadow-lg"
                        >
                            Get Started
                        </NavLink>
                    </div>

                    {/* Image Section */}
                    <div className="w-1/2">
                        <img 
                            src={notes} 
                            alt="Welcome" 
                            className="w-full rounded-xl border-4 border-white shadow-lg transform hover:scale-105 transition-transform duration-300" 
                        />
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default Home;