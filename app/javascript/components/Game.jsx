import React from "react";
import { Button } from "./Button";

export const Game = ({data, user}) => {

    return (
        <>
            <div>{data.name}</div>
            <img src={data?.image}></img>
            <div>Category: {data.game_category}</div>
            <div>Playtime: {data.gameplay_length}</div>
            <div>Players Supported: {data.player_number}</div>
            <div>Complexity: {data.complexity}/5</div>
            {user ? <Button name='Session'/> : ''}
        </>
        

    )

}