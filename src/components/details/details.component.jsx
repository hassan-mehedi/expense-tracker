import React, { useState } from "react";
import "./details.style.scss";

export default function Details({ user, addCash, removeCash, money, setMoney }) {
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
    return (
        <div className="details">
            <h1>Balance: {user.balance}</h1>
            <input
                className="amount"
                type="number"
                onChange={(event) => setMoney(event.target.value)}
                placeholder="Amount"
                value={money}
            />
            <button className="green" onClick={() => addCash(cashIn, user.id)}>
                Cash In
            </button>
            <button className="red" onClick={() => addCash(cashOut, user.id)}>
                Cash Out
            </button>
            <ul>
                <li>
                    <p>Transaction</p>
                    <p>Amount</p>
                    <p>Date</p>
                    <p>Time</p>
                    <p>Action</p>
                </li>
                {user.cash &&
                    user.cash.map((cash, index) => (
                        <li key={index}>
                            <p>{cash.type}</p>
                            <p>{cash.money}</p>
                            <p>{new Date(cash.date.seconds * 1000 + cash.date.nanoseconds).toLocaleDateString()}</p>
                            <p>
                                {new Date(cash.date.seconds * 1000 + cash.date.nanoseconds)
                                    .toLocaleTimeString()
                                    .slice(0, 8)}
                            </p>
                            <button className="remove" onClick={(event) => removeCash(cash, user.id)}>
                                Remove
                            </button>
                        </li>
                    ))}
            </ul>
        </div>
    );
}
