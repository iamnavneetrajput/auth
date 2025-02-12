import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faCircleInfo, faEnvelope, faBars, faTimes, faBlog, faCirclePlay } from '@fortawesome/free-solid-svg-icons';

const Header: React.FC = () => {
    const [menuOpen, setMenuOpen] = useState<boolean>(false);
    const [closing, setClosing] = useState<boolean>(false); // Control slide-out animation

    const toggleMenu = (): void => {
        if (menuOpen) {
            closeMenu();
        } else {
            setMenuOpen(true);
        }
    };

    /** Triggers slide-out animation before hiding menu */
    const closeMenu = (): void => {
        setClosing(true);
        setTimeout(() => {
            setMenuOpen(false);
            setClosing(false);
        }, 500); // Matches the animation duration
    };

    return (
        <div className="navbar">
            <div className="logo">
                <Link to="/">Intelli<span className="break"></span></Link>
            </div>
            <div className="menu-icon" onClick={toggleMenu}>
                <div className="menu-button">
                    {menuOpen ? <FontAwesomeIcon icon={faTimes} /> : <FontAwesomeIcon icon={faBars} />}
                </div>
                <small>Menu</small>
            </div>
            <div className={`menu ${menuOpen ? (closing ? 'closing' : 'open') : ''}`}>
                <ul>
                    <li><Link to="/" onClick={closeMenu}><FontAwesomeIcon icon={faHome} /> <span className="nav-text">Home</span></Link></li>
                    <li><Link to="/about" onClick={closeMenu}><FontAwesomeIcon icon={faCircleInfo} /> <span className="nav-text">About</span></Link></li>
                    <li><Link to="/blog" onClick={closeMenu}><FontAwesomeIcon icon={faBlog} /> <span className="nav-text">Blog</span></Link></li>
                    <li><Link to="/contact" onClick={closeMenu}><FontAwesomeIcon icon={faEnvelope} /> <span className="nav-text">Contact</span></Link></li>
                </ul>
            </div>
            <div className="user">
                <Link to="/reels" onClick={closeMenu}><FontAwesomeIcon icon={faCirclePlay} /> <small className="user-text-login">Reels</small></Link>
            </div>
        </div>
    );
};

export default Header;
