import { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import api from '../utils/Api';
import { setToken, isLoggedIn, decodeToken } from '../utils/Auth';
import Layout from '../components/Layout';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // Check if the user is already logged in
  useEffect(() => {
    if (isLoggedIn()) {
      console.log('User is already logged in. Redirecting...');
      const tokenPayload = decodeToken();
      if (tokenPayload) {
        const userRole = tokenPayload.role[0].name; // Extract role from the decoded token
        console.log('User role:', userRole);
        if (userRole === 'ADMIN') {
          navigate('/category');
        } else if (userRole === 'USER') {
          navigate('/notes');
        }
      } else {
        console.error('Failed to decode token or token is invalid.');
      }
    } else {
      console.log('User is not logged in.');
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/auth/login', { email, password });
      const { token, user } = response.data.data; // Extract token and user data
      setToken(token); // Save the token in localStorage
      toast.success('Login successful!');

      // Extract the user's role from the response
      const userRole = user.roles[0].name; // Assuming roles is an array and the first role is the primary role

      // Redirect based on the user's role
      if (userRole === 'ADMIN') {
        navigate('/category'); // Redirect to the Category page for ADMIN
      } else if (userRole === 'USER') {
        navigate('/notes'); // Redirect to the Notes page for USER
      } else {
        toast.error('Unknown user role. Please contact support.');
      }
    } catch (error) {
      toast.error('Login failed. Check your credentials.');
    }
  };

  return (
    <Layout>
      <div className="flex items-center font-serif justify-center min-h-screen bg-gray-200">
        <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md border border-gray-100">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-8">Welcome Back!</h2>
          <form onSubmit={handleLogin}>
            <div className="mb-6">
              <label htmlFor="email" className="block text-lg font-medium text-gray-700 mb-2">Email</label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent transition-all"
              />
            </div>

            <div className="mb-8">
              <label htmlFor="password" className="block text-lg font-medium text-gray-700 mb-2">Password</label>
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2  focus:border-transparent transition-all"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-teal-500 to-teal-700 text-white font-semibold py-3 rounded-lg hover:from-blue-700 hover:to-teal-700 transition-all duration-300 shadow-lg"
            >
              Login
            </button>

            <p className="text-center text-gray-600 mt-6">
              Don't have an account?{' '}
              <NavLink to="/register" className="text-teal-600 hover:text-teal-600 font-semibold">Sign Up</NavLink>
            </p>
          </form>
        </div>
      </div>
    </Layout>
  );
}