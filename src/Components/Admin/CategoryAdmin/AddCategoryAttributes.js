import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {putCategoryAttribute} from "../../../Redux/reducers/categoryAttributes";
import useCategory from "../../../hooks/useCategory";

const AddCategoryAttributes = (props) => {
    const dispatch = useDispatch()
    const states = useSelector(states => states)
    const {getCategoryChildren} = useCategory()

    const categoryAttributes = states.categoryAttributes && states.categoryAttributes.data

    const categoryChildren = props.category && getCategoryChildren(props.category)

    const restCategoryAttributes = props.category && categoryAttributes
        .filter(attribute => props.category.categoryAttributes.filter(a => a.id === attribute.id).length === 0)
        .map(categoryAttribute => {
            return <button
                key={categoryAttribute.id}
                value={categoryAttribute.id}
                onClick={()=>{
                    props.setCategory(prevCategory => {
                        return {...prevCategory, categoryAttributes: [...prevCategory.categoryAttributes, categoryAttribute]}
                    })
                    //on passe les categoryChildren pour aussi leur y rajouter l'attribut
                    dispatch(putCategoryAttribute(categoryAttribute, categoryChildren))
                }}
            >
                {categoryAttribute.name}
            </button>
        }
        )

    return (
        <>
            <div className="add_category_attributes">
                {restCategoryAttributes}
            </div>
        </>
    );
};

export default AddCategoryAttributes;
