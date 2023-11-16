import React from "react";
import { useState, useEffect } from "react";
import { getData, newData } from "./helpers/api_helpers";
import { Navigate } from "react-router-dom"
import Form from "./Form";
import Input from "./Input";
import Submit from "./Submit";
import Switcher from "./Switcher";
import { useError } from "./helpers/useError";
import { Error } from "./Error";
import { useSetUser } from "./helpers/useSetUser";
import { GameListing } from "./GameListing";
import SearchBar from "./SearchBar";

export default Games = ({endpoint, homeError = null}) => {

    const {user} = useSetUser()

    const {error, setError} = useError()

    const [data, setData] = useState([])
    const [create, setCreate] = useState(false)
    const [search, setSearch] = useState(false)

    useEffect(() => {
        getData(`/${endpoint}${search ? `?name=${search}`: ''}`, setData, homeError || setError)
    }, [create, search])
    
    const list = data.map((p) => (
        <GameListing key={p.id} data={p} endpoint={endpoint} />
    ))

    if (!user && endpoint=='user_games'){
        return <Navigate to="/" replace />;
    }

    if (error) return (<Error message={error}/>)

    if (create) return (
        <div className="data create-data">
        <Switcher setter={setCreate} data={create}>See All Games</Switcher>
        <Form endpoint="games" item='game' updater={newData} setter={setData} setToggle={setCreate} setError={setError}>
                <Input type="text" name="name" placeHolder='Name' />
                <Input type="text" name="game_category" placeHolder='Game Category' />
                <Input type="text" name="image" placeHolder='Image URL' />
                <Input type="text" name="gameplay_length" placeHolder='Playtime Length (e.g. 30-45 minutes)'/>
                <Input type="text" name="player_number" placeHolder='Player Number Range (e.g. 2-4 Players)' />
                <Input type="text" name="complexity" placeHolder='Complexity'/>
                <Input type="integer" name="category_count" placeHolder='Number of Categories'/>
                <Submit/>
        </Form>
        </div>
    )
    
    return (
        <div className="data">
            { endpoint == 'user_games' ? 
            <SearchBar setSearch={setSearch} />
            : '' }

            <div className="top">
                <h2>{endpoint == 'user_games' ? 'My ' : 'All '}Games</h2>
                {endpoint == 'user_games' ? <Switcher setter={setCreate} data={create}>Add New Game</Switcher> : ''}
            </div>
            {list}

        </div>

    )

}