import React from 'react';
import {Link, Outlet} from "react-router-dom";
import './index.css'

const Admin = () => {
    console.log("1")
    return (
        <div>
            <h2>Admin page</h2>
            <Link to="/admin/categories" className="link">Categories</Link>
            <Link to="/admin/units" className="link">Unités</Link>
            <Outlet/>
        </div>
    );
};

export default Admin;
