import React from "react";
import { useState, useEffect } from "react";
import { getData } from "./helpers/api_helpers";

export const Sessions = () => {

    const [data, setData] = useState([])

    useEffect(() => {
        getData('/players', setData)
    }, [])

    const list = data.map(p => <div key={p.id}>{p.date}</div>)
    
    return (
        <>
            <h2>Sessions</h2>
            {list}
        </>

    )

}