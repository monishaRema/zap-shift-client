import React from 'react';
import Navbar from '../Pages/Shared/Navbar/Navbar';
import Footer from '../Pages/Shared/Footer/Footer';
import { Outlet } from 'react-router';

const MainLayout = () => {
    return (
       <>
            <Navbar />
                <Outlet></Outlet>
            <Footer />
       </>
    );
};

export default MainLayout;