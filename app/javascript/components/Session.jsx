import React, {useState, useEffect} from "react";
import { Button } from "./Button";
import { useParams, useNavigate } from "react-router-dom";
import Form from "./Form";
import Input from "./Input";
import Submit from "./Submit";
import Switcher from "./Switcher";
import { newData, getData, updateData } from "./helpers/api_helpers";


export const Session = () => {

    const navigate = useNavigate()

    const id = useParams().id

    const [data, setData] = useState([])
    const [numPlayers, setNumPlayers] = useState(0)
    const [create, setCreate] = useState(false)
    const [addPlayers, setAddPlayers] = useState(false)
    const [editDate, setEditDate] = useState(false)
    const [enterScores, setEnterScores] = useState(false)

    useEffect(() => {
        getData(`/sessions/${id}`, setData)
    }, [create, addPlayers, editDate, enterScores])

    const add = [...Array(numPlayers)].map((x, i) => (
        <div key={i}>
            <div>Player {i + 1}</div>
            <Form submitter={true} endpoint="session_players" item='session_player' updater={newData} setter={setData}>
                <Input type="select_text" name="name" options={data.players}/>
                <Input type="hidden" name="session_id" value={data?.session?.id} />
                <Submit nobutton={true}>Save</Submit>
            </Form>
        </div>
    ))

    const handleChange = (e) => {
        setNumPlayers(Number(e.target.value));
    };

    const handleCalculate = async (e) => {
        setEnterScores(true)
        e.preventDefault()
        const response = await getData(`/session_winner/${data?.session?.id}`, setData)
        alert(response.message)
        setEnterScores(false)
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

    const scores2 = data?.session?.session_categories?.map((c) => (
        <div key={c.id} className="row" style={{gridTemplateColumns: `repeat(${data?.session?.session_players?.length + 1}, 1fr)`}}>
            <div>{c?.name}</div>
            {c?.session_scores?.map((score) => !enterScores ? 
            (
                <div key={score.id}>
                    <div>{score.amount}</div>
                </div> 
            ) : (
                <Form submitter={true} key={score.id} id={score.id} endpoint="session_scores" item='session_score' updater={updateData} setter={setData}>
                    <Input type="number" name="amount" value={score.amount}/>
                    <Submit nobutton={true}>Save</Submit>
                </Form>
            )
                
            )}
        </div>
    ))

    return (
        <>
            <Button handler={() => navigate(-1)}>Back</Button>
            <Switcher setter={setCreate} data={create}>{create ? 'Done Adding' : 'Add New Player'}</Switcher>
            {create ? 
            <Form endpoint="players" item='player' updater={newData} setter={setData} setToggle={setCreate}>
                <Input type="text" name="name" value={data.name}/>
                <Submit>Save</Submit>
            </Form> : ''}
            <Switcher setter={setAddPlayers} data={addPlayers}>{addPlayers ? 'Done Adding' : 'Add Player to Game'}</Switcher>
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
            <div className="table">
                <div className="headers" 
                    style={{gridTemplateColumns: `repeat(${data?.session?.session_players?.length + 1}, 1fr)`}}
                >
                    <div></div>
                    {data?.session?.session_players?.map(p => <div key={p.id}>{p.name}</div>)}
                </div>
            {scores2}
            </div>
            <Button endpoint={`/session_winner/${data?.session?.id}`} setData={setData} handler={handleCalculate}>Calculate Score</Button>
            <div>Winner: {data?.session?.victor}</div>
        </>
        

    )

}