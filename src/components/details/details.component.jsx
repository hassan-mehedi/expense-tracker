import React, { useState } from "react";
import "./details.style.scss";

export default function Details({ user, addCash, removeCash }) {
    const [money, setMoney] = useState(0);

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
    console.log(user);
    return (
        <div className="details">
            <h1>Name: {user.name}</h1>
            <input type="number" onChange={(event) => setMoney(event.target.value)} value={money} />
            <button onClick={() => addCash(cashIn, user.id)}>Cash In</button>
            <button onClick={() => addCash(cashOut, user.id)}>Cash Out</button>
            <ul>
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
                            <button onClick={(event) => removeCash(cash, user.id)}>Remove</button>
                        </li>
                    ))}
            </ul>
        </div>
    );
}
