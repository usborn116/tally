import React, {useState, useEffect} from "react";
import { Button } from "./Button";
import { useParams, useNavigate, Navigate } from "react-router-dom";
import Form from "./Form";
import Input from "./Input";
import Submit from "./Submit";
import Switcher from "./Switcher";
import { newData, getData, updateData } from "./helpers/api_helpers";
import { useSetUser } from "./helpers/useSetUser";
import { useError } from "./helpers/useError";
import { Error } from "./Error";


export const Session = () => {

    const {error, setError} = useError()

    const {user} = useSetUser()

    const id = useParams().id

    const [data, setData] = useState([])
    const [numPlayers, setNumPlayers] = useState(0)
    const [create, setCreate] = useState(false)
    const [addPlayers, setAddPlayers] = useState(false)
    const [editDate, setEditDate] = useState(false)
    const [enterScores, setEnterScores] = useState(false)

    useEffect(() => {
        getData(`/sessions/${id}`, setData, setError)
    }, [create, addPlayers, editDate, enterScores])

    const handleChange = (e) => setNumPlayers(Number(e.target.value));

    const handleCalculate = async (e) => {
        setEnterScores(true)
        e.preventDefault()
        const response = await getData(`/session_winner/${data?.session?.id}`, setData, setError)
        alert(response.message)
        setEnterScores(false)
    };

    const add = [...Array(numPlayers)].map((x, i) => (
        <div key={i}>
            <div>Player {i + 1}</div>
            <Form submitter={true} endpoint="session_players" item='session_player' updater={newData} setter={setData} setError={setError}>
                <Input type="select_text" name="name" options={data.players}/>
                <Input type="hidden" name="session_id" value={data?.session?.id} />
                <Submit nobutton={true}>Save</Submit>
            </Form>
        </div>
    ))

    const players = data?.session?.session_players?.map((player) => <div key={player.id}>{player?.name}</div>)

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
                <Form submitter={true} key={score.id} id={score.id} endpoint="session_scores" item='session_score' 
                    updater={updateData} setter={setData} setError={setError}>
                    <Input type="number" name="amount" value={score.amount}/>
                    <Submit nobutton={true}>Save</Submit>
                </Form>
            )
                
            )}
        </div>
    ))

    const totals = (
        <div className="row" style={{gridTemplateColumns: `repeat(${data?.session?.session_players?.length + 1}, 1fr)`}}>
            <div>TOTALS</div>
            {data?.session?.session_players?.map((p) => (
                <div key={p.id} >{p.session_scores?.map(s => s.amount).reduce((a, v) => a + v)}</div>
            ))}
        </div>
    )

    if (!user){
        return <Navigate to="/" replace />;
    }

    if (error) return <Error message={error}/>

    return (
        <div className="table">
            <div className="top-session">
                <h2>{data?.session?.game?.name}</h2>
                <div className="entry date-entry">
                    <h3>{editDate ? 
                        <Form endpoint="sessions" item='session' id={data?.session?.id} updater={updateData} 
                            setter={setData} setToggle={setEditDate} setError={setError}>
                            <Input type="date" name="date" value={data?.session?.date}/>
                            <Submit>Save</Submit>
                        </Form> :  data?.session?.date}
                    </h3>
                    <Switcher setter={setEditDate} data={editDate}>Change Date</Switcher>
                </div>
                <h3>Winner: {data?.session?.victor || 'None Yet'}</h3>
            </div>

            <div className="session-data">

                <div className="player-section game-details">
                    <h3>Players</h3>
                    {players}
                    <Switcher setter={setCreate} data={create}>{create ? 'Done Adding' : '+ Player to Account'}</Switcher>
                    {create ? 
                    <Form endpoint="players" item='player' updater={newData} setter={setData} setToggle={setCreate} setError={setError}>
                        <Input type="text" name="name" value={data.name}/>
                        <Submit >Save</Submit>
                    </Form> : ''}
                    <Switcher setter={setAddPlayers} data={addPlayers}>{addPlayers ? 'Done Adding' : '+ Player(s) to Game'}</Switcher>
                    {addPlayers ?
                    <div className="data">
                        <div># Players</div>
                        <input type="number" defaultValue={numPlayers} onChange={handleChange}></input>
                        {add}
                    </div>
                    : ''}
                </div>
                { addPlayers || create ? '' : 
                <div className="scores game-details">
                    <div className="game-data">
                        <h3>Scores</h3>
                        <Switcher setter={setEnterScores} data={enterScores}>+ Scores</Switcher>
                    </div>
                    <div className="table">
                        <div className="headers" 
                            style={{gridTemplateColumns: `repeat(${data?.session?.session_players?.length + 1}, 1fr)`}}
                        >
                            <div></div>
                            {players}
                        </div>
                    {scores2}
                    {totals}
                    </div>
                    <Button endpoint={`/session_winner/${data?.session?.id}`} setData={setData} handler={handleCalculate}>Calculate Score</Button>
                </div>
                }

            </div>
        </div>
        

    )

}