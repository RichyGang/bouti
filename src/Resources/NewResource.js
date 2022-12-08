import React from 'react';
import ChoiceCategory from "../Categories/ChoiceCategory";
import {useDispatch, useSelector} from "react-redux";
import ResourceAttributesForm from "./ResourceAttributesForm";
import PicturesForm from "./PicturesForm";
import {Form} from "react-router-dom";
import {postResource} from "../Redux/reducers/resources";

const NewResource = () => {

    const dispatch = useDispatch()

    const states = useSelector(state => state)
    const [category, setCategory] = React.useState(null)
    const [newResource, setNewResource] = React.useState({
        author: null,
        category: "",
        description: "",
        medias: null
    })
    const [newResourceAttributes, setNewResourceAttributes] = React.useState([])

    function handleCategory(category) {
        setCategory(category)
        setNewResource({...newResource, category: "/api/categories/" + category.id})
    }

    const handleNewResource = (event) => {
        const {name, value, type} = event.target
        type === "file" ? setNewResource({
                ...newResource,
                [name] : event.target.files[0]
            }) :
            setNewResource({
                ...newResource,
                [name] : value
            })
    }

    const handleNewResourceAttributes = (event, categoryAttributeId) => {
        const {name, value, type} = event.target
        console.log(name, value, type, categoryAttributeId)
        setNewResourceAttributes(resourceAttributes => {
            const i = resourceAttributes.findIndex(ra => ra.categoryAttribute === "/api/category_attributes/" + categoryAttributeId)
            if (i !== -1) {
                resourceAttributes[i] = {
                    ...resourceAttributes[i],
                    value: value
                }
            } else {
                resourceAttributes = [...resourceAttributes, {
                    categoryAttribute: "/api/category_attributes/" + categoryAttributeId,
                    value: value
                }]
            }
            return resourceAttributes
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        dispatch(postResource(newResource, newResourceAttributes))
    }


    return (
        <div className="block-new-resource">
            {states.categories && <ChoiceCategory categories={states.categories.data} category={category} setCategory={handleCategory}/>}
            {category && <Form onSubmit={handleSubmit}>
                <ResourceAttributesForm category={category} handleNewResourceAttributes={handleNewResourceAttributes}/>
                <PicturesForm resource={newResource} handleNewResource={handleNewResource}/>
                <input
                    type="text"
                    name="description"
                    onChange={handleNewResource}
                    placeholder="description"
                />
                <button>Ajouter</button>
            </Form>
            }
        </div>
    );
};

export default NewResource;
