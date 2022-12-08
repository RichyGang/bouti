import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {putCategoryAttribute} from "../../Redux/reducers/categories";

const AddCategoryAttributes = (props) => {
    const dispatch = useDispatch()

    const states = useSelector(states => states)

    const categoryAttributes = states.categoryAttributes && states.categoryAttributes.data

    const restCategoryAttributes = props.category && categoryAttributes
        .filter(attribute => props.category.categoryAttributes.filter(a => a.id === attribute.id).length === 0)
        .map(attribute => <button key={attribute.id} value={attribute.id} onClick={()=>{
            dispatch(putCategoryAttribute({categoryAttribute: attribute, category: props.category}))
            props.setCategory(prevCategory => {
                return {...prevCategory, categoryAttributes: [...prevCategory.categoryAttributes, attribute]}
            })
        }
        }
        >{attribute.name}</button>)

    return (
        <>
            <div className="add_category_attributes">
                {restCategoryAttributes}
            </div>
        </>
    );
};

export default AddCategoryAttributes;
