import React from "react";
import { Player } from "./Player";
import { useState, useEffect } from "react";
import { getData } from "./helpers/api_helpers";
import { Form } from "./Form";
import { Submit } from "./Submit";
import { Input } from "./Input";
import { Switcher } from "./Switcher";
import { newData } from "./helpers/api_helpers";
import { useOutletContext, Navigate } from "react-router-dom";

export const Players = () => {

    const [user, setUser, loading, setLoading, error, setError] = useOutletContext()
    const [data, setData] = useState([])
    const [create, setCreate] = useState(false)

    useEffect(() => {
        getData('players', setData, setError)
    }, [create])

    const list = Array.isArray(data) ? data.map(p => (
        <Player key={p.id} data={p} setData={setData} setError={setError} />
        )) : null

    return (
        user && <div className="data players">
            <h2>Your Players</h2>
            <Switcher setter={setCreate} data={create}>{create ? 'Never mind!' : 'Add New Player'}</Switcher>
            {create &&
            <Form endpoint="players" item='player' updater={newData} setter={setData} setToggle={setCreate} setError={setError}>
                <Input type="text" name="name" value={data.name}/>
                <Submit>Save</Submit>
            </Form> }
            {list}
            </div>
    )
}