import React from "react";
import { Button } from "./Button";
import { useNavigate } from 'react-router-dom'

export const User = ({user}) => {

    const navigate = useNavigate()

    if (!user) return <h1>Not Signed In</h1>
    return (
        <>
            <Button handler={() => navigate(-1)}>Back</Button>
            <h1>{user.name}</h1>
            <h1>{user.email}</h1>
        </>
        

    )

}