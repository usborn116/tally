import React from "react";
import { Link } from "react-router-dom";
import { getData } from "./helpers/api_helpers";

export const Button = ({name = null, endpoint, children, handler, setData = null}) => {

    return (
        <>
            <button onClick={endpoint ? handler : ''}>{children ? children : `Create New ${name}`}</button>
        </>
        

    )

}