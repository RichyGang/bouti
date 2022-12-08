import axios from "axios";

export const getCategories = () => {
    return (dispatch) => {
        console.log("B")
        dispatch({type: "LOADING_CATEGORIES"})
        axios
            .get("https://127.0.0.1:8000/api/categories")
            .then(response=> dispatch({type: "SUCCESS_CATEGORIES", payload: response.data}))
            .catch(error => dispatch({type: "ERROR", payload: error}) )
    }
}

export const putCategoryAttribute = ({categoryAttribute, category}) => {
    return (dispatch) => {
        const oldCategoryAttributes = category.categoryAttributes.map((attribute)=> "/api/category_attributes/" + attribute.id)
        axios
            .put("https://127.0.0.1:8000/api/categories/" + category.id, {
                categoryAttributes : [...oldCategoryAttributes, "/api/category_attributes/" + categoryAttribute.id]
            })
            .then(response => dispatch({type: "PUT_CATEGORY_ATTRIBUTE", payload: response.data}))
            .catch(error => console.log(error))
    }
}

export const removeCategoryAttribute = ({categoryAttribute, category}) => {
    return (dispatch) => {
        const newCategoryAttributes = category.categoryAttributes.filter((attribute)=> attribute.id !== categoryAttribute.id).map((attribute)=> "/api/category_attributes/" + attribute.id)
        axios
            .put("https://127.0.0.1:8000/api/categories/" + category.id, {
                categoryAttributes : newCategoryAttributes
            })
            .then(response => dispatch({type: "REMOVE_CATEGORY_ATTRIBUTE", payload: response.data}))
            .catch(error => console.log(error))
    }
}

export const categoriesReducer = (categories = null, action) => {
    switch (action.type) {
        case "LOADING_CATEGORIES":
            console.log("Loading...")
            return null
        case "SUCCESS_CATEGORIES":
            return {
                data: action.payload
            }
        case "PUT_CATEGORY_ATTRIBUTE":
            return {
                ...categories,
                data: [...categories.data.filter(category => category.id !== action.payload.id), action.payload]
            }
        case "REMOVE_CATEGORY_ATTRIBUTE":
            return {
                ...categories,
                data: [...categories.data.filter(category => category.id !== action.payload.id), action.payload]
            }
        default:
            return categories
    }
}