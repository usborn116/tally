import React, {useState, useEffect} from "react";
import { Button } from "./Button";
import { useParams } from "react-router-dom";
import { Sessions } from "./Sessions";
import { getData } from "./helpers/api_helpers";


export const Session = ({game}) => {
    const id = useParams().id

    const [data, setData] = useState([])

    useEffect(() => {
        getData(`/sessions/${id}`, setData)
    }, [])

    const scores = data?.session_scores?.map((score) => (
        <div key={score.id}>
            <div>{score?.session_player?.name}</div>
            <div>{score?.session_category?.name}</div>
            <div>{score?.amount}</div>
        </div>
    ))

    return (
        <>
            <div>{data?.game?.name}</div>
            <div>{data?.date}</div>
            <div>Scores</div>
            {scores}
            <div>Winner: {data?.victor}</div>
            <Button name='Session Player'/>
            <Button name='Score'/>
        </>
        

    )

}