import React from 'react';
import CardResource from "./CardResource";
import './index.css'

const ListResources = (props) => {

    const resourcesDisplay = props.resources.map(resource => <CardResource key={resource.id} resource={resource}/>
    )

    return (
        <div className="resource-display">
            {resourcesDisplay}
        </div>
    );
};

export default ListResources;
