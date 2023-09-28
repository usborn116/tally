import React from "react";
import Player from "./Player";
import { useState, useEffect } from "react";
import { getData } from "./helpers/api_helpers";
import Form from "./Form";
import Submit from "./Submit";
import Input from "./Input";
import Switcher from "./Switcher";
import { newData } from "./helpers/api_helpers";

export const Players = () => {

    const [data, setData] = useState([])
    const [create, setCreate] = useState(false)

    useEffect(() => {
        getData('/players', setData)
    }, [create])

    const list = data.map(p => (
        <Player key={p.id} data={p} setData={setData}/>
        )
    )
    
    return (
        <>
            <h2>Your Players</h2>
            <Switcher setter={setCreate} data={create}>Add New Player</Switcher>
            {create ? 
            <Form endpoint="players" item='player' updater={newData} setter={setData} setToggle={setCreate}>
                <Input type="text" name="name" value={data.name}/>
                <Submit>Save</Submit>
            </Form> : ''}
            {list}
            
        </>

    )

}