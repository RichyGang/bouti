import React from 'react';
import {useDispatch, useSelector} from "react-redux";

import './index.css'
import ChoiceCategory from "../../Categories/ChoiceCategory";
import CategoryAttributesAdmin from "./CategoryAttributesAdmin";
import AddCategoryAttributes from "./AddCategoryAttributes";
import {getAllCategoryAttributes} from "../../../Redux/reducers/categoryAttributes";
import NewCategoryAttribute from "./NewCategoryAttribute";
import NewCategory from "./NewCategory";

const CategoryAdmin = () => {

    const dispatch = useDispatch()
    const states = useSelector(states => states)

    const [category, setCategory] = React.useState(null)

    React.useEffect(()=>{
        dispatch(getAllCategoryAttributes())
    }, [])

    console.log(states)
    return (
        <>
            {states.categories &&
                <div className="admin_categories">
                    <ChoiceCategory
                        categories={states.categories.data}
                        category={category}
                        setCategory={setCategory}
                    />
                    <NewCategory categoryParent={category}/>
                    <CategoryAttributesAdmin
                        category={category}
                        setCategory={setCategory}
                    />
                    <AddCategoryAttributes category={category} setCategory={setCategory}/>
                    <NewCategoryAttribute/>
                </div>
            }
        </>
    );
};


export default CategoryAdmin;
