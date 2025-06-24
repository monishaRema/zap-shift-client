import React from 'react';
import logo from '../../assets/logo.png';
import { Link } from 'react-router';

const Logo = () => {
    return (
        <Link to='/'>
        <div className="flex items-center">
            <img src={logo} alt='Logo' className='-rotate-5'></img>
            <h3 className='text-3xl font-black -ml-3 mt-3'>Profast</h3>
        </div>
        </Link>
    );
};

export default Logo;