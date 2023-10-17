import React from "react";
import { useState, useEffect } from "react";
import { getData, newData } from "./helpers/api_helpers";
import { Link, useNavigate } from "react-router-dom"
import Form from "./Form";
import Input from "./Input";
import Submit from "./Submit";
import Switcher from "./Switcher";
import { Button } from "./Button";
import { useError } from "./helpers/useError";
import { Error } from "./Error";
import { useSetUser } from "./helpers/useSetUser";
import { GameListing } from "./GameListing";

export default Games = ({endpoint, homeError = null}) => {

    const navigate = useNavigate()

    const {user} = useSetUser()

    const {error, setError} = useError()

    const [data, setData] = useState([])
    const [create, setCreate] = useState(false)

    //if (!user && endpoint=='user_games') navigate('/login')

    useEffect(() => {
        getData(`/${endpoint}`, setData, homeError || setError)
    }, [create])
    
    const list = data.map((p) => (
        <GameListing key={p.id} data={p} endpoint={endpoint} />
        //<div key={p.name}>
        //    {endpoint == 'games' ? <div key={p.id}>{p.name}</div> : <Link to={`${p.id}`}>{p.name}</Link>}
        //</div>

    ))

    if (error) return (<Error message={error}/>)

    if (create) return (
        <>
        
        <Switcher setter={setCreate} data={create}>See Games</Switcher>
        <Form endpoint="games" item='game' updater={newData} setter={setData} setToggle={setCreate} setError={setError}>
                <Input type="text" name="name" placeHolder='Name' />
                <Input type="text" name="game_category" placeHolder='Game Category' />
                <Input type="text" name="image" placeHolder='Image URL' />
                <Input type="text" name="gameplay_length" placeHolder='Playtime Length (e.g. 30-45 minutes)' />
                <Input type="text" name="player_number" placeHolder='Player Number Range (e.g. 2-4 Players)' />
                <Input type="text" name="complexity" placeHolder='Complexity'/>
                <h2>Number of Categories</h2>
                <Input type="integer" name="category_count" placeHolder='Number of Categories'/>
                <Submit/>
        </Form>
        </>
    )
    
    return (
        <div className="data">
            <div className="top">
                <h2>{endpoint == 'user_games' ? 'My ' : 'All '}Games</h2>
                {endpoint == 'user_games' ? <Switcher setter={setCreate} data={create}>Add New Game</Switcher> : ''}
            </div>
            {list}
        </div>

    )

}