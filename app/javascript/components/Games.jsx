import React from "react";
import { useState, useEffect } from "react";
import { getData } from "./helpers/api_helpers";
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
    }, [])
    
    const list = data.map((p) => (
        <div key={p.name}>
            <Link to={`${p.id}`}>{p.name}</Link>
        </div>

    ))

    if (create) return (
        <>
        <Switcher setter={setCreate} data={create}/>
        <Form endpoint="games" item='game' setter={setData}>
                <Input type="text" name="name" placeHolder='Name' />
                <Input type="text" name="game_category" placeHolder='Game Category' />
                <Input type="text" name="image" placeHolder='Image URL' />
                <Input type="text" name="gameplay_length" placeHolder='Playtime Length (e.g. 30-45 minutes)' />
                <Input type="text" name="player_number" placeHolder='Player Number Range (e.g. 2-4 Players)' />
                <Input type="text" name="complexity" placeHolder='Complexity'/>
                <Submit/>
        </Form>
        <h2>Create a Category</h2>
        <NewCategory/>
        </>
    )

    
    
    return (
        <>
            <h2>{endpoint == 'user_games' ? 'My ' : ''}Games</h2>
            <Switcher setter={setCreate} data={create}/>
            <br></br>
            <br></br>
            {list}
            
        </>

    )

}