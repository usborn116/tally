import React, {useState, useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";
import { Sessions } from "./Sessions";
import { getData, updateData, newData } from "./helpers/api_helpers";
import Form from "./Form";
import Submit from "./Submit";
import Input from "./Input";
import Switcher from "./Switcher";
import Category from "./Category";
import { Button } from "./Button";
import { useError } from "./helpers/useError";
import { Error } from "./Error";
import { useSetUser } from "./helpers/useSetUser";

export const GameListing = ({data, endpoint = null}) => {

    return (
        <div className="game-data">
            <img src={data?.image}></img>
            <div className="listing">
            <h3>{endpoint == 'games' ? data?.name : <Link to={`${data.id}`}>{data?.name}</Link>}</h3>
            <div>Category: {data?.game_category}</div>
            <div>Playtime: {data?.gameplay_length}</div>
            <div># Players: {data?.player_number}</div>
            <div>Complexity: {data?.complexity}/5</div>
            <div>{endpoint != 'games' ? `Times Played: ${data?.sessions.length}` : ''}</div>
            </div>
        </div>
        

    )

}