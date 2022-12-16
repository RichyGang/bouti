import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Link, Outlet} from "react-router-dom";
import {UserContext} from "../../Contexts/UserContext";

import './index.css'
import ListResources from "./ListResources";
import ChoiceCategory from "../Categories/ChoiceCategory";
import {getResources} from "../../Redux/reducers/resources";
import {getResourceAttributes} from "../../Redux/reducers/resourceAttributes";
// import getCategoryPath from "../Categories/getCategoryPath";
import useCategory from "../../hooks/useCategory";

const Resources = () => {
    const dispatch = useDispatch()
    const states = useSelector(states => states)

    const {user} = React.useContext(UserContext)

    const [category, setCategory] = React.useState(null)

    const {getCategoryChildren} = useCategory()

    const categoryChildren = category && getCategoryChildren(category)

    const resources = category && states.resources && states.resources.data
        .filter(resource => categoryChildren.find(category => category.id === resource.category.id))

    React.useEffect(()=>{
        dispatch(getResources())
        dispatch(getResourceAttributes())
    }, [])

    return ( states.categories &&
        <div>
            <h2>Resources</h2>
            {user && <Link className="button-add" to="/resources/new">Ajouter une ressource</Link>}
            <div className="search-fields">
                <ChoiceCategory
                    categories={states.categories.data}
                    category={category}
                    setCategory={setCategory}
                />
                {category && <div>Champs attributs</div>}

            </div>
            {category && <ListResources resources={resources}/>}
            <Outlet/>
        </div>
    );
};

export default Resources;
