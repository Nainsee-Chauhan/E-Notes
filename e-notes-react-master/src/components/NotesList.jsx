import React, { useState, useEffect } from 'react';
import { FaTrash, FaEdit, FaCopy, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import api from '../utils/Api';
import { getToken } from '../utils/Auth';
import { toast } from 'react-hot-toast';

const NotesList = ({ selectedCategory }) => {
  const [notes, setNotes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedNote, setSelectedNote] = useState(null);
  const [formData, setFormData] = useState({ title: '', description: '' });
  const [showEdit, setShowEdit] = useState(false);
  const notesPerPage = 2;

  useEffect(() => {
    const fetchNotes = async () => {
      const token = getToken();
      if (token) {
        try {
          const response = await api.get('/notes/user-notes', {
            headers: { Authorization: `Bearer ${token}` }
          });
          setNotes(response.data.data.notes);
        } catch (error) {
          toast.error('Failed to fetch notes');
        }
      }
    };
    fetchNotes();
  }, []);

  // Filter notes based on the selected category
  const filteredNotes = selectedCategory
    ? notes.filter(note => note.category && note.category.name === selectedCategory)
    : notes;

  // Calculate the notes to display on the current page
  const indexOfLastNote = currentPage * notesPerPage;
  const indexOfFirstNote = indexOfLastNote - notesPerPage;
  const currentNotes = filteredNotes.slice(indexOfFirstNote, indexOfLastNote);

  // Handler for changing the page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleDelete = (id) => {
    const token = getToken();
    if (token) {
      api.get(`/notes/delete/${id}`, { headers: { Authorization: `Bearer ${token}` } })
        .then(() => {
          // Remove the deleted note from the notes state
          const updatedNotes = notes.filter(note => note.id !== id);
          setNotes(updatedNotes);

          // Check if the current page is empty after deletion
          const updatedFilteredNotes = selectedCategory
            ? updatedNotes.filter(note => note.category && note.category.name === selectedCategory)
            : updatedNotes;

          const updatedIndexOfLastNote = currentPage * notesPerPage;
          const updatedIndexOfFirstNote = updatedIndexOfLastNote - notesPerPage;
          const updatedCurrentNotes = updatedFilteredNotes.slice(updatedIndexOfFirstNote, updatedIndexOfLastNote);

          if (updatedCurrentNotes.length === 0 && currentPage > 1) {
            // Move to the previous page if the current page is empty
            setCurrentPage(currentPage - 1);
          }

          toast.success('Note moved to trash');
        })
        .catch(() => toast.error('Failed to move note to trash'));
    }
  };

  const handleCopy = (id) => {
    const token = getToken();
    if (token) {
      api.get(`/notes/copy/${id}`, { headers: { Authorization: `Bearer ${token}` } })
        .then(response => {
          setNotes((prevNotes) => [...prevNotes, response.data.data]);
          toast.success('Note copied successfully');
        })
        .catch(() => toast.error('Failed to copy note'));
    }
  };

  const handleCopyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        toast.success('Description copied to clipboard!');
      })
      .catch((error) => {
        console.error('Failed to copy text:', error);
        toast.error('Failed to copy description to clipboard');
      });
  };

  const handleEdit = (note) => {
    setSelectedNote(note);
    setFormData({ title: note.title, description: note.description });
    setShowEdit(true);
  };

  const handleSave = () => {
    const token = getToken();
    const updatedNote = { ...selectedNote, ...formData };

    if (token) {
      api.post('/notes/save', updatedNote, {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(() => {
          const updatedNotes = notes.map(note => (note.id === updatedNote.id ? updatedNote : note));
          setNotes(updatedNotes);
          setSelectedNote(null);
          setShowEdit(false);
          toast.success('Note updated successfully');
        })
        .catch(error => {
          console.error('Error updating note:', error);
          toast.error('Failed to update note');
        });
    }
  };

  return (
    <div className="container bg-gray-200 mx-auto px-4 font-serif">
      <h3 className="text-center text-4xl font-bold text-gray-800 mb-8 mt-4">Your Notes</h3>
      <div className="grid grid-cols-2 gap-6 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2">
        {currentNotes.length > 0 ? (
          currentNotes.map(note => (
            <div key={note.id} className="p-4 rounded-lg shadow-xl bg-gradient-to-r from-teal-50 to-blue-50">
              <div className="bg-white p-6 rounded-lg w-full border border-gray-100">
                <h5 className="text-center text-2xl font-bold text-gray-800 mb-2">{note.category ? note.category.name : 'Uncategorized'}</h5>
                <hr className='border-gray-200 mb-4' />
                <h6 className="text-2xl font-semibold mb-3 text-gray-900">{note.title}</h6>
                <p className="text-lg text-gray-600 mb-6">{note.description}</p>
                <small className="text-gray-500 block mb-4">Created On: {new Date(note.createdOn).toLocaleDateString()}</small>
                <div className="mt-4 flex justify-center space-x-4">
                  <button 
                    className="flex items-center bg-blue-100 text-blue-800 px-6 py-2 rounded-lg hover:bg-blue-200 transition-all"
                    onClick={() => handleEdit(note)}
                  >
                    <FaEdit className="mr-2" /> Edit
                  </button>
                  {/* <button 
                    className="flex items-center bg-green-100 text-green-800 px-6 py-2 rounded-lg hover:bg-green-200 transition-all"
                    onClick={() => handleCopy(note.id)}
                  >
                    <FaCopy className="mr-2" /> Copy Note
                  </button> */}
                  <button 
                    className="flex items-center bg-purple-100 text-purple-800 px-6 py-2 rounded-lg hover:bg-purple-200 transition-all"
                    onClick={() => handleCopyToClipboard(note.description)}
                  >
                    <FaCopy className="mr-2" /> Copy Note
                  </button>
                  <button 
                    className="flex items-center bg-red-100 text-red-800 px-6 py-2 rounded-lg hover:bg-red-200 transition-all"
                    onClick={() => handleDelete(note.id)}
                  >
                    <FaTrash className="mr-2" /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-xl text-gray-700">No notes found.</p>
        )}
      </div>
      {/* Pagination controls */}
      <div className="flex justify-center mt-8 mb-6">
        <button 
          className="flex items-center bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition-all disabled:opacity-50"
          onClick={() => paginate(currentPage - 1)} 
          disabled={currentPage === 1}
        >
          <FaArrowLeft className="mr-2" /> Previous
        </button>
        <span className="mx-4 text-xl text-gray-800 flex items-center">{currentPage}</span>
        <button 
          className="flex items-center bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition-all disabled:opacity-50"
          onClick={() => paginate(currentPage + 1)} 
          disabled={indexOfLastNote >= filteredNotes.length}
        >
          Next <FaArrowRight className="ml-2" />
        </button>
      </div>

      {/* Edit Modal */}
      {showEdit && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-2xl shadow-2xl w-11/12 md:w-1/2">
            <h4 className="text-3xl font-bold text-gray-800 mb-6">Edit Note</h4>
            <div className="mb-6">
              <label htmlFor="noteTitle" className="block text-lg font-medium text-gray-700 mb-2">Note Title</label>
              <input
                type="text"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                id="noteTitle"
                placeholder="Enter note title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
            </div>
            <div className="mb-8">
              <label htmlFor="noteDescription" className="block text-lg font-medium text-gray-700 mb-2">Note Description</label>
              <textarea
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                id="noteDescription"
                rows="3"
                placeholder="Enter note description"
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
                onClick={handleSave}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotesList;

