import React from 'react';
import {useDispatch} from "react-redux";
import {postCategory} from "../../../Redux/reducers/categories";

const NewCategory = (props) => {

    const dispatch = useDispatch()

    const [newCategory, setNewCategory] = React.useState({
        categoryParent : undefined,
        name: ""
    })

    React.useEffect(()=>{
        props.categoryParent && setNewCategory({
            ...newCategory,
            categoryParent: `/api/categories/${props.categoryParent.id}`
        })
    }, [props.categoryParent])

    function handleChange(event) {
        const {value, name} = event.target
        setNewCategory({...newCategory, [name] : value })
    }

    function handleSubmit(event) {
        event.preventDefault()
        dispatch(postCategory(newCategory))
        setNewCategory({...newCategory, name: ""})
    }

    // console.log(newCategory)

    return (
        <div>
            <h4>Nouvelle catégorie</h4>
            <h5>Selectionner le parent direct</h5>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    placeholder="nom de la nouvelle categorie"
                    value={newCategory.name}
                    onChange={handleChange}
                />
               <button>Ajouter</button>
            </form>
        </div>
    );
};

export default NewCategory;
