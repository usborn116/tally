import React from "react";
import { Link } from "react-router-dom";

export const Button = ({name, endpoint, children}) => {

    return (
        <>
            {children? <button>{children}</button> : <button>Create New {name}</button>}
        </>
        

    )

}