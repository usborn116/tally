import React, {useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { getData, logout } from "./helpers/api_helpers";

export const Logout = ({setUser, setLoading, logoutMessage, setError }) => {

    const navigate = useNavigate()
    
    useEffect(() => {
        setLoading(true)
        getData('user', setUser, setError)
        setLoading(false)
    }, [])

    const handleLogout = async (e) =>{
        e.preventDefault()
        await logout(setError)
        await getData('user', setUser, setError)
        await logoutMessage()
        navigate('/')
    }

    return <button data-testid='logout-button' className="button" onClick={handleLogout}>Log Out</button>

};