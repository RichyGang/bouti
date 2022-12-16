import React from 'react';
import './index.css'
// import {useSelector} from "react-redux";

const ResourceAttributesForm = ({category, handleNewResourceAttributes, categoryAttributeValues}) => {

    // const states = useSelector(state => state)
    //
    // const existingResourceAttributes = (categoryAttributeId) => {
    //     return (
    //         states.resourceAttributes.data
    //             .filter(ra => ra.categoryAttribute === `/api/category_attributes/` + categoryAttributeId)
    //             .map(ra => <option value={ra.value}>{ra.value}</option>)
    //     )
    // }

    return (
        // states.resourceAttributes ?
            <div className="resource-attributes">
                {category && category.categoryAttributes && category.categoryAttributes.map(categoryAttribute =>
                    <>
                        <input
                            key={categoryAttribute.id}
                            className="input-attribute"
                            type="text"
                            name={categoryAttribute.name}
                            list={categoryAttribute.name}
                            placeholder={categoryAttribute.name}
                            onChange={(event)=>handleNewResourceAttributes(event, categoryAttribute.id)}
                        />
                            <datalist id={categoryAttribute.name}>
                                {categoryAttributeValues(categoryAttribute.id).map(ra => <option value={ra.value}>{ra.value}</option>)}
                            </datalist>
                    </>
                )}
            </div>
            // :
            // <div>Reload pour avoir les resource attributes</div>
    )
};

export default ResourceAttributesForm;
