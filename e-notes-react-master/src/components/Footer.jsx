import React from 'react';
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className='bg-gray-800 text-white py-8 '>
      <div className='container mx-auto px-4'>
        <div className='flex justify-center'>
          <div className='text-center'>
            <ul className='flex justify-center mb-4'>
              <li className='mx-3'>
                <Link to="/about" className='cursor-pointer hover:underline'>About</Link>
              </li>
              <li className='mx-3'>
                <Link to="/contact" className='cursor-pointer hover:underline'>Contact</Link>
              </li>
              <li className='mx-3'>
                <Link to="/faq" className='cursor-pointer hover:underline'>FAQ</Link>
              </li>
            </ul>
            <div className='flex justify-center mb-4'>
              <span className='mx-2 text-2xl'>
                <FaFacebookF />
              </span>
              <span className='mx-2 text-2xl'>
                <FaInstagram />
              </span>
              <span className='mx-2 text-2xl'>
                <FaTwitter />
              </span>
              <span className='mx-2 text-2xl'>
                <FaLinkedin />
              </span>
            </div>
            <hr className='my-4 border-gray-600' />
            <div>Copyright © 2025 - All Rights Reserved</div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;