import React, {useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { getUser, logout } from "./helpers/api_helpers";
import { useError } from "./helpers/useError";

export const Logout = ({setUser, setLoading, handler = null }) => {

    const navigate = useNavigate()

    const {error, setError} = useError()
    
    useEffect(() => {
        setLoading(true)
        getUser(setUser)
        setLoading(false)
    }, [])

    const handleLogout = async (e) =>{
        e.preventDefault()
        setLoading(true)
        await logout(setError)
        await getUser(setUser)
        setLoading(false)
        alert(`Logged Out!`)
        navigate('/')
    }

    if (error) return <Error />

    return <button data-testid='logout-button' className="button" onClick={handler ? handler : handleLogout}>Log Out</button>

};