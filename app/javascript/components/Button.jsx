import React from "react";
import { Link } from "react-router-dom";
import { getData } from "./helpers/api_helpers";

export const Button = ({name = null, endpoint, children, setData = null}) => {

    const clickHandler = async () => {
        const result = await getData(`${endpoint}`, setData)
        alert(result.message)
    }

    return (
        <>
            <button onClick={endpoint ? clickHandler : ''}>{children ? children : `Create New ${name}`}</button>
        </>
        

    )

}