import React from "react";
import { useState, useEffect } from "react";
import { getData, newData } from "./helpers/api_helpers";
import { Navigate } from "react-router-dom"
import { Form } from "./Form";
import { Input } from "./Input";
import { Submit } from "./Submit";
import { Switcher } from "./Switcher";
import { useError } from "./helpers/useError";
import { Error } from "./Error";
import { useSetUser } from "./helpers/useSetUser";
import { GameListing } from "./GameListing";
import { SearchBar } from "./SearchBar";
import { ImageHelper } from "./ImageHelper";

export const Games = ({endpoint, loading, user, homeError = null}) => {

    const {error, setError} = useError()

    const [data, setData] = useState([])
    const [create, setCreate] = useState(false)
    const [search, setSearch] = useState(false)
    const [numCategories, setNumCategories] = useState(0)

    useEffect(() => {
        getData(`games${search ? `?name=${search}`: ''}`, setData, homeError || setError)
    }, [create, search, user, loading])

    const list = data?.map((p) => (
        <GameListing key={p.id} data={p} endpoint={endpoint} user={user} />
    ))

    const add_categories = [...Array(numCategories)].map((x, i) => {
        let namestr = `categories_attributes;${i};name`
        let pointsstr = `categories_attributes;${i};points`

        return (
        <div className="category-row" key={i}>
            <Input type="text" name={namestr} placeHolder={`Category ${i + 1}`}/>
            <div>Points?<Input type="checkbox" name={pointsstr} /></div>
            
        </div>
    )})

    if (create) return (
        <div className="data create-data">
        {error ? <Error message={error}/> : '' }
        <Switcher setter={setCreate} data={create}>See All Games</Switcher>
        <Form endpoint="games" item='game' updater={newData} setter={setData} setToggle={setCreate} setError={setError}>
                <Input type="text" name="name" placeHolder='Name' />
                <Input type="text" name="game_category" placeHolder='Game Category' />
                <Input type="text" name="image" placeHolder='Image URL' />    
                <Input type="text" name="gameplay_length" placeHolder='Playtime Length (e.g. 30-45 minutes)'/>
                <Input type="text" name="player_number" placeHolder='Player Number Range (e.g. 2-4 Players)' />
                <Input type="text" name="complexity" placeHolder='Complexity'/>
                <div style={{width: '100%'}}>
                <div style={{display: 'flex', justifyContent: 'space-between'}}># Categories</div>
                <input type="number" defaultValue={numCategories} 
                    onChange={(e) => setNumCategories(() => Number(e.target.value))}></input>
                </div>
                {add_categories}
                <Submit/>
        </Form>
        </div>
    )
    
    return (
        <div className="data">
            {error ? <Error message={error}/> : '' }
            { user ? 
            <SearchBar setSearch={setSearch} />
            : '' }

            <div className="top">
                <h2>{user ? '' : 'Top 5 '}Games</h2>
                {user ? <Switcher setter={setCreate} data={create}>Add New Game</Switcher> : ''}
            </div>
            {list.length > 0 ? list : <h3 style={{display: 'flex', flexDirection: 'column', 
                alignItems: 'center'}}>Can't find what you're looking for? 
                <Switcher setter={setCreate} data={create}>Create It</Switcher></h3>}

        </div>

    )

}