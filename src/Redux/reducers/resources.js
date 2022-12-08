
import axios from "axios";

export const getResources = () => {
    return (dispatch) => {
        dispatch({type: "LOADING_RESOURCES"})
        axios
            .get("https://127.0.0.1:8000/api/resources")
            .then(response => dispatch({type: "SUCCESS_RESOURCES", payload: response.data}))
            .catch(error => {
                console.log(error)
                dispatch({type: "FAILED"})
            })
    }
}

export const postResource = (resource, resourceAttributes) => {
    return (dispatch) => {
        console.log(resource, resourceAttributes)
        resource.author =
        axios
            .post("https://127.0.0.1:8000/api/resources", resource)
            .then(response => {
                resourceAttributes.forEach(resourceAttribute => {
                    resourceAttribute.resource = response.data
                    console.log(resourceAttribute)
                    dispatch(postResourceAttribute(resourceAttribute))
                    }
                )
                dispatch(getResources)
            })
            .catch(error => console.log(error))
    }
}

export const postResourceAttribute = (resourceAttribute) => {
    return (dispatch) => {
        console.log(resourceAttribute)
        axios
            .post("https://127.0.0.1:8000/api/resources_attributes", resourceAttribute)
            .then(response => {
                console.log(response.data)
                // dispatch({type:"POST_RESOURCE", payload: response.data})
            }
            )
            .catch(error => console.log(error))
    }
}



export const resourcesReducer = (resources= null, action) => {
    switch(action.type) {
        case "LOADING_RESOURCES":
            console.log("Chargement des ressources...")
            return resources
        case "SUCCESS_RESOURCES":
            return {
                data: action.payload
            }
        case "POST_RESOURCE":
            return {
                data: action.payload
            }
        case "FAILED":
            console.log("Erreur lors du chargement des ressources")
            return null
        default:
            return resources
    }
}