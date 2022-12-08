import React from 'react';
import PropTypes from "prop-types";

import "./index.css"
import getCategoryPath from "./getCategoryPath";

const ChoiceCategory = (props) => {
    console.log("2")

    const categoryChildren = props.category ?
        props.categories.filter(category => category.categoryParent && category.categoryParent.id === props.category.id)
        :
        props.categories.filter(category => category.categoryParent === props.category)

    const path = props.category && getCategoryPath({category: props.category})
    return (
        <div className="categories">
            {props.category && <button className="secondary" onClick={()=>props.setCategory(null)}>catégories</button>}
            {path && path.map(category => <button key={category.id} className="path" onClick={()=>props.setCategory(category)}>{category.name}</button>)}
            {categoryChildren.map(category => <button key={category.id} className="choose" onClick={()=>props.setCategory(category)}>{category.name}</button>)}
        </div>
    );

};

ChoiceCategory.propTypes = {
    categories: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
        categoryParent: PropTypes.object,
        categoryAttributes: PropTypes.array,
    }))
}

ChoiceCategory.defaultProps = {
    categories: [],
    category: null
}

export default ChoiceCategory;
