import React from "react";
import { useEffect } from "react";
import { newData } from "./helpers/api_helpers";
import { Link } from "react-router-dom"
import Form from "./Form";
import Input from "./Input";
import Submit from "./Submit";

export const Sessions = ({data, game_id, setter}) => {

    useEffect(() => {
        setter(() => true)
    }, [])

    const list = data.map((p) => (
        <div key={p.id}>
            <Link to={'/game_session/' + p.id}>{p.date} | Winner: {p.victor}</Link>
        </div>

    ))

    date = new Date().toDateString()
    
    return (
        <>
            <h2>Sessions</h2>
            <Form endpoint="sessions" item='session' updater={newData} setToggle={setter}>
                <Input type="hidden" name="date" value={date}/>
                <Input type="hidden" name="game_id" value={game_id}/>
                <Submit>Create New Session</Submit>
            </Form>
            {list}
        </>

    )

}