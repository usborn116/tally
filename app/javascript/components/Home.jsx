import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { getData } from "./helpers/api_helpers";
import { Players } from "./Players";

export const Home = ({user}) => {

    const [data, setData] = useState([])

    useEffect(() => {
        getData('/games', setData)
    }, [])

    const list = data.map(g => <div key={g.id}>{g.name}</div>)
    
    return (
        <>
            <Link to={'/user'}>My User Details</Link>
            <h1>Welcome To Tally, {user ? user.name : 'friend'}!!!</h1>
            <h2>Games in the database</h2>
            {list}
            <Players />
        </>
        

    )

}