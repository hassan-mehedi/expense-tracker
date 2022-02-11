import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.style.scss";
import { db } from "../../firebase-config";
import { collection, query, where, getDocs } from "firebase/firestore";

export default function Login({ user, setUser, id, setId }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const findUser = async (email, password) => {
        // Query User from firestore
        const q = query(collection(db, "user"), where("email", "==", email));
        const querySnapshot = await getDocs(q);
        if (querySnapshot.size > 0) {
            querySnapshot.forEach((doc) => {
                const data = doc.data();
                if (data.password === password) {
                    setUser(doc.data());
                    setId(doc.id);
                    navigate("/main");
                } else {
                    alert("Wrong Password! Try again.");
                }
            });
        } else {
            alert("User not found");
        }
    };

    const goToSignUpPage = () => {
        navigate("/signup");
    };

    const formHandler = (event) => {
        event.preventDefault();

        // Validation
        if (email === "" || password === "") {
            alert("Please fill in all fields");
        }

        // Find User
        findUser(email, password);

        // Set fields to empty
        setEmail("");
        setPassword("");
    };
    return (
        <div className="login">
            <h1>Log in</h1>
            <form onSubmit={formHandler}>
                <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Email"
                    value={email}
                    onInput={(event) => setEmail(event.target.value)}
                />
                <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Password"
                    value={password}
                    onInput={(event) => setPassword(event.target.value)}
                />
                <input type="submit" name="submit" id="submit" />
            </form>
            <div className="signup-link">
                <p>Don't have an account?</p>
                <button onClick={goToSignUpPage}>Sign Up</button>
            </div>
        </div>
    );
}
