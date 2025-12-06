import React from 'react';
import { Outlet } from 'react-router';
import Signup from '../Pages/Auth/Register/Signup';

const AuthLayout = () => {
    return (
        <div>
            <Outlet/>
        </div>
    );
};

export default AuthLayout;