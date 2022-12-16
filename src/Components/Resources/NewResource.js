import React from 'react';
import ChoiceCategory from "../Categories/ChoiceCategory";
import {useDispatch, useSelector} from "react-redux";
import ResourceAttributesForm from "./ResourceAttributesForm";
import PicturesForm from "./PicturesForm";
import {postResource} from "../../Redux/reducers/resources";
import {UserContext} from "../../Contexts/UserContext";
// import {postMedia} from "../../Redux/reducers/medias";

const NewResource = () => {

    const {user} = React.useContext(UserContext)

    const dispatch = useDispatch()

    const states = useSelector(state => state)
    const [category, setCategory] = React.useState(null)
    const [newResource, setNewResource] = React.useState({
        author: `/api/users/${user.id}`,
        category: "",
        description: "",
        medias: []
    })
    const [newResourceAttributes, setNewResourceAttributes] = React.useState([])

    function handleCategory(category) {
        setCategory(category)
        setNewResource({...newResource, category: "/api/categories/" + category.id})
    }

    console.log(newResource)

    const handleNewResource = (event) => {
        const {name, value, type} = event.target
        console.log(type, name)
        type === "file" ? setNewResource({
                ...newResource,
                medias : [...newResource.medias, event.target.files[0]]
            }) :
            setNewResource({
                ...newResource,
                [name] : value
            })
    }

    // const states = useSelector(state => state)

    // Retource toutes les valeurs associées à ce categoryAttribute, valeurs qui sont des resourceAttributes
    const categoryAttributeValues = (categoryAttributeId, categoryId) => {
        return (
            states.resourceAttributes.data
                .filter(ra => ra.categoryAttribute.id === categoryAttributeId && ra.categoryAttribute.categories.find(category => category.id === categoryId))
                // .map(ra => <option value={ra.value}>{ra.value}</option>)
        )
    }

    //Ajoute simplement à l'objet NewResourceAttributes les valeurs des attributs rentrés en fonction de la categoryAttribute
    const handleNewResourceAttributes = (event, categoryAttributeId) => {
        const {name, value, type} = event.target
        console.log(name, value, type, categoryAttributeId)
        setNewResourceAttributes(resourceAttributes => {
            const i = resourceAttributes.findIndex(ra => ra.categoryAttribute === "/api/category_attributes/" + categoryAttributeId)
            // si le user a deja rentré une valeur ca modifie ce champ, sinon ca cree un nouveau champ
            if (i !== -1) {
                resourceAttributes[i] = {
                    ...resourceAttributes[i],
                    value: value
                }
                console.log(categoryAttributeValues(categoryAttributeId).find(cav => cav.value === value))

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
        // postMedia({file: newResource.medias[0], object:newResource})
    }
    console.log(states)


    return (
        <div className="block-new-resource">
            {states.categories && <ChoiceCategory categories={states.categories.data} category={category} setCategory={handleCategory}/>}
            {category && <form onSubmit={handleSubmit}>
                <ResourceAttributesForm
                    category={category}
                    handleNewResourceAttributes={handleNewResourceAttributes}
                    categoryAttributeValues={categoryAttributeValues}
                />
                <PicturesForm resource={newResource} handleNewResource={handleNewResource}/>
                <input
                    type="text"
                    name="description"
                    onChange={handleNewResource}
                    placeholder="description"
                />
                <button>Ajouter</button>
            </form>
            }
        </div>
    );
};

export default NewResource;
