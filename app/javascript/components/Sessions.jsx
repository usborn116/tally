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

    const list = data?.map((p) => (
        <div key={p.id} className="entry session-listing session-entry">
            <Link className='link' to={'sessions/' + p.id}>{new Date(p.date).toLocaleDateString('en-us', { timeZone: 'UTC', day:"numeric", year:"numeric", month:"short"})}</Link>
            <div className="game-details">{p.user?.name}</div>
            <div className="game-details">{p.victor || 'None Yet'}</div>
        </div>

    ))
    
    return (
        <div className="data session-details">
            <div className="row">
                <h2>Sessions</h2>
                <Form endpoint="sessions" item='session' updater={newData} setToggle={setter}>
                    <Input type="hidden" name="date" value={new Date().toDateString()}/>
                    <Input type="hidden" name="game_id" value={game_id}/>
                    <Input type="hidden" name="user_id" value={user?.id}/>
                    <Submit>+ New Session</Submit>
                </Form>
            </div>
            <div className="entry session-entry">
                <h3>Date</h3>
                <h3>Owner</h3>
                <h3>Winner</h3>
            </div>
            {list}
        </div>
    )

}