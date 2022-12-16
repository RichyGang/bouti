import React from 'react';
import {Link, Outlet} from "react-router-dom";

const Proposals = () => {
    return (
        <div>
            <h2>Toutes les proposals</h2>
            <Link to="/proposals/1">Proposal nº1</Link>
            <Outlet />
        </div>
    );
};

export default Proposals;
