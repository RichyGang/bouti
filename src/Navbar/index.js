import React from 'react';
import {NavLink} from "react-router-dom";

import light_mode_icon from '../icons/light-mode.png'
import dark_mode_icon from '../icons/dark-mode.png'
import "./index.css"
import ThemeContext from "../Context/ThemeContext";

const Navbar = () => {

    const {theme, toggleTheme} = React.useContext(ThemeContext)

    const linkTheme = (isActive) => {
        return isActive ? `link-${theme}-active` : `link-${theme}`
    }

    return (
        <nav className={`navbar-${theme}`}>
            <div>
                <NavLink to="/" className={({isActive})=>linkTheme(isActive)}>Home</NavLink>
            </div>
            <div className="group">
                <NavLink to="/resources" className={({isActive})=>linkTheme(isActive)}>Resources</NavLink>
                <NavLink to="/proposals" className={({isActive})=>linkTheme(isActive)}>Proposals</NavLink>
                <NavLink to="/matches" className={({isActive})=>linkTheme(isActive)}>Matchs</NavLink>
            </div>
            <div className="group">
                <div onClick={toggleTheme} className="switch-theme">
                    <img src={theme === "light" ? dark_mode_icon : light_mode_icon} className={`icon-${theme}`} alt={`to-${theme}-mode`}/>
                </div>
                <NavLink to="/admin" className={({isActive})=>linkTheme(isActive)}>Admin</NavLink>
            </div>
        </nav>
    );
};

export default Navbar;
