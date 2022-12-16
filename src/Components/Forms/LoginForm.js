import React from 'react';
import {UserContext} from "../../Contexts/UserContext";

const LoginForm = () => {

    const userContext = React.useContext(UserContext)

    const [credentials, setCredentials] = React.useState({
        username: "",
        password: ""
    })

    function handleChange(event) {
        event.preventDefault()
        const {value, name} = event.target
        setCredentials({
            ...credentials,
            [name] : value
        })
    }

    return (
        <form onSubmit={(event) => userContext.login(event, credentials)}>
            <input
                type="email"
                placeholder="email"
                onChange={handleChange}
                name="username"
            />
            <input
                type="password"
                placeholder="mot de passe"
                onChange={handleChange}
                name="password"
            />
            <button>Connexion</button>
        </form>
    );
};

export default LoginForm;




