import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import Sidebar from '../components/Sidebar';
import NotesList from '../components/NotesList';
import { getToken } from '../utils/Auth';
import toast from 'react-hot-toast';
import api from '../utils/Api';

const Notes = () => {
  const [notes, setNotes] = useState([]); // Manage notes state here
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Fetch notes on component mount
  useEffect(() => {
    const token = getToken();
    if (token) {
      api.get('notes/user-notes', {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(response => setNotes(response.data.data.notes)) // Update notes state
      .catch(error => {
        console.error('Error fetching notes:', error);
        toast.error('Failed to fetch notes');
      });
    }
  }, []); // Empty dependency array to fetch notes once on component mount

  return (
    <Layout>
      <div className="flex">
        {/* Pass setNotes and notes to Sidebar */}
        <Sidebar 
          setNotes={setNotes} 
          notes={notes} 
          setSelectedCategory={setSelectedCategory} 
        />
        <div className="flex-grow">
          <div className="flex justify-center mx-4">
            {/* Pass notes and setNotes to NotesList */}
            <NotesList 
              notes={notes} 
              setNotes={setNotes} 
              selectedCategory={selectedCategory} 
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Notes;