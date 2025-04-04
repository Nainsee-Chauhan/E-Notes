import React, { useState } from 'react';
import api from '../utils/Api';
import { getToken } from '../utils/Auth';
import { toast } from 'react-hot-toast';

const NotesForm = ({ showModal, setShowModal, setNotes, categories }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [categoryId, setCategoryId] = useState('');

    const handleSaveNote = async (e) => {
        e.preventDefault();
        const token = getToken();
        if (token) {
            try {
                const response = await api.post('/notes/save', {
                    title, description, category: { id: categoryId }
                }, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                console.log(response);
                setShowModal(false);
                setNotes(prevNotes => [...prevNotes, response.data.data]);
                toast.success('Note added successfully!');
                setTimeout(() => {
                    window.location.reload();
                }, 1000);
            } catch (error) {
                console.error(error);
                toast.error('Failed to add note');
            }
        }
    };

    if (!showModal) return null;

    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-xl font-bold mb-4">Add Note</h2>
                <form onSubmit={handleSaveNote}>
                    <div className="mb-4">
                        <label htmlFor="noteTitle" className="block font-medium">Note Title</label>
                        <input
                            type="text"
                            className="w-full px-4 py-2 border rounded-lg"
                            id="noteTitle"
                            placeholder="Enter note title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="noteDescription" className="block font-medium">Note Description</label>
                        <textarea
                            className="w-full px-4 py-2 border rounded-lg"
                            id="noteDescription"
                            rows="3"
                            placeholder="Enter note description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        ></textarea>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="noteCategory" className="block font-medium">Note Category</label>
                        <select
                            className="w-full px-4 py-2 border rounded-lg"
                            id="noteCategory"
                            value={categoryId}
                            onChange={(e) => setCategoryId(e.target.value)}
                        >
                            <option value="">Select category</option>
                            {categories.map(category => (
                                <option key={category.id} value={category.id}>{category.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="flex justify-end space-x-2">
                        <button type="button" className="px-4 py-2 bg-gray-300 rounded-lg" onClick={() => setShowModal(false)}>Close</button>
                        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-lg">Save Note</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default NotesForm;

