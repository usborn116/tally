import React from "react";
import { Link } from "react-router-dom";
import { Players } from "./Players";
import Games from "./Games";

export const Home = ({user}) => {

    return (
        <>
            <Link to={'/user'}>My User Details</Link>
            <h1>Welcome To Tally, {user ? user.name : 'friend'}!!!</h1>
            <Games user={user} endpoint='games'/>
            <Players />
        </>
        

    )

}