import React from "react";
import { useState, useEffect } from "react";
import { getData } from "./helpers/api_helpers";
import { Link } from "react-router-dom"
import Form from "./Form";
import Input from "./Input";
import Submit from "./Submit";
import Switcher from "./Switcher";

export const Sessions = ({data}) => {

    const [create, setCreate] = useState(false)

    const list = data.map((p) => (
        <div key={p.id}>
            <Link to={'/game_session/' + p.id}>{p.date} | Winner: {p.victor}</Link>
        </div>

    ))

    date = new Date().toDateString()

    if (create) return (
        <>
        <Switcher setter={setCreate} data={create}/>
        <Form endpoint="sessions" item='session'>
                <h2>Day of Session: {date}</h2>
                <Input type="hidden" name="date" value={date}/>
                <Submit/>
        </Form>
        </>
    )
    
    return (
        <>
            <h2>Sessions</h2>
            <Switcher setter={setCreate} data={create}/>
            {list}
        </>

    )

}