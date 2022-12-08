import axios from "axios";

export const getAllCategoryAttributes = () => {
    return (dispatch) => {
        axios
            .get("https://127.0.0.1:8000/api/category_attributes")
            .then(response => dispatch({type:"GET_ALL_CATEGORY_ATTRIBUTES", payload: response.data}))
            .catch(error => console.log(error))
    }
}

export const postCategoryAttribute = (categoryAttribute) => {
    return (dispatch) => {
        console.log(categoryAttribute)
        axios
            .post("https://127.0.0.1:8000/api/category_attributes", categoryAttribute)
            .then(response => dispatch({type:"POST_CATEGORY_ATTRIBUTE", payload: response.data}))
            .catch(error => console.log(error))
    }
}


export const categoryAttributesReducer = (categoryAttributes = null, action) => {
    switch (action.type) {
        case "GET_ALL_CATEGORY_ATTRIBUTES":
            return {
                data: action.payload
            }
        case "POST_CATEGORY_ATTRIBUTE":
            console.log(action.payload)
            return {
                data: [...categoryAttributes.data, action.payload]
            }
        default:
            return categoryAttributes
    }
}