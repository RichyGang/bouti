import React from 'react';
import {Link, Outlet} from "react-router-dom";

const Matches = () => {
    return (
        <div>
            <h2>Tes matches bogoss</h2>
            <Link to="/matches/1">Match A</Link>
            <Outlet/>
        </div>
    );
};

export default Matches;
