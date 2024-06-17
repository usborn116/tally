import React, {useEffect} from "react";
import { Navigate } from 'react-router-dom'
import { useSetUser } from "./helpers/useSetUser";
import { useOutletContext } from "react-router-dom";

export const User = () => {

    const [user, setUser, loading, setLoading, error, setError] = useOutletContext()

    return ( user && 
        <div className="data user-data">  
            <h1>Name: {user?.name}</h1>
            <h2>Email: {user?.email}</h2>
            <h2>Games Played: {[...new Set(user?.sessions?.map(s => s.game_id))].length}</h2>
            <h2>Sessions Played: {user?.sessions?.length + user?.shared_sessions?.length}</h2>
        </div>
    )
}