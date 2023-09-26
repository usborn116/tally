import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { getData } from "./helpers/api_helpers";

export const User = ({user}) => {

    if (!user) return <h1>Not Signed In</h1>
    return (
        <>
            <h1>{user.name}</h1>
            <h1>{user.email}</h1>
        </>
        

    )

}