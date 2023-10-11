import React, {useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { getUser } from "./helpers/api_helpers";
import { useError } from "./helpers/useError";

const Logout = ({setUser = null, setLoading, loading}) => {

    const {error} = useError()
    
    useEffect(() => {
        setLoading(true)
        getUser(setUser)
        setLoading(false)
    }, [])

    const navigate = useNavigate();

    const logout = async (setError)=>{
        try{
            await fetch(`/users/sign_out`, {
                method: 'delete',
                headers: {
                    "content-type": 'application/json',
                    "accept": "application/json",
                },
            }) 
        } catch (error){
            console.log('error!', error)
            setError({message: 'Error logging out!'})
        }
    }

    const handleClick = async (e) =>{
        e.preventDefault()
        setLoading(true)
        await logout()
        await getUser(setUser)
        setLoading(false)
        alert(`Logged Out!`)
    }

    if (error) return <Error />

    return <button className="button" onClick={handleClick}>Log Out</button>

};

export default Logout