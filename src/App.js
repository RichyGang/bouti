import './App.css';
import React from "react";
import {Routes, Route} from "react-router-dom";

import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
import Resources from "./Components/Resources";
import ShowResource from "./Components/Resources/ShowResource";
import Proposals from "./Components/Proposals";
import ShowProposal from "./Components/Proposals/ShowProposal";
import CategoryAdmin from "./Components/Admin/CategoryAdmin";
import Admin from "./Components/Admin";
import Matches from "./Components/Matchs";
import ShowMatch from "./Components/Matchs/ShowMatch";
import ThemeContext from "./Contexts/ThemeContext";
import {useDispatch} from "react-redux";
import {getCategories} from "./Redux/reducers/categories";
import {getUnits} from "./Redux/reducers/units";
import UnitsAdmin from "./Components/Admin/UnitsAdmin";
import NewResource from "./Components/Resources/NewResource";
import {UserContextProvider} from "./Contexts/UserContext";

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
            <UserContextProvider>
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
            </UserContextProvider>
        </ThemeContext.Provider>
);
}

export default App;
