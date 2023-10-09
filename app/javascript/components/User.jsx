import React from "react";

export const User = ({user}) => {

    if (!user) return <h1>Not Signed In</h1>
    return (
        <>
            <h1>{user.name}</h1>
            <h1>{user.email}</h1>
        </>
        

    )

}