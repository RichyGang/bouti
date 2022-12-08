import React from 'react';
import './index.css'
import {removeCategoryAttribute} from "../../Redux/reducers/categories";
import {useDispatch} from "react-redux";

const CategoryAttributesAdmin = (props) => {

    const dispatch = useDispatch()

    const categoryAttributes = props.category && props.category.categoryAttributes.map(attribute =>
        <div key={attribute.id}>
            {attribute.name} {attribute.unit ? "[" + attribute.unit.unitConversions[0].symbol + "]" : null}
            <button onClick={()=>{
                dispatch(removeCategoryAttribute({category: props.category, categoryAttribute: attribute}))
                props.setCategory({...props.category, categoryAttributes: props.category.categoryAttributes.filter(attr => attr.id !== attribute.id)})
            }
            }>X</button>
        </div>)

    return (
        <div className="attributes">
            {categoryAttributes}
        </div>
    );
};

export default CategoryAttributesAdmin;
