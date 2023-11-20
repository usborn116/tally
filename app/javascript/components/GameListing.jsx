import React from "react";
import { Link } from "react-router-dom";

export const GameListing = ({data, endpoint = null}) => {

    return (
        <div className="game-data">
            <img src={data?.image}></img>
            <div className="listing">
                <h3>{endpoint == 'games' ? data?.name : <Link to={`${data.id}`}>{data?.name}</Link>}</h3>
                <div>Category: {data?.game_category}</div>
                <div>Playtime: {data?.gameplay_length}</div>
                <div># Players: {data?.player_number}</div>
                <div>Complexity: {data?.complexity}/5</div>
                <div>{endpoint != 'games' ? `Times Played: ${data?.sessions?.length}` : ''}</div>
            </div>
        </div>
        

    )

}