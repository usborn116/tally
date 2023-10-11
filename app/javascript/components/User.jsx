import React from "react";
import { Button } from "./Button";
import { useNavigate } from 'react-router-dom'
import { useSetUser } from "./helpers/useSetUser";

export const User = () => {

    const navigate = useNavigate()
    const { user } = useSetUser()

    //if (!user) return <h1>Not Signed In</h1>
    return ( user && 
        <>  
            <Button handler={() => navigate(-1)}>Back</Button>
            <h1>{user.name}</h1>
            <h1>{user.email}</h1>
        </>
        

    )

}