import React, {useState, useEffect} from "react";
import { Button } from "./Button";
import { useParams } from "react-router-dom";
import Form from "./Form";
import Input from "./Input";
import Submit from "./Submit";
import Switcher from "./Switcher";
import { newData, getData, updateData } from "./helpers/api_helpers";


export const Session = () => {
    const id = useParams().id

    const [data, setData] = useState([])
    const [numPlayers, setNumPlayers] = useState(0)
    const [create, setCreate] = useState(false)
    const [addPlayers, setAddPlayers] = useState(false)
    const [editDate, setEditDate] = useState(false)
    const [enterScores, setEnterScores] = useState(false)

    useEffect(() => {
        getData(`/sessions/${id}`, setData)
    }, [create, addPlayers, editDate])

    const add = [...Array(numPlayers)].map((x, i) => (
        <div key={i}>
            <div>Player {i + 1}</div>
            <Form endpoint="session_players" item='session_player' updater={newData} setter={setData} setToggle={setAddPlayers}>
                <Input type="select_text" name="name" options={data.players}/>
                <Input type="hidden" name="session_id" value={data?.session?.id} />
                <Submit>Save</Submit>
            </Form>
        </div>
    ))

    const handleChange = (e) => {
        setNumPlayers(Number(e.target.value));
      };

    const players = data?.session?.session_players?.map((player) => (
        <div key={player.id}>
            <div>{player?.name}</div>
        </div>
    ))

    const categories = data?.session?.session_categories?.map((c) => (
        <div key={c.id}>
            <div>{c?.name}</div>
        </div>
    ))
    
    const scores = data?.session?.session_scores?.map((score) => (
        <div key={score.id}>
            <div>{score?.session_player?.name}</div>
            <div>{score?.session_category?.name}</div>
            <div>{score?.amount}</div>
        </div>
    ))

    const add_scores = data?.session?.session_categories?.map((c) => (
        <div key={c.id}>
        <h4>{c.name} Scores</h4>
        {data?.session?.session_players?.map((p) => (
            <Form key={p.id} endpoint="session_scores" item='session_score' updater={newData} setter={setData}>
                <h4>{p.name}</h4>
                <Input type="number" name="amount"/>
                <Input type="hidden" name="session_id" value={data?.session?.id} />
                <Input type="hidden" name="session_category_id" value={c.id} />
                <Input type="hidden" name="session_player_id" value={p.id} />
                <Submit>Save</Submit>
            </Form>
        ))}
        </div>
    ))

    return (
        <>
            <Switcher setter={setCreate} data={create}>Add New Player</Switcher>
            {create ? 
            <Form endpoint="players" item='player' updater={newData} setter={setData} setToggle={setCreate}>
                <Input type="text" name="name" value={data.name}/>
                <Submit>Save</Submit>
            </Form> : ''}
            <Switcher setter={setAddPlayers} data={addPlayers}>Add Players to Game</Switcher>
            {addPlayers ?
            <>
            <h3>How many players are you adding?</h3>
            <input type="number" defaultValue={numPlayers} onChange={handleChange}></input>
            {add}
            </>
             : ''}
            <div>{data?.session?.game?.name}</div>
            <Switcher setter={setEditDate} data={editDate}>Change Date</Switcher>
            {editDate ? 
            <Form endpoint="sessions" item='session' id={data?.session?.id} updater={updateData} setter={setData} setToggle={setEditDate}>
                <Input type="date" name="date" value={data?.session?.date}/>
                <Submit>Save</Submit>
            </Form> :  <div>{data?.session?.date}</div>}
            <h3>Players</h3>
            {players}
            <h3>Categories</h3>
            {categories}
            <h3>Scores</h3>
            <Switcher setter={setEnterScores} data={enterScores}>Enter Scores</Switcher>
            { !enterScores ? <>{scores}</> : <>{add_scores}</>}
            <Button endpoint={`/session_winner/${data?.session?.id}`} setData={setData}>Calculate Score</Button>
            <div>Winner: {data?.session?.victor}</div>
        </>
        

    )

}