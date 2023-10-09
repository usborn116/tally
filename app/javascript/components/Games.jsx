import React from "react";
import { useState, useEffect } from "react";
import { getData, newData } from "./helpers/api_helpers";
import { Link, useNavigate } from "react-router-dom"
import Form from "./Form";
import Input from "./Input";
import Submit from "./Submit";
import Switcher from "./Switcher";
import { Button } from "./Button";

export default Games = ({endpoint}) => {

    const [data, setData] = useState([])
    const [create, setCreate] = useState(false)

    const navigate = useNavigate()

    useEffect(() => {
        getData(`/${endpoint}`, setData)
    }, [create])
    
    const list = data.map((p) => (
        <div key={p.name}>
            {endpoint == 'games' ? <div key={p.id}>{p.name}</div> : <Link to={`${p.id}`}>{p.name}</Link>}
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
            <Button handler={() => navigate(-1)}>Back</Button>
            <h2>{endpoint == 'user_games' ? 'My ' : 'All '}Games</h2>
            <Switcher setter={setCreate} data={create}>Add New Game</Switcher>
            <br></br>
            <br></br>
            {list}
            
        </>

    )

}