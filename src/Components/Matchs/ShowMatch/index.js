import React from 'react';
import {useParams} from "react-router-dom";

const ShowMatch = () => {
    const {matchId} = useParams()
    return (
        <div>
            Affichage du match {matchId}
        </div>
    );
};

export default ShowMatch;
