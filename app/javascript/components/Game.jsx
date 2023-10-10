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

export const Game = () => {

    const id = useParams().id

    const navigate = useNavigate()

    if (!user) navigate('/login')

    const {error, setError} = useError()

    const [data, setData] = useState([])
    const [edit, setEdit] = useState(false)
    const [create, setCreate] = useState(false)
    const [newSession, setNewSession] = useState(false)

    console.log('error!!!', error)

    useEffect(() => {
        getData(`/user_game/${id}`, setData, setError)
    }, [edit, create, newSession])

    const categorySection = data?.categories?.map(c => (
        <Category key={c.id} data={c} setData={setData} />
        )
    )

    const leaderboard = data?.results?.map(r => (
        <div key={r.id}>{r.player} : {r.wins}</div>
    ))

    if (error) return (<Error message={error}/>)

    if (edit) return (
        <>
        <Switcher setter={setEdit} data={edit}>See Game Details</Switcher>
        <Form endpoint="games" item='game' id={data.id} updater={updateData} setter={setData} setToggle={setEdit} setError={setError}>
                <Input type="text" name="name" value={data?.name} />
                <Input type="text" name="game_category" value={data?.game_category}  />
                <Input type="text" name="image" value={data?.image}  />
                <Input type="text" name="gameplay_length" value={data?.gameplay_length}  />
                <Input type="text" name="player_number" value={data?.player_number}  />
                <Input type="text" name="complexity" value={data?.complexity} />
                <Submit />
        </Form>
        </>
    )

    return (
        <>
            <Button handler={() => navigate(-1)}>Back</Button>
            <Switcher setter={setEdit} data={edit}>Edit Game Details</Switcher>
            <div>{data?.name}</div>
            <img src={data?.image}></img>
            <div>Category: {data?.game_category}</div>
            <div>Playtime: {data?.gameplay_length}</div>
            <div>Players Supported: {data?.player_number}</div>
            <div>Complexity: {data?.complexity}/5</div>
            <h4>Categories</h4>
            {categorySection}
            <Switcher setter={setCreate} data={create}>Add New Category</Switcher>
            {create ? 
            <Form endpoint="categories" item='category' updater={newData} setter={setData} setToggle={setCreate}>
                <Input type="text" name="name" placeHolder='Category Name'/>
                <div>Points Based?</div>
                <Input type="checkbox" name="point_based" />
                <Input type="hidden" name="game_id" value={data?.id} />
                <Submit>Save</Submit>
            </Form> : ''}
            <h3>Win History</h3>
            <div className="table">
                {leaderboard}
            </div>
            {data?.sessions ? <Sessions data={data?.sessions} game_id={data?.id} setter={setNewSession} /> : ''}
        </>
        

    )

}