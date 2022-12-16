import {my_app} from "../../Axios/constants";

export const postMedia = ({file, object}) => {
    let formData = new FormData()
    formData.append("file", file)
    formData.append(object.class, object.IRI)
    console.log(formData)
    // return new Promise((resolve, reject) => {
        my_app
            .post("/media_objects", formData)
            .then(response => {
                // resolve(response)
                console.log(response)
            })
            .catch(error=> console.log(error))
    // })
}