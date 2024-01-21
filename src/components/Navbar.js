import React, { useState, useEffect } from 'react';
import { a } from 'react-router-dom';
import bankLogo from '../images/bank_logo.png'
import '../styles/navbar.scss'

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [currentPath, setCurrentPath] = useState(window.location.pathname);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    useEffect(() => {
        setCurrentPath(window.location.pathname);
    }, []);

    return (
        <nav>
            <div className="container1">
                <div className="logo">
                    <a href="/">
                        <img src={bankLogo} alt="" />
                    </a>
                </div>
                <div className="menu-toggle" onClick={toggleMenu}>
                    <div className={`menu-icon ${menuOpen ? 'open' : ''}`}>
                        <div className="bar1"></div>
                        <div className="bar2"></div>
                        <div className="bar3"></div>
                    </div>
                </div>
                <ul className={`menu ${menuOpen ? 'open' : ''}`}>
                    <li>
                        <a href="/" className={currentPath === '/' ? 'active' : ''}>
                            Home
                        </a>
                    </li>
                    <li>
                        <a href="/allCustomers" className={currentPath === '/allCustomers' ? 'active' : ''}>
                            All Accounts
                        </a>
                    </li>
                    <li>
                        <a href="/moneyTransfer" className={currentPath === '/moneyTransfer' ? 'active' : ''}>
                            Money Transfer
                        </a>
                    </li>
                    <li>
                        <a href="/transactions" className={currentPath === '/transactions' ? 'active' : ''}>
                            Transactions
                        </a>
                    </li>
                    {/* <li>
                        <a href="/signIn" className={currentPath === '/signIn' ? 'active' : ''}>
                            SignIn
                        </a>
                    </li> */}
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
