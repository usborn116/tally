import React from "react";
import { Link } from "react-router-dom";

export const GameListing = ({data, user}) => {

    return (
        <div className="game-data">
            <img src={data?.image}></img>
            <div className="listing">
                <h3>{user ? <Link to={`/games/${data.id}`}>{data?.name}</Link> : data?.name}</h3>
                <div>Category: {data?.game_category}</div>
                <div>Playtime: {data?.gameplay_length}</div>
                <div># Players: {data?.player_number}</div>
                <div>Complexity: {data?.complexity}/5</div>
                <div>Last Played: {data?.sessions?.length > 0 ? 
                    new Date(data?.sessions[0].date).toLocaleDateString('en-us', 
                        { day:"numeric", year:"numeric", month:"short"}) : 'N/A'}
                </div>
                <div>{`Total Times Played: ${data?.sessions?.length}`}</div>
                { user ? 
                <div>{`Times You've Played: ${user?.sessions?.filter(s => s.game_id == data?.id).length + user?.shared_sessions?.filter(s => s.game_id == data?.id).length}`}</div>
                : ''}
            </div>
        </div>
        

    )

}