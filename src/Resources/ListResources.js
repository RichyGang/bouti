import React from 'react';
import ResourceCard from "./ResourceCard";
import './index.css'

const ListResources = (props) => {

    const resourcesDisplay = props.resources.map(resource => <ResourceCard resource={resource}/>
    )

    console.log()
    return (
        <div className="resource-display">
            {resourcesDisplay}
        </div>
    );
};

export default ListResources;
