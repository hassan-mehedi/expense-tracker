import React, { useState } from "react";

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
    return (
        <div className="details">
            <input type="number" onChange={(event) => setMoney(event.target.value)} />
            <button onClick={() => addCash(cashIn, user.id)}>Cash In</button>
            <button onClick={() => addCash(cashOut, user.id)}>Cash Out</button>
            <h1>Name: {user.name}</h1>
            <ul>
                {user.cash &&
                    user.cash.map((cash, index) => (
                        <li key={index}>
                            <p>{cash.type}</p>
                            <p>{cash.money}</p>
                            <button onClick={(event) => removeCash(cash, user.id)}>Remove</button>
                        </li>
                    ))}
            </ul>
        </div>
    );
}
