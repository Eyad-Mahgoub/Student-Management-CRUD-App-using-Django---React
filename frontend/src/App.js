import React from "react";
import Navigation from "./components/Navigation";
import Home from "./components/home";
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Students from "./components/Student";
import Manage from "./components/Manage";

function App() {
    return (
        <BrowserRouter>
            <Navigation />
            <Routes>
                <Route exact="true" path="/" element={<Home />} />
                <Route path="/students" element={<Students />} />
                <Route path="/manage" element={<Manage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;