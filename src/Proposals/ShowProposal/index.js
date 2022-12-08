import React from 'react';
import {useParams} from "react-router-dom";

const ShowProposal = () => {
    const {proposalId} = useParams()
    return (
        <div>
            <h2>Affichage de la proposal {proposalId}</h2>
        </div>
    );
};

export default ShowProposal;
