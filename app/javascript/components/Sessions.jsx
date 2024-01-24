import React from "react";
import { useEffect } from "react";
import { newData } from "./helpers/api_helpers";
import { Link } from "react-router-dom"
import { Form } from "./Form";
import { Input } from "./Input";
import { Submit } from "./Submit";

export const Sessions = ({data, user, game_id, setter}) => {

    useEffect(() => {
        setter(() => true)
    }, [data])

    console.log(data)

    const list = data?.map((p) => (
        <div key={p.id} className="entry session-listing">
            <Link className='link' to={'/sessions/' + p.id}>{new Date(p.date).toLocaleDateString('en-us', { day:"numeric", year:"numeric", month:"short"})}</Link>
            <div className="game-details">{p.victor}</div>
        </div>

    ))

    const date = new Date().toDateString()
    
    return (
        <div className="data session-details">
            <div className="row">
                <h2>Sessions</h2>
                <Form endpoint="sessions" item='session' updater={newData} setToggle={setter}>
                    <Input type="hidden" name="date" value={date}/>
                    <Input type="hidden" name="game_id" value={game_id}/>
                    <Input type="hidden" name="user_id" value={user?.id}/>
                    <Submit>+ New Session</Submit>
                </Form>
            </div>
            <div className="entry">
                <h3>Date</h3>
                <h3>Winner</h3>
            </div>
            {list}
        </div>

    )

}