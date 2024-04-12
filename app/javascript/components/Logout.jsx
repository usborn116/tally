import React, {useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { getUser, logout } from "./helpers/api_helpers";
import { useError } from "./helpers/useError";

export const Logout = ({setUser, setLoading, logoutMessage }) => {

    const navigate = useNavigate()

    const {error, setError} = useError()
    
    useEffect(() => {
        setLoading(true)
        getUser(setUser, setError)
        setLoading(false)
    }, [])

    const handleLogout = async (e) =>{
        e.preventDefault()
        await logout(setError)
        await getUser(setUser, setError)
        await logoutMessage()
        navigate('/')
    }

    if (error) return <Error />

    return <button data-testid='logout-button' className="button" onClick={handleLogout}>Log Out</button>

};