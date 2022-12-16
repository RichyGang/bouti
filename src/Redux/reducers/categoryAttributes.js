import {my_app} from "../../Axios/constants";
import {getCategories} from "./categories";

export const getAllCategoryAttributes = () => {
    return (dispatch) => {
        my_app
            .get("/category_attributes")
            .then(response => dispatch({type:"GET_ALL_CATEGORY_ATTRIBUTES", payload: response.data}))
            .catch(error => console.log(error))
    }
}

export const postCategoryAttribute = (categoryAttribute) => {
    return (dispatch) => {
        console.log(categoryAttribute)
        my_app
            .post("/category_attributes", categoryAttribute)
            .then(response => dispatch({type:"POST_CATEGORY_ATTRIBUTE", payload: response.data}))
            .catch(error => console.log(error))
    }
}

export const putCategoryAttribute = (categoryAttribute, categoryChildren) => {
    const categories = [...categoryChildren.map(category => `/api/categories/${category.id}`), ...categoryAttribute.categories]
    return (dispatch) => {
        my_app
            .put("/category_attributes/" + categoryAttribute.id, {categories})
            .then(response => {
                dispatch(getCategories())
                dispatch({type:"PUT_CATEGORY_ATTRIBUTE", payload: response.data})
            })
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
            return {
                data: [...categoryAttributes.data, action.payload]
            }
        case "PUT_CATEGORY_ATTRIBUTE":
            return {
                ...categoryAttributes,
                data: [...categoryAttributes.data.filter(ca => ca.id !== action.payload.id), action.payload]
            }
        default:
            return categoryAttributes
    }
}