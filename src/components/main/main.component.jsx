import React, { useState } from "react";
import "./main.style.scss";
import { db } from "../../firebase-config";
import { getDoc, updateDoc, arrayUnion, arrayRemove, doc, increment } from "firebase/firestore";
import Details from "../details/details.component";

function Main({ user, setUser, id }) {
    const [money, setMoney] = useState(0);

    // Get users from firestore
    const getUser = async () => {
        const userRef = doc(db, "user", id);
        const userSnap = await getDoc(userRef);
        setUser(userSnap.data());
    };

    // Add cash
    const addCash = async (cash, userId) => {
        const usersRef = doc(db, "user", userId);

        if (cash.money < 1) {
            alert(`You can't ${cash.type} less than 1$`);
            return;
        }
        if (cash.type === "cash_out") {
            cash.money = -1 * cash.money;
        }

        await updateDoc(usersRef, {
            cash: arrayUnion(cash),
            balance: increment(cash.money),
        });
        setMoney(0);
        getUser();
    };

    // Remove cash
    const removeCash = async (cashObj, userId) => {
        const usersRef = doc(db, "user", userId);

        await updateDoc(usersRef, {
            cash: arrayRemove(cashObj),
        });

        getUser();
    };

    return (
        <div className="main">
            <Details money={money} setMoney={setMoney} user={user} id={id} addCash={addCash} removeCash={removeCash} />
        </div>
    );
}

export default Main;
