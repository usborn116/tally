import React, {useState, useEffect} from "react";
import { Button } from "./Button";
import { useParams, Navigate, useNavigate } from "react-router-dom";
import { Form } from "./Form";
import { Input } from "./Input";
import { Submit } from "./Submit";
import { Switcher } from "./Switcher";
import { newData, getData, updateData } from "./helpers/api_helpers";
import { useSetUser } from "./helpers/useSetUser";
import { useError } from "./helpers/useError";
import { Error } from "./Error";
import { ScoresTable } from "./ScoresTable";

export const Session = () => {

    const {error, setError} = useError()

    const {user} = useSetUser()

    const id = useParams().id

    const navigate = useNavigate()

    const [data, setData] = useState(null)
    const [numPlayers, setNumPlayers] = useState(0)
    const [create, setCreate] = useState(false)
    const [addPlayers, setAddPlayers] = useState(false)
    const [editDate, setEditDate] = useState(false)
    const [enterScores, setEnterScores] = useState(false)
    const [deletePlayer, setDeletePlayer] = useState(false)

    useEffect(() => {
        getData(`/sessions/${id}`, setData, setError)
    }, [create, addPlayers, editDate, enterScores, deletePlayer])

    const WIN_TYPE = {true: 'WON!', false: 'Not won'}
    const styling = {gridTemplateColumns: `repeat(${data?.session?.session_players?.length + 1}, ${100/(data?.session?.session_players?.length + 1)}%)`}

    

    const add_players = [...Array(numPlayers)].map((x, i) => (
        <div key={i}>
            <div>Player {i + 1}</div>
            <Form submitter={true} endpoint="session_players" item='session_player' updater={newData} setter={setData} setError={setError}>
                <Input type="select_text" name="name" options={data?.players ? data.players : [{name: 'foo'}, {name: 'bar'}]}/>
                <Input type="hidden" name="session_id" value={data?.session?.id} />
                <Submit nobutton={true}>Save</Submit>
            </Form>
        </div>
    ))

    const players = data?.session?.session_players?.map((player) => player)

    const totals = (
        <div className="row" style={styling}>
            <div>TOTALS</div>
            {data?.session?.session_players?.map((p) => (
                <div key={p.id} >{p.session_scores?.map(s => s.amount).reduce((a, v) => a + v)}</div>
            ))}
        </div>
    )

    const handleChange = (e) => setNumPlayers(() => Number(e.target.value));

    const handleCalculate = async (e) => {
        setEnterScores(true)
        e?.preventDefault()
        const response = await getData(`/session_winner/${data?.session?.id}`, setData, setError)
        setEnterScores(false)
        alert(response.message)
    };

    const deleteHandler = async (e) => {
        e.preventDefault()
        window.confirm('Are you sure you want to delete this session?')
        await fetch(`/sessions/${id}`, { method: 'delete'})
        navigate(-1)
    }

    const playerDelete = async (e, id) => {
        e.preventDefault()
        setDeletePlayer(true)
        window.confirm('Are you sure you want to delete this player')
        await fetch(`/session_players/${id}`, { method: 'delete'})
        handleCalculate()
        setDeletePlayer(false)
    }

    if (!user) return <h1>No Content Here!</h1>

    if (error) return <Error message={error}/>

    return (
        <div className="table">
            <div className="session-overview top-session">
                <div className="game-name">
                    <h2>{data?.session?.game?.name}</h2>
                    <Button handler={deleteHandler} classes={`delete-button`}>Delete Session&nbsp;<div className="x"> X </div></Button>
                </div>
                <div className="entry date-entry">
                    <h3>{editDate ? 
                        <Form endpoint="sessions" item='session' id={data?.session?.id} updater={updateData} 
                            setter={setData} setToggle={setEditDate} setError={setError}>
                            <Input type="date" name="date" value={data?.session?.date}/>
                            <Submit>Save Date</Submit>
                        </Form> :  data?.session?.date}
                    </h3>
                    <Switcher setter={setEditDate} data={editDate}>Change Date</Switcher>
                </div>
                <h3>Winner: {data?.session?.victor || 'None Yet'}</h3>
            </div>

            <div className="session-data">

                <div className="player-section game-details">
                    <h3>Players</h3>
                    {players?.map((p) => (
                        <div key={p.id} style={{display: 'flex', width: '100%'}}>
                            {p.name}&nbsp;
                            <Button handler={(e) => playerDelete(e, p.id)} classes={`delete-button`}><div className="x"> X </div></Button>
                        </div>
                        )
                    )}
                    <Switcher setter={setCreate} data={create}>{create ? 'Done Adding' : '+ Player to Account'}</Switcher>
                    {create ? 
                    <Form endpoint="players" item='player' updater={newData} setter={setData} setToggle={setCreate} setError={setError}>
                        <Input type="text" name="name" value=''/>
                        <Submit>Create New Player</Submit>
                    </Form> : ''}
                    <Switcher setter={setAddPlayers} data={addPlayers}>{addPlayers ? 'Done Adding' : '+ Player(s) to Game'}</Switcher>
                    {addPlayers ?
                    <div className="data">
                        <div># Players</div>
                        <input type="number" defaultValue={numPlayers} onChange={handleChange}></input>
                        {add_players}
                    </div>
                    : ''}
                </div>
                
                { addPlayers || create ? '' : 
                <div className="scores game-details">
                    <div className="game-data">
                        <h3>Scores</h3>
                        <Switcher setter={setEnterScores} data={enterScores}>Edit Scores</Switcher>
                    </div>
                    <ScoresTable players={players} totals={totals} data={data} styling={styling} enterScores={enterScores} 
                    updateData={updateData} setData={setData} setError={setError} WIN_TYPE={WIN_TYPE}/>
                    <Button setData={setData} handler={handleCalculate}>Calculate Scores!</Button>
                </div>
                }
            </div>
        </div>

    )
}