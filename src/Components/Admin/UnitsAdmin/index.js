import React from 'react';
import UnitsTable from "./UnitsTable";
import {useSelector} from "react-redux";
import NewUnit from "./NewUnit";

const UnitsAdmin = () => {

    const states = useSelector(state => state)
    const [unit, setUnit] = React.useState({})

    return (
        <div>
            {states.units && <UnitsTable units={states.units.data} unit={unit} setUnit={setUnit}/>}
            <NewUnit/>
        </div>
    );
};

export default UnitsAdmin;
