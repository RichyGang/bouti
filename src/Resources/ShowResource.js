import React from 'react';
import {useParams} from "react-router-dom";

const ShowResource = () => {
    const {resourceId} = useParams()
    return (
        <div>
            <h2>Affichage de la ressource {resourceId}</h2>
        </div>
    );
};

export default ShowResource;
