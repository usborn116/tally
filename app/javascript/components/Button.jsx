import React from "react";

export const Button = ({name = null, children, handler = null }) => {

    return (
        <button className="body-button" onClick={handler || ''}>{children ? children : `Create New ${name}`}</button>
    )

}