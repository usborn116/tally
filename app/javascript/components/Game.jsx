import React, {useState, useEffect} from "react";
import { useParams, Navigate } from "react-router-dom";
import { Sessions } from "./Sessions";
import { getData, updateData, newData } from "./helpers/api_helpers";
import { Form } from "./Form";
import { Submit } from "./Submit";
import { Input } from "./Input";
import { Switcher } from "./Switcher";
import { Category } from "./Category";
import { useError } from "./helpers/useError";
import { Error } from "./Error";

export const Game = () => {

    const id = useParams().id

    const {error, setError} = useError()
    const [data, setData] = useState([])
    const [user, setUser] = useState({ name: false})
    const [edit, setEdit] = useState(false)
    const [create, setCreate] = useState(false)
    const [newSession, setNewSession] = useState(false)

    useEffect(() => {
        getData(`games/${id}`, setData, setError,
            ['categories', 'sessions', 'session_shares', 'results']
        )
    }, [edit, create, newSession])

    useEffect(() => {
        getData('user', setUser, setError)
    }, [edit, create, newSession])

    const categorySection = data?.categories?.map(c => <Category key={c.id} data={c} setData={setData} setError={setError}/>)

    const leaderboard = data?.results?.map((r, i) => r.player ?
        (<div key={`${r.player}${r.wins}`} className='entry leader-board' >
            <div>{r.player}</div>
            <div>{r.wins}</div>
        </div>)
        : (<div key={i}></div>)
    )

    const sessionsAssociatedWithUser = data?.sessions?.filter(
            session => session.user_id == user.id ||
            session.session_shares?.map(share => share.collaborator_id).includes(user.id)
    )

    if (!user){
        return <h1>Nothing Here!</h1>
    }

    if (edit) return (
        <div className="data edit-game-form">
        {error && <Error message={error}/> }
        <Switcher setter={setEdit} data={edit}>See Game Details</Switcher>
        <Form endpoint="games" item='game' id={data.id} updater={updateData} setter={setData} setToggle={setEdit} setError={setError}>
                <Input type="text" name="name" value={data?.name} placeHolder='Name' />
                <Input type="text" name="game_category" value={data?.game_category} placeHolder='Category' />
                <Input type="text" name="image" value={data?.image} placeHolder='Image URL' />
                <Input type="text" name="gameplay_length" value={data?.gameplay_length} placeHolder='Gameplay Length' />
                <Input type="text" name="player_number" value={data?.player_number} placeHolder='# Of Players' />
                <Input type="text" name="complexity" value={data?.complexity} placeHolder='Complexity'/>
                <Submit />
        </Form>
        </div>
    )

    return (
        <div className="table game-table">
            {error ? <Error message={error}/> : ''}
            {data && <div className="top-game">

                <div className="data game-details">
                    <h3>{data?.name}</h3>
                    <img src={data?.image}></img>
                    <div>Category: {data?.game_category}</div>
                    <div>Playtime: {data?.gameplay_length}</div>
                    <div>Players Supported: {data?.player_number}</div>
                    <div>Complexity: {data?.complexity}/5</div>
                    <div>Last Played: {data?.sessions?.length > 0 ? 
                        new Date(data?.sessions[0].date).toLocaleDateString('en-us', 
                        { day:"numeric", year:"numeric", month:"short"}) : 'N/A'}
                    </div>
                    <div>Times Played: {data?.sessions?.length}</div>
                    <Switcher setter={setEdit} data={edit}>Edit Game Details</Switcher>
                </div>

                <div className="game-categories data game-details">
                    <h3>Categories</h3>
                    {categorySection}
                    <Switcher setter={setCreate} data={create}>Add New Category</Switcher>
                    {create && 
                    <div className="category-row">
                        <Form endpoint="categories" item='category' updater={newData} setter={setData} setToggle={setCreate}
                        style={{gridTemplateColumns: `repeat(4, 1fr)`}} className="row">
                            <Input type="text" name="name" placeHolder='Category Name'/>
                            <div className="linked">
                                <div>Points Based?</div>
                                <Input type="checkbox" name="point_based" />
                                <Input type="hidden" name="game_id" value={data?.id} />
                            </div>
                            <Submit>Save</Submit>
                        </Form> 
                    </div> }
                </div>

                <div className="game-leaderboard data game-details">
                    <h3>Leaderboard</h3>
                    <div className="data">
                    <div className='entry leader-board'>
                        <h4 className="title">Player</h4>
                        <h4 className="title">Wins</h4>
                    </div>
                        {data?.results?.length > 0 ? leaderboard : <div key={1}></div>}
                    </div>
                </div>

            </div>}

            {sessionsAssociatedWithUser && <Sessions data={sessionsAssociatedWithUser} user={user} game_id={data?.id} setter={setNewSession} />}
        </div>

    )
}