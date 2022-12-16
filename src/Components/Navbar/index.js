import React from 'react';
import {NavLink} from "react-router-dom";

import "./index.css"
import light_mode_icon from '../../icons/light-mode.png'
import dark_mode_icon from '../../icons/dark-mode.png'
import logout_icon from '../../icons/logout.png'
import backpack_icon from '../../icons/backpack.png'
import ThemeContext from "../../Contexts/ThemeContext";
import LoginForm from "../Forms/LoginForm";
import {UserContext} from "../../Contexts/UserContext";

const Navbar = () => {

    const userContext = React.useContext(UserContext)

    console.log(userContext)
    React.useEffect(()=> {
        userContext.user && console.log(userContext.user)
    }, [userContext.user])


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
                {userContext.user ?
                    <>
                        <NavLink to="/admin" className={({isActive})=>linkTheme(isActive)}>Admin</NavLink>
                        <img src={backpack_icon} className={`icon-${theme}`} alt="logout"/>
                        <img onClick={userContext.logout} src={logout_icon} className={`icon-${theme}`} alt="logout"/>
                    </>
                    :
                    <LoginForm />
                }
                <div onClick={toggleTheme} className="switch-theme">
                    <img src={theme === "light" ? dark_mode_icon : light_mode_icon} className={`icon-${theme}`} alt={`to-${theme}-mode`}/>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;

// if user && role == admin
//admin - switch theme - language - to account button - logout

// if !user
// login form - switch theme - language