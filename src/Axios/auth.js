import {API_URL, my_app} from "./constants";

const refreshToken = () => {
    let currUser = JSON.parse(localStorage.getItem("my_app_user"))
    let getUserFormData = new FormData()

    getUserFormData.append("grant_type", "refresh_token")
    getUserFormData.append("refresh_token", currUser.refresh_token)

    return new Promise((resolve, reject) => {
        my_app
            .post(`${API_URL}/token/refresh`, getUserFormData)
            .then(async response => {
                resolve(response)
            })
            .catch(error => reject(error))
    })
}

export const getUser = () => {
    let currUser = JSON.parse(localStorage.getItem("my_app_user"))

    if (!currUser) {
        return Promise.resolve(null)
    }

    let currDate = new Date()
    let diff = currDate.getTime() - currUser.lastRefresh

    if (diff >= 3600000) {
        let getUserFormData = new FormData()

        getUserFormData.append("grant_type", "refresh_token")
        getUserFormData.append("refresh_token", currUser.refresh_token)

        return my_app
            .post(`${API_URL}/token/refresh`, getUserFormData)
            .then(response => {
                currUser.refresh_token = response.data.refresh_token
                currUser.token = response.data.token
                currUser.lastRefresh = new Date().getTime()
                localStorage.setItem("my_app_user", JSON.stringify(currUser))
                my_app.defaults.headers.common["Authorization"] = "Bearer" + currUser.token
                return my_app
                    .get("/me")
                    .then(response => console.log(response.data))
                    .catch(error => {
                        logout()
                        throw error
                })
            })
            .catch(error => {
                logout()
                console.log(error)
            })
    } else {
        my_app.defaults.headers.common["Authorization"] = "Bearer " + currUser.token
        my_app.interceptors.response.use(
            response => response,
            error => {
                if (error.response.status === 401) {
                    return refreshToken()
                        .then(response => {
                            currUser.token = response.data.token
                            currUser.token = response.data.token
                            currUser.lastRefresh = new Date().getTime()
                            localStorage.setItem("my_app_user", JSON.stringify(currUser))
                            my_app.defaults.headers.common["Authorization"] = "Bearer " + currUser.token

                            const config = error.config
                            config.headers.Authorization = "Bearer " + response.data.token

                            return new Promise((resolve, reject) => {
                                my_app
                                    .request(config)
                                    .then(response => {
                                        resolve(response)
                                    })
                                    .catch(error => reject(error))
                            })
                        })
                        .catch(error => {
                            Promise.reject(error)
                            logout()
                        })
                }
                logout()
                return new Promise((resolve, reject) => reject(error))
            })
        // console.log(my_app.defaults.headers.common["Authorization"])
        return my_app.get("/me").catch(error => {
            logout()
            console.log("ARR")
            throw error
        })
    }
}

export const logout = () => {
    localStorage.removeItem("my_app_user")
    return Promise.resolve()
}

export const login = (event, credentials) => {
    event.preventDefault()
    return new Promise((resolve, reject) => {
        my_app
            .post("/login", credentials)
            .then(response => {
                resolve(response)
                response.data.lastRefresh = new Date().getTime()
                localStorage.setItem("my_app_user", JSON.stringify(response.data))
            })
            .catch(error => reject(error))
    })
}

// function resetCurrUser(response) {
//     currUser.refresh_token = response.data.refresh_token
//     currUser.access_token = response.data.token
//     currUser.lastRefresh = new Date().getTime()
//     localStorage.setItem("my_app_user", JSON.stringify(currUser))
//     my_app.defaults.headers.common["Authorization"] = "Bearer" + currUser.access_token
// }

