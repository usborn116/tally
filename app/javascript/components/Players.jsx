import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { getData } from "./helpers/api_helpers";

export const Players = () => {

    const [data, setData] = useState([])

    useEffect(() => {
        getData('/players', setData)
    }, [])

    const list = data.map(p => <div key={p.id}>{p.name}</div>)
    
    return (
        <>
            <h2>Your Players</h2>
            {list}
        </>

    )

}