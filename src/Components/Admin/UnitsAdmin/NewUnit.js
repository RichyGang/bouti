import React from "react";
import './index.css'
import {useDispatch} from "react-redux";
import {postUnit} from "../../../Redux/reducers/units";

const NewUnit = () => {

    const [newUnit, setNewUnit] = React.useState({name : ""})
    const [newUnitConversion, setNewUnitConversion] = React.useState({coefficient : 1, symbol : ""})

    const dispatch = useDispatch()

    function handleChange(event) {
        const {name, value} = event.target
        name === "reference_symbol" ?
            setNewUnitConversion({...newUnitConversion, symbol: value})
            :
            setNewUnit({...newUnit, name: value})
    }

    function handleSubmit(event) {
        event.preventDefault()
        dispatch(postUnit({unit: newUnit, unitConversion: newUnitConversion}))
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h4>Nouvelle unité</h4>
                <label htmlFor="name">Nom </label>
                <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="ex: masse"
                    value={newUnit.name}
                    onChange={handleChange}
                />
                <br/>
                <label htmlFor="reference_symbol">Symbole de référence </label>
                <input
                    id="reference_symbol"
                    name="reference_symbol"
                    type="text"
                    placeholder="ex: kg"
                    value={newUnitConversion.symbol}
                    onChange={handleChange}
                />
                <button>Ajouter</button>
            </form>
        </div>
    )
}

export default NewUnit