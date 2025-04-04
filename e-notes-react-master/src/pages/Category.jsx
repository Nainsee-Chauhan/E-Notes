import React, { useEffect, useState } from 'react';
import api from '../utils/Api';
import { getToken } from '../utils/Auth';
import Layout from '../components/Layout';
import toast from 'react-hot-toast';
import { FaTrash, FaEdit } from "react-icons/fa";

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [formData, setFormData] = useState({ name: '', description: '' });
  const [showEdit, setShowEdit] = useState(false);

  useEffect(() => {
    const token = getToken();
    if (token) {
      api.get('category/', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then(response => {
          setCategories(response.data.data);
        })
        .catch(error => {
          console.error('Error fetching categories:', error);
          toast.error('Failed to fetch categories');
        });
    }
  }, []);

  const handleDelete = (categoryId) => {
    const token = getToken();
    if (token) {
      api.delete(`/category/${categoryId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then(() => {
          setCategories(categories.filter(category => category.id !== categoryId));
          // toast.success('Category deleted successfully');
        })
        .catch(error => {
          console.error('Error deleting category:', error);
          toast.error('Failed to delete category!!');
        });
    }
  };

  const handleEdit = (category) => {
    setSelectedCategory(category);
    setFormData({ name: category.name, description: category.description });
    setShowEdit(true);
  };

  const handleSaveOrUpdate = () => {
    const token = getToken();
    const categoryData = selectedCategory ? { ...selectedCategory, ...formData } : formData;

    if (token) {
      api.post('category/save', categoryData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then(response => {
          if (selectedCategory) {
            // Update existing category
            const updatedCategories = categories.map(cat => 
              cat.id === selectedCategory.id ? response.data.data : cat
            );
            setCategories(updatedCategories);
            toast.success('Category updated successfully');
          } else {
            // Create new category
            setCategories([...categories, response.data.data]);
            toast.success('Category created successfully');
          }
          setSelectedCategory(null);
          setFormData({ name: '', description: '' });
          setShowEdit(false);
          window.location.reload();
        })
        .catch(error => {
          console.error('Error saving category:', error);
          toast.error(error.message || 'Failed to save category');
        });
    }
  };

   

  return (
    <Layout>
      <div className="container mx-auto p-8 bg-gray-200 font-serif min-h-screen">
        {/* Create New Category Section */}
        <div className="mb-8 p-6 bg-white rounded-2xl shadow-lg">
          <h4 className="text-3xl font-bold text-gray-800 mb-6">Create New Category</h4>
          <div className="mb-4">
            <label htmlFor="newCategoryName" className="block text-lg font-medium text-gray-700 mb-2">Category Name</label>
            <input
              type="text"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
              id="newCategoryName"
              placeholder="Enter category name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>
          <div className="mb-6">
            <label htmlFor="newCategoryDescription" className="block text-lg font-medium text-gray-700 mb-2">Category Description</label>
            <textarea
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
              id="newCategoryDescription"
              rows="3"
              placeholder="Enter category description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            ></textarea>
          </div>
          <button
            className="w-full bg-gradient-to-r from-teal-600 to-blue-600 text-white font-semibold py-3 rounded-lg hover:from-teal-700 hover:to-blue-700 transition-all shadow-lg"
            onClick={handleSaveOrUpdate}
          >
            {selectedCategory ? 'Update Category' : 'Create Category'}
          </button>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map(category => (
            <div key={category.id} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
              <h5 className="text-2xl font-bold text-gray-800 mb-3">{category.name}</h5>
              <p className="text-lg text-gray-600 mb-4">{category.description}</p>
              <div className="flex space-x-4">
                <button
                  className="flex items-center bg-green-100 text-green-800 px-4 py-2 rounded-lg hover:bg-green-200 transition-all"
                  onClick={() => handleEdit(category)}
                >
                  <FaEdit className="mr-2" /> Edit
                </button>
                <button
                  className="flex items-center bg-red-100 text-red-800 px-4 py-2 rounded-lg hover:bg-red-200 transition-all"
                  onClick={() => handleDelete(category.id)}
                >
                  <FaTrash className="mr-2" /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Edit Modal */}
        {showEdit && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white p-8 rounded-2xl shadow-2xl w-11/12 md:w-1/2">
              <h4 className="text-3xl font-bold text-gray-800 mb-6">Edit Category</h4>
              <div className="mb-6">
                <label htmlFor="categoryName" className="block text-lg font-medium text-gray-700 mb-2">Category Name</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                  id="categoryName"
                  placeholder="Enter category name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div className="mb-8">
                <label htmlFor="categoryDescription" className="block text-lg font-medium text-gray-700 mb-2">Category Description</label>
                <textarea
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                  id="categoryDescription"
                  rows="3"
                  placeholder="Enter category description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                ></textarea>
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400 transition-all"
                  onClick={() => setShowEdit(false)}
                >
                  Cancel
                </button>
                <button
                  className="bg-gradient-to-r from-teal-600 to-blue-600 text-white px-6 py-2 rounded-lg hover:from-teal-700 hover:to-blue-700 transition-all shadow-lg"
                  onClick={handleSaveOrUpdate}
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}

export default Category;

