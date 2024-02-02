import React, {useEffect} from "react";
import { Navigate } from 'react-router-dom'
import { useSetUser } from "./helpers/useSetUser";

export const User = () => {

    const { user, loading, setLoading } = useSetUser()

    useEffect(() => {
        setLoading(true)
        setLoading(false)
    }, [loading])

    if (!user){ <Navigate to="/" replace /> }

    return ( user && 
        <div className="data user-data">  
            <h1>Name: {user?.name}</h1>
            <h2>Email: {user?.email}</h2>
            <h2>Games Played: {[...new Set(user?.sessions?.map(s => s.game_id))].length}</h2>
            <h2>Sessions Played: {user?.sessions?.length + user?.shared_sessions?.length}</h2>
        </div>
    )
}