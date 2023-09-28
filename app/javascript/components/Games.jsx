import React from "react";
import { useState, useEffect } from "react";
import { getData, newData } from "./helpers/api_helpers";
import { Button } from "./Button";
import { Link } from "react-router-dom"
import Form from "./Form";
import Input from "./Input";
import Submit from "./Submit";
import Switcher from "./Switcher";
import NewCategory from "./NewCategory";

export default Games = ({user, endpoint}) => {

    const [data, setData] = useState([])
    const [create, setCreate] = useState(false)

    useEffect(() => {
        getData(`/${endpoint}`, setData)
    }, [create])
    
    const list = data.map((p) => (
        <div key={p.name}>
            <Link to={`${p.id}`}>{p.name}</Link>
        </div>

    ))

    if (create) return (
        <>
        <Switcher setter={setCreate} data={create}>See Games</Switcher>
        <Form endpoint="games" item='game' updater={newData} setter={setData} setToggle={setCreate}>
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
        <>
            <h2>{endpoint == 'user_games' ? 'My ' : ''}Games</h2>
            <Switcher setter={setCreate} data={create}>Add New Game</Switcher>
            <br></br>
            <br></br>
            {list}
            
        </>

    )

}