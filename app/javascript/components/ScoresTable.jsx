import React from "react";
import { Form } from "./Form";
import { Input } from "./Input";
import { Submit } from "./Submit";

export const ScoresTable = ({data, players, totals, styling, enterScores, updateData, setData, setError, WIN_TYPE}) => {

    const scores = data?.session?.session_categories?.map((c) => ( 
        <div key={c.id} className="row" style={styling}>
            <div>{c?.name}</div>
            {c?.session_scores?.map((score) => !enterScores ? 
            (
                <div key={score.id}>
                    <div>{c.point_based ? score.amount : WIN_TYPE[score.win] }</div>
                </div> 
            ) : (
                <Form submitter={true} key={score.id} id={score.id} endpoint="session_scores" item='session_score' 
                    updater={updateData} setter={setData} setError={setError} className='row'>
                    {!c.point_based ? 
                        <div className="linked">
                            <div>Won?</div>
                            <Input type="checkbox" name="win" value={score.win}/> 
                        </div>
                        :
                        <Input type="number" name="amount" value={score.amount}/> 
                    }
                    
                    <Submit nobutton={true}>Save</Submit>
                </Form>
            )
            )}
        </div>
))

    return (
        <div className="table">
            <div className="headers" style={styling}>
                <div></div>
                {players?.map((p) => <div key={p.id}>{p.name}</div>)}
            </div>
            {scores}
            {totals}
        </div>
    )
}