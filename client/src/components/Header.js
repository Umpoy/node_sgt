import React from 'react';
import GoogleAuth from './GoogleAuth';
import '../assets/css/Header.css'

const Header = props => {
    return (
        <div className="header border-botton">
            <h1 className="text-center">Grade Table</h1>
            <GoogleAuth />
        </div>
    )
}

export default Header;