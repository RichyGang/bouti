import React from 'react';

import './index.css'

const ResourceCard = ({resource}) => {
    return (
        <div className="resource-card">
            {resource.medias[0] && console.log(resource.medias[0].contentUrl)}
            <p>{resource.category.name}</p>
            {resource.medias[0] && <img className="img-card" src={`https://localhost:8000${resource.medias[0].contentUrl}`} alt="resourceImage"/>}
        </div>
    );
};

export default ResourceCard;
