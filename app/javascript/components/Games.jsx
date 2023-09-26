import React from "react";
import { useState, useEffect } from "react";
import { getData } from "./helpers/api_helpers";
import { Button } from "./Button";
import { Game } from "./Game";

export default Games = ({user}) => {

    const [data, setData] = useState([])

    useEffect(() => {
        getData('/games', setData)
    }, [])

    const list = data.map(p => <div key={p.id}><Game user={user} data={p}/></div>)
    
    return (
        <>
            <h2>Your Games</h2>
            <Button name='Game'/>
            <br></br>
            <br></br>
            {list}
            
        </>

    )

}