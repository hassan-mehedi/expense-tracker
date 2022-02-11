import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./signup.style.scss";
import { db } from "../../firebase-config";
import { addDoc, collection } from "firebase/firestore";

export default function Signup() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [balance, setBalance] = useState(0);

    const usersCollectionRef = collection(db, "user");
    const navigate = useNavigate();

    const createUser = async (name, email, password, balance) => {
        await addDoc(usersCollectionRef, {
            name: name,
            email: email,
            password: password,
            balance: Number(balance),
        });
    };

    const formHandler = (event) => {
        event.preventDefault();

        createUser(name, email, password, balance);

        setName("");
        setEmail("");
        setPassword("");
        setBalance(0);

        navigate("/login");
    };

    return (
        <div className="signup">
            <h1>Sign Up</h1>
            <form onSubmit={formHandler}>
                <input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Name"
                    value={name}
                    onInput={(event) => setName(event.target.value)}
                />
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
                <input
                    type="number"
                    name="balance"
                    id="balance"
                    placeholder="Your balance"
                    onInput={(event) => setBalance(event.target.value)}
                />
                <input type="submit" name="submit" id="submit" />
            </form>
        </div>
    );
}
