import React from 'react';

import './index.css'

const CardResource = ({resource}) => {
    console.log(resource)
    return (
        <div className="resource-card">
            {resource.medias[0] && console.log(resource.medias[0].contentUrl)}
            <p>{resource.category.name}</p>
            {resource.medias[0] && <img className="img-card" src={`https://localhost:8000${resource.medias[0].contentUrl}`} alt="resourceImage"/>}
            {/*{resource.resourceAttributes.map(resourceAttribute => <p>{resourceAttribute.value}</p>)}*/}
        </div>
    );
};

export default CardResource;
