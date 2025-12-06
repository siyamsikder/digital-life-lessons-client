import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../Shared/Navbsr/Navbar';
import Footer from '../Shared/Footer/Footer';

const MainLayout = () => {
    return (
        <div>
            <header>
               <Navbar/>
            </header>
            <main>
             <Outlet/>
            </main>
            <footer>
                <Footer/>
            </footer>
        </div>
    );
};

export default MainLayout;