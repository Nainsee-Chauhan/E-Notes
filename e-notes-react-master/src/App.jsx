import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Category from './pages/Category';
import Notes from './pages/Notes';
import Trash from './pages/Trash';
import PrivateRoute from './utils/PrivateRoute'; // Import the PrivateRoute component here
import FAQ from './pages/FAQ';
import Contact from './pages/Contact';
import About from './pages/About';


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About/>} />
    
        {/* Private Routes */}
        <Route path="/category" element={<PrivateRoute><Category/></PrivateRoute>} />
        <Route path="/notes" element={<PrivateRoute><Notes/></PrivateRoute>} />
        <Route path="/trash" element={<PrivateRoute><Trash/></PrivateRoute>} />
      </Routes>
    </>
  );
}

export default App;
