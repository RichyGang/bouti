import React from 'react';
import {Link, Outlet} from "react-router-dom";
import ListResources from "./ListResources";
import {useDispatch, useSelector} from "react-redux";
import ChoiceCategory from "../Categories/ChoiceCategory";
import './index.css'
import {getResources} from "../Redux/reducers/resources";

const Resources = () => {

    const states = useSelector(states => states)
    const [category, setCategory] = React.useState(null)

    const dispatch = useDispatch()

    React.useEffect(()=>{
        dispatch(getResources())
    }, [])

    return (
        <>
            {states.categories &&
                <div className="flex">
                    <Link className="button-add" to="/resources/new">Ajouter une ressource</Link>
                    <div className="search-fields">
                        <ChoiceCategory
                            categories={states.categories.data}
                            category={category}
                            setCategory={setCategory}
                            />
                        <div>Champs</div>
                    </div>
                    {states.resources && <ListResources resources={states.resources.data}/>}
                    <Outlet/>
                </div>
            }
        </>
    );
};

export default Resources;
