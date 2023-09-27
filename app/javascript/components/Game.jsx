import React, {useState, useEffect} from "react";
import { Button } from "./Button";
import { useParams, useLocation } from "react-router-dom";
import { Sessions } from "./Sessions";
import { getData } from "./helpers/api_helpers";
import Form from "./Form";
import Submit from "./Submit";
import Input from "./Input";


export const Game = ({user, usergames = true}) => {
    const id = useParams().id

    const [data, setData] = useState([])

    useEffect(() => {
        getData(`/user_game/${id}`, setData)
    }, [])

    return (
        <>
            <div>{data?.name}</div>
            <img src={data?.image}></img>
            <div>Category: {data?.game_category}</div>
            <div>Playtime: {data?.gameplay_length}</div>
            <div>Players Supported: {data?.player_number}</div>
            <div>Complexity: {data?.complexity}/5</div>
            {user ? <Button name='Session'/> : ''}
            {usergames && data?.sessions ? <Sessions data={data?.sessions} /> : ''}
        </>
        

    )

}