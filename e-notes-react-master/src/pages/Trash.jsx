import React, { useEffect, useState } from 'react';
import api from '../utils/Api';
import { getToken } from '../utils/Auth';
import { toast } from 'react-hot-toast';
import Layout from '../components/Layout';
import { FaTrashRestore,  FaTrash } from "react-icons/fa";
import { GiReturnArrow } from "react-icons/gi";
import { useNavigate } from 'react-router-dom';

const Trash = () => {
    const [deletedNotes, setDeletedNotes] = useState([]);
    const navigate = useNavigate();

    // Fetch deleted notes
    useEffect(() => {
        const fetchDeletedNotes = async () => {
            const token = getToken();
            if (token) {
                try {
                    const response = await api.get('/notes/recycle-bin', {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });
                    setDeletedNotes(response.data.data);
                } catch (error) {
                    toast.error('Recycle bin is empty');
                }
            }
        };
        fetchDeletedNotes();
    }, []);

    // Restore notes
    const handleRestore = async (noteId) => {
        const token = getToken();
        if (token) {
            try {
                await api.get(`/notes/restore/${noteId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setDeletedNotes(deletedNotes.filter(note => note.id !== noteId));
                toast.success('Note restored successfully');
            } catch (error) {
                toast.error('Failed to restore note');
            }
        }
    };

    // Permanently delete notes
    const handlePermanentDelete = async (noteId) => {
        const token = getToken();
        if (token) {
            try {
                await api.delete(`/notes/delete/${noteId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setDeletedNotes(deletedNotes.filter(note => note.id !== noteId));
                toast.success('Note deleted permanently');
            } catch (error) {
                toast.error('Failed to delete note');
            }
        }
    };

    return (
        <Layout>
            <div className="bg-gray-200 min-h-screen p-6 ">
                <h1 className="text-3xl font-bold italic font-serif text-center mb-8">RECYCLE BIN</h1>
                <ul className="space-y-4 grid grid-cols-2 md:grid-cols-3 gap-6">
                    {deletedNotes?.map((note) => (
                        <li key={note.id} className="bg-white p-4 m-2 rounded-lg shadow-md"> 
                            <h1 className="text-xl text-center font-serif font-bold">{note.category.name}</h1>
                            <hr />
                            <h5 className=" m-2 font-serif font-semibold">{note.title}</h5>
                            <p className="text-gray-700 m-2">{note.description}</p>
                            <small className="text-gray-500 block m-2">
                                Deleted On: {new Date(note.deletedOn).toLocaleDateString()}
                            </small>
                            <div className="flex space-x-2 m-2">
                                <button
                                    className="text-blue-700 px-3 py-1 hover:text-blue-900"
                                    onClick={() => handleRestore(note.id)}
                                >
                                 <FaTrashRestore size="20"/>
                                </button>
                                <button
                                    className="text-red-600 px-3 py-1 hover:text-red-800"
                                    onClick={() => handlePermanentDelete(note.id)}
                                >
                                    < FaTrash size="20"/>
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
                
            <div className='text-center m-6'>
                <button onClick={() => navigate("/notes")}>
                <p>Return Back to Notes Page </p>  
                <  GiReturnArrow size="50" className='m-4 text-teal-600 '/>

                </button>
            </div>
            </div>

            
        </Layout>
    );
};

export default Trash;
