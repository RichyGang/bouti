import React, {useRef} from 'react';
import './index.css'
import {useDispatch, useSelector} from "react-redux";
import {postCategoryAttribute} from "../../Redux/reducers/categoryAttributes";

const NewCategoryAttribute = () => {

    const units = useSelector(state => state.units.data)

    const selectRef = useRef(null)
    const dispatch = useDispatch()

    const [newCategoryAttribute, setNewCategoryAttribute] = React.useState({
        name: ""
    })

    const handleChange = (event) => {
        const {name, value} = event.target
        setNewCategoryAttribute(
            {
            ...newCategoryAttribute,
            [name]: value === "no_unit" ? null : value
        }
        )
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        dispatch(postCategoryAttribute(newCategoryAttribute))
        setNewCategoryAttribute({name:""})
        console.log(selectRef.current.value = null)
    }

    const unitsDisplay = units.map(unit => <option key={unit.id} value={"/api/units/" + unit.id}>{unit.name}</option>)

    return (
        <div className="new_category_attribute">
            <h4>Nouvel attribut</h4>
            <div>
                <label htmlFor="name">Nom  </label>
                <input
                    id="name"
                    type="text"
                    name="name"
                    value={newCategoryAttribute.name}
                    onChange={handleChange}
                    placeholder="de l'attribut"
                />
            </div>
            <div>
                <label htmlFor="unit">Unité  </label>
                <select ref={selectRef} name="unit" id="unit" onChange={handleChange} value={newCategoryAttribute.unit ? newCategoryAttribute.unit : ""}>
                    <option value="no_unit"> - (sans)</option>
                    {unitsDisplay}
                </select>
            </div>
            <button onClick={(event)=>handleSubmit(event)}>Ajouter</button>
        </div>
    );
};

export default NewCategoryAttribute;
