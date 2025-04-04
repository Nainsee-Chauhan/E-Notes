import React, { useState, useEffect } from 'react';
import '../styles/sidebar.css';
import api from '../utils/Api';
import { getToken } from '../utils/Auth';
import { toast } from 'react-hot-toast';
import { FaSearch, FaPlus, FaTrash } from "react-icons/fa";
import NotesForm from './NotesForm';
import { useNavigate } from 'react-router-dom';

const Sidebar = ({ setNotes, notes, setSelectedCategory }) => {
  const [categories, setCategories] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  // Fetch categories from the backend
  useEffect(() => {
    const token = getToken();
    if (token) {
      api.get('category/', { headers: { Authorization: `Bearer ${token}` } })
        .then(response => {
          setCategories(response.data.data);
          setFilteredCategories(response.data.data);
        })
        .catch(error => toast.error('Failed to fetch categories'));
    }
  }, []);

  // Handle category search
  useEffect(() => {
    if (searchQuery) {
      const filtered = categories.filter(category =>
        category.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredCategories(filtered);
    } else {
      setFilteredCategories(categories);
    }
  }, [searchQuery, categories]);

  const handleCategoryClick = (categoryName) => {
    setSelectedCategory(categoryName);
  };

  const handleCreateNote = () => {
    setShowModal(true);
  };

  return (
    <div className="flex flex-col p-4 bg-gray-200 rounded-lg shadow-xl font-serif h-full">
      <div className="mb-3 ml-2">
        <button className="py-2 text-red-800 rounded-lg flex items-center justify-center" onClick={() => navigate("/trash")}>
          <FaTrash className="mr-2" /> Trash
        </button>
      </div>
      <div className="mb-3 ml-2">
        <button className="py-2 text-green-800 rounded-lg flex items-center justify-center" onClick={handleCreateNote}>
          <FaPlus className="mr-2" /> Add Note
        </button>
      </div>
      <hr className="border-gray-300 mb-3"/>
      <div className="mb-3 flex items-center bg-white rounded-lg p-2 shadow-md">
        <FaSearch className="mr-2 text-gray-500" />
        <input
          type="text"
          className="flex-grow border-none focus:outline-none"
          placeholder="Search categories"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div className="mt-3">
        <h6 className="font-semibold text-gray-700 mb-2">CATEGORIES</h6>
        {filteredCategories.map(category => (
          <div
            className="py-2 text-gray-600 hover:bg-gray-200 rounded-lg cursor-pointer"
            key={category.name}
            onClick={() => handleCategoryClick(category.name)}
          >
            {category.name.slice(0, 15)}
          </div>
        ))}
      </div>
      {/* Pass notes and setNotes to NotesForm */}
      <NotesForm 
        showModal={showModal} 
        setShowModal={setShowModal} 
        setNotes={setNotes} 
        notes={notes} 
        categories={categories} 
      />
    </div>
  );
};

export default Sidebar;