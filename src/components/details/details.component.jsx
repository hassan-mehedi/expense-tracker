import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./details.style.scss";

export default function Details({ user, addCash, removeCash, money, setMoney, id }) {
    const cashIn = {
        type: "cash_in",
        money: money,
        date: new Date(),
    };
    const cashOut = {
        type: "cash_out",
        money: money,
        date: new Date(),
    };

    // Sign Out
    const navigate = useNavigate();
    const goToLogInPage = () => {
        navigate("/login");
    };

    return (
        <div className="details">
            <div className="header">
                <h1>Balance: {user.balance}</h1>
                <button onClick={goToLogInPage}>Sign out</button>
            </div>
            <input
                className="amount"
                type="number"
                onChange={(event) => setMoney(event.target.value)}
                placeholder="Amount"
                value={money}
                onFocus={(event) => event.target.select()}
            />
            <button className="green" onClick={() => addCash(cashIn, id)}>
                Cash In
            </button>
            <button className="red" onClick={() => addCash(cashOut, id)}>
                Cash Out
            </button>
            <ul>
                <li className="header">
                    <p>Transaction</p>
                    <p>Amount</p>
                    <p>Date</p>
                    <p>Time</p>
                    <p>Action</p>
                </li>
                {user.cash &&
                    user.cash.map((cash, index) => (
                        <li key={index}>
                            <p>{cash.type.split("_").join(" ")}</p>
                            <p>{cash.money}</p>
                            <p>{new Date(cash.date.seconds * 1000 + cash.date.nanoseconds).toLocaleDateString()}</p>
                            <p>
                                {new Date(cash.date.seconds * 1000 + cash.date.nanoseconds)
                                    .toLocaleTimeString()
                                    .slice(0, 8)}
                            </p>
                            <button className="remove" onClick={(event) => removeCash(cash, id)}>
                                Remove
                            </button>
                        </li>
                    ))}
            </ul>
        </div>
    );
}
