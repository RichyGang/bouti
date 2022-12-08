import './App.css';
import React from "react";
import {Routes, Route} from "react-router-dom";

import Navbar from "./Navbar";
import Home from "./Home";
import Resources from "./Resources";
import ShowResource from "./Resources/ShowResource";
import Proposals from "./Proposals";
import ShowProposal from "./Proposals/ShowProposal";
import CategoryAdmin from "./Admin/CategoryAdmin";
import Admin from "./Admin";
import Matches from "./Matchs";
import ShowMatch from "./Matchs/ShowMatch";
import ThemeContext from "./Context/ThemeContext";
import {useDispatch} from "react-redux";
import {getCategories} from "./Redux/reducers/categories";
import {getUnits} from "./Redux/reducers/units";
import UnitsAdmin from "./Admin/UnitsAdmin";
import NewResource from "./Resources/NewResource";

function App() {
    console.log("0")
    const dispatch = useDispatch()

    React.useEffect(()=>{
        dispatch(getCategories())
        dispatch(getUnits())
    }, [])

    const [theme, setTheme] = React.useState("light")

    const toggleTheme = () => {
        setTheme(theme === "light" ? "dark" : "light")
    }

    return (
        <ThemeContext.Provider value={{theme, toggleTheme}}>
            <div className={`App-${theme}`}>
                <Navbar/>
                <Routes>
                    <Route exact path="/" element={<Home/>}/>
                    <Route path="/resources" element={<Resources/>}/>
                    <Route path="/resources/:resourceId" element={<ShowResource/>}/>
                    <Route path="/resources/new" element={<NewResource/>}/>
                    <Route path="/proposals" element={<Proposals/>}>
                        <Route path=":proposalId" element={<ShowProposal/>}/>
                    </Route>
                    <Route path="/matches" element={<Matches/>}>
                        <Route path=":matchId" element={<ShowMatch/>}/>
                    </Route>
                    <Route path="/admin" element={<Admin/>}>
                        <Route path="categories" element={<CategoryAdmin/>}/>
                        <Route path="units" element={<UnitsAdmin/>}/>
                    </Route>
                </Routes>
                <footer>
                    <p className="footer">Gang Gang Compagnie. All rights reserved.</p>
                </footer>
            </div>
        </ThemeContext.Provider>
);
}

export default App;
