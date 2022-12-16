import React from 'react';

import {logout, getUser, login} from '../Axios/auth'

const UserContext = React.createContext(undefined)

const UserContextProvider = (props) => {

    const [user, setUser] = React.useState()
    const [fetched, setFetched] = React.useState(false)

    const logoutContext = async () => {
        setUser(null)
        await logout()
    }

    const loginContext = (event, credentials) => {
        login(event, credentials).then(()=>
            getUserContext().then(() => setFetched(true))
        )
    }

    console.log(user)

    const getUserContext = async () => {
        console.log("CP")
        const user = await getUser()
        setUser(user ? user.data : null)
    }

    if (!fetched) {
        getUserContext().then(() => setFetched(true))
    }

    if (!fetched) {
        return <>CHARGEMENT...</>
    }

    return (
        <UserContext.Provider value={{
                user,
                login: loginContext,
                logout: logoutContext,
                getUser: getUserContext,
                setUser
        }}>
            {props.children}
        </UserContext.Provider>
    )
}

export {UserContextProvider, UserContext}
