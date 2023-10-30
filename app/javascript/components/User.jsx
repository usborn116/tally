import React, {useEffect} from "react";
import { Button } from "./Button";
import { useNavigate, Navigate } from 'react-router-dom'
import { useSetUser } from "./helpers/useSetUser";

export const User = () => {

    const navigate = useNavigate()
    const { user, loading, setLoading } = useSetUser()

    useEffect(() => {
        setLoading(true)
        setLoading(false)
    }, [loading])

    console.log(user)

    if (!user){
        return <Navigate to="/" replace />;
    }

    return ( user && 
        <div className="data user-data">  
            <h1>Name: {user?.name}</h1>
            <h2>Email: {user?.email}</h2>
            <h2>Total Games: {user?.games?.length}</h2>
            <h2>Total Sessions Played: {user?.games?.map(g => g?.sessions?.length).reduce((a, v) => a + v)}</h2>
        </div>
        

    )

}