import { useState } from 'react';
import api from '../utils/Api';
import { NavLink, useNavigate } from 'react-router-dom';
import { toast} from 'react-hot-toast';
import Layout from '../components/Layout';

const Register = () => {
    const roles = [
        { id: 1, name: 'USER' },
        { id: 2, name: 'ADMIN' },
    ];

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [mobNo, setMobNo] = useState('');
    const [selectedRole, setSelectedRole] = useState('');
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            const userRoles = [{ id: selectedRole }];
            await api.post('/auth/register', { email, password, name, mobNo, roles: userRoles });
            toast.success('Registered successfully');
            navigate('/login');
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                toast.error(error.response.data.message);
            } else {
                toast.error('Registration failed');
            }
        }
    };

    return (
        <Layout>
            <div className="flex items-center justify-center min-h-screen font-serif bg-gray-200">
                <form
                    onSubmit={handleSignup}
                    className="m-4 w-full max-w-lg p-8 bg-white rounded-2xl shadow-2xl border border-gray-100"
                >
                    <h2 className="text-4xl font-bold text-center text-gray-800 mb-8">Create Your Account</h2>

                    <div className="flex items-center mb-6">
                        <label htmlFor="name" className="block text-lg font-medium text-gray-700 w-1/5">Name</label>
                        <input
                            type="text"
                            id="name"
                            placeholder="Enter your name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="w-4/5 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent transition-all"
                        />
                    </div>

                    <div className="flex items-center mb-6">
                        <label htmlFor="mobNo" className="block text-lg font-medium text-gray-700 w-1/5">Mobile Number</label>
                        <input
                            type="tel"
                            id="mobNo"
                            placeholder="Enter your mobile number"
                            value={mobNo}
                            onChange={(e) => setMobNo(e.target.value)}
                            required
                            className="w-4/5 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent transition-all"
                        />
                    </div>

                    <div className="flex items-center mb-6">
                        <label htmlFor="email" className="block text-lg font-medium text-gray-700 w-1/5">Email</label>
                        <input
                            type="email"
                            id="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-4/5 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent transition-all"
                        />
                    </div>

                    <div className="flex items-center mb-6">
                        <label htmlFor="password" className="block text-lg font-medium text-gray-700 w-1/5">Password</label>
                        <input
                            type="password"
                            id="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-4/5 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2  focus:border-transparent transition-all"
                        />
                    </div>

                    <div className="mb-8">
                        <select
                            id="role"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2  focus:border-transparent transition-all"
                            value={selectedRole}
                            onChange={(e) => setSelectedRole(e.target.value)}
                            required
                        >
                            <option value="">Select Role</option>
                            {roles.map(role => (
                                <option key={role.id} value={role.id}>
                                    {role.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-teal-500 to-teal-700 text-white font-semibold py-3 rounded-lg hover:from-teal-700 hover:to-teal-700 transition-all shadow-lg"
                    >
                        Sign Up
                    </button>

                    <p className="text-center text-gray-600 mt-6">
                        Already have an account?{' '}
                        <NavLink to="/login" className="text-purple-600 hover:text-pink-600 font-semibold">Log in</NavLink>
                    </p>
                </form>
            </div>
        </Layout>
    );
};

export default Register;