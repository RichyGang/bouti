import React from 'react';
import ThemeContext from "../../Contexts/ThemeContext";
import "./index.css"
import TestComponent from "../../tests/TestComponent";

const Home = () => {
    const {theme} = React.useContext(ThemeContext)
    return (
        <div className={`Home-${theme}`}>
            <h2>Home page</h2>
            <TestComponent>
                <p>C'est un test</p>
            </TestComponent>
        </div>
    );
};

export default Home;
