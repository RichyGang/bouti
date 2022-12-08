import React from 'react';
import './index.css'

const ResourceAttributesForm = ({category, handleNewResourceAttributes}) => {

    return (
        <div className="resource-attributes">
            {category && category.categoryAttributes && category.categoryAttributes.map(categoryAttribute =>
                <input
                    key={categoryAttribute.id}
                    className="input-attribute"
                    type="text"
                    name={categoryAttribute.name}
                    placeholder={categoryAttribute.name}
                    onChange={(event)=>handleNewResourceAttributes(event, categoryAttribute.id)}
                />
            )}
        </div>
    );
};

export default ResourceAttributesForm;
