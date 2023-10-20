import React, {useState, useEffect} from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Sessions } from "./Sessions";
import { getData, updateData, newData } from "./helpers/api_helpers";
import Form from "./Form";
import Submit from "./Submit";
import Input from "./Input";
import Switcher from "./Switcher";
import Category from "./Category";
import { Button } from "./Button";
import { useError } from "./helpers/useError";
import { Error } from "./Error";
import { useSetUser } from "./helpers/useSetUser";

export const Game = () => {

    const { user } = useSetUser()

    const id = useParams().id

    const navigate = useNavigate()

    //if (!user) navigate('/login')

    const {error, setError} = useError()

    const [data, setData] = useState([])
    const [edit, setEdit] = useState(false)
    const [create, setCreate] = useState(false)
    const [newSession, setNewSession] = useState(false)

    useEffect(() => {
        getData(`/user_game/${id}`, setData, setError)
    }, [edit, create, newSession])

    const categorySection = data?.categories?.map(c => (
        <Category key={c.id} data={c} setData={setData} />
        )
    )

    const leaderboard = data?.results?.map(r => (
        <div className='entry' key={r.id}>
            <div>{r.player}</div>
            <div>{r.wins}</div>
        </div>
    ))

    if (error) return (<Error message={error}/>)

    if (edit) return (
        <div className="data">
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
            <div className="top-game">
                <div className="data game-details">
                    <h3>{data?.name}</h3>
                    <img src={data?.image}></img>
                    <div>Category: {data?.game_category}</div>
                    <div>Playtime: {data?.gameplay_length}</div>
                    <div>Players Supported: {data?.player_number}</div>
                    <div>Complexity: {data?.complexity}/5</div>
                    <Switcher setter={setEdit} data={edit}>Edit Game Details</Switcher>
                </div>
                <div className="data game-details">
                    <h3>Categories</h3>
                    {categorySection}
                    <Switcher setter={setCreate} data={create}>Add New Category</Switcher>
                    {create ? 
                    <div className="category-row">
                        <Form endpoint="categories" item='category' updater={newData} setter={setData} setToggle={setCreate}
                        style={{gridTemplateColumns: `repeat(4, 1fr)`}} className="row">
                            <Input type="text" name="name" value='Category Name'/>
                            <div className="linked">
                                <div>Points Based?</div>
                                <Input type="checkbox" name="point_based" />
                                <Input type="hidden" name="game_id" value={data?.id} />
                            </div>
                            <Submit>Save</Submit>
                        </Form> 
                    </div> : ''}
                </div>
                <div className="data game-details">
                <h3>Leaderboard</h3>
                    <div className="data">
                        {leaderboard}
                    </div>
                </div>
            </div>
            {data?.sessions ? <Sessions data={data?.sessions} game_id={data?.id} setter={setNewSession} /> : ''}
        </div>
        

    )

}