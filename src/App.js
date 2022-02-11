import React, { useState } from "react";
import { Route, Routes, BrowserRouter as Router, Navigate } from "react-router-dom";
import "./App.css";
import Main from "./components/main/main.component";
import Login from "./components/login/login.component";
import Signup from "./components/signup/signup.component";

function App() {
    const [user, setUser] = useState(null);
    const [id, setId] = useState(null);
    return (
        <div className="App">
            <Router>
                <Routes>
                    <Route
                        exact
                        path="/login"
                        element={<Login user={user} setUser={setUser} id={id} setId={setId} />}
                    ></Route>
                    <Route exact path="/" element={<Navigate replace to="/login" />}></Route>
                </Routes>
                <Routes>
                    <Route exact path="/signup" element={<Signup />}></Route>
                </Routes>
                <Routes>
                    <Route exact path="/main" element={<Main user={user} id={id} setUser={setUser} />}></Route>
                </Routes>
            </Router>
        </div>
    );
}

export default App;
