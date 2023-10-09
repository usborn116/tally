import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { getUser } from "./helpers/api_helpers";

const Logout = ({setError = null, setUser = null, setLoading}) => {

    const [notLoggedOut, setNotLoggedOut] = useState(true)

    const navigate = useNavigate();

    const logout = async (errorSetter)=>{
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
            //errorSetter('Error!')
        }
    }

    const handleClick = async (e) =>{
        e.preventDefault()
        await logout()
        await getUser(setUser)
        setLoading(true)
        alert(`Logged Out!`)
        setLoading(false)
        navigate('/')
    }

    return <button className="button" onClick={handleClick}>Log Out</button>

};

export default Logout