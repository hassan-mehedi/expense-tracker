import React, { useState, useEffect } from "react";
import "./App.css";
import { db } from "./firebase-config";
import { collection, getDocs, updateDoc, arrayUnion, arrayRemove, doc } from "firebase/firestore";
import Details from "./components/details/details.component";

function App() {
    const [users, setUsers] = useState([]);
    const usersCollectionRef = collection(db, "user");

    // Get users from firestore
    const getUsers = async () => {
        const data = await getDocs(usersCollectionRef);
        setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    // Add cash
    const addCash = async (cash, userId) => {
        const usersRef = doc(db, "user", userId);

        await updateDoc(usersRef, {
            cash: arrayUnion(cash),
        });

        getUsers();
    };

    // Remove cash
    const removeCash = async (cashObj, userId) => {
        const usersRef = doc(db, "user", userId);

        await updateDoc(usersRef, {
            cash: arrayRemove(cashObj),
        });

        getUsers();
    };

    useEffect(() => {
        getUsers();
    }, []);

    return (
        <div className="App">
            {users.map((user) => {
                return <Details user={user} key={user.id} addCash={addCash} removeCash={removeCash} />;
            })}
        </div>
    );
}

export default App;
