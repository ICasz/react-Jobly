import React from 'react';
import {Link} from 'react-router-dom';
import '../StyleSheets/Nav.css';

function Nav () {
    return (
        <nav className='navBar'>
            <div className='navMain'>
                <Link to='/login' className='link'>Login</Link>
                <Link to='/register'className='link'>Register</Link>
            </div>
        </nav>
    );
}

export default Nav;
