import axios from "axios";

export const getUnits = () => {
    return (dispatch) => {
        axios
            .get("https://127.0.0.1:8000/api/units")
            .then(response => dispatch({type: "GET_UNITS", payload: response.data}))
            .catch(error => console.log(error))
    }
}

export const postUnit = ({unit, unitConversion}) => {
    return (dispatch) => {
        axios
            .post("https://127.0.0.1:8000/api/units", unit)
            .then(response => {
                dispatch({type: "POST_UNIT", payload: response.data})
                dispatch(postUnitConversion({unitConversion, unit: response.data}))
            })
            .catch(error => console.log(error))
    }
}

export const postUnitConversion = ({unitConversion, unit}) => {
    unitConversion = {...unitConversion, unit: "/api/units/" + unit.id}
    console.log(unitConversion)
    return (dispatch) => {
        axios
            .post("https://127.0.0.1:8000/api/unit_conversions", unitConversion)
            .then(response => response && dispatch(getUnits()))
            .catch(error => console.log(error))
    }
}

export const unitsReducer = (units = null, action) => {
    switch (action.type) {
        case "GET_UNITS":
            console.log(action.payload)
            return {
                data: action.payload
            }
        case "POST_UNIT":
            console.log(action.payload)
            return {
                ...units,
                data: [...units.data, action.payload]
            }
        default:
            return units
    }
}