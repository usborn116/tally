import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { getData } from "./helpers/api_helpers";
import Form from "./Form";
import Submit from "./Submit";
import Input from "./Input";
import Switcher from "./Switcher";

export const Players = () => {

    const [data, setData] = useState([])
    const [create, setCreate] = useState(false)

    useEffect(() => {
        getData('/players', setData)
    }, [])

    const list = data.map(p => <div key={p.id}>{p.name}</div>)

    if (create) return (
        <>
        <Switcher setter={setCreate} data={create}/>
        <Form endpoint="games" item='game' setter={setData}>
                <Input type="text" name="name" placeHolder='Name' />
                <Submit/>
        </Form>
        </>
    )
    
    return (
        <>
            <h2>Your Players</h2>
            <Switcher setter={setCreate} data={create}/>
            {list}
        </>

    )

}