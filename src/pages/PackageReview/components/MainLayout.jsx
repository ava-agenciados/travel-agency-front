import React from 'react';
import Navbar from '../../../components/Navbar/NavBar.jsx';
import Footer from '../../../components/Footer/Footer.jsx';

const MainLayout = ({ children }) => (
  <div className="min-h-screen flex flex-col bg-[#EBECF0]">
    <Navbar />
    {children}
    <Footer />
  </div>
);

export default MainLayout;
