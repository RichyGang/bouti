import {my_app} from "../../Axios/constants";
import {useSelector} from "react-redux";


export const getResourceAttributes = () => {
    return (dispatch) => {
        dispatch({type: "LOADING_RESOURCE_ATTRIBUTES"})
        my_app
            .get("/resource_attributes")
            .then(response => dispatch({type: "GET_ALL_RESOURCE_ATTRIBUTES", payload: response.data}))
            .catch(error => {
                console.log(error)
                dispatch({type: "FAILED"})
            })
    }
}

// resourceAttribute: {categoryAttributeId, resourceId, value}
export const postResourceAttribute = (resourceAttribute) => {
    // find resourceAttribute in all resourceAttributes
    // si trouve on ajoute la resource a l'array
    // sinon on ajoute lattribut avec sa resource

    return (dispatch) => {
        console.log(resourceAttribute)
        my_app
            .post("/resource_attributes", resourceAttribute)
            .then(response => {
                    console.log(response.data)
                    // dispatch({type:"POST_RESOURCE", payload: response.data})
                }
            )
            .catch(error => console.log(error))
    }
}

export const resourceAttributesReducer = (resourceAttributes = null, action) => {
    switch (action.type) {
        case "GET_ALL_RESOURCE_ATTRIBUTES":
            return {
                data: action.payload
            }
        case "POST_RESOURCE_ATTRIBUTE":
            console.log(action.payload)
            return {
                data: [...resourceAttributes.data, action.payload]
            }
        default:
            return resourceAttributes
    }
}