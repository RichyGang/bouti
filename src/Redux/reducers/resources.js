
import axios from "axios";
import {my_app} from "../../Axios/constants";
import {postMedia} from "./medias";
import {postResourceAttribute} from "./resourceAttributes";

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
    const resourceMedias = resource.medias
    // console.log(resourceMedias)
    resource.medias = []
    return (dispatch) => {
        my_app
            .post("/resources", resource)
            .then(response => {
                resourceAttributes.forEach(
                    resourceAttribute => {
                        resourceAttribute.resources = [`/api/resources/${response.data.id}`]
                        console.log(resourceAttribute)
                        dispatch(postResourceAttribute(resourceAttribute))
                    })
                // dispatch(getResources)
                postMedia({file: resourceMedias[0], object: {class: "resource", IRI:`/api/resources/${response.data.id}`}})
            })
            .catch(error => console.log(error))
        // my_app
        //     .post("/resources", resource)
        //     .then(response => {
        //         resourceAttributes.forEach(resourceAttribute => {
        //             resourceAttribute.resource = response.data
        //             console.log(resourceAttribute)
        //             dispatch(postResourceAttribute(resourceAttribute))
        //             }
        //         )
        //         dispatch(getResources)
        //     })
        //     .catch(error => console.log(error))
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