import React from "react";

export const Button = ({name = null, children, handler = null, classes = null }) => {
    
    const classnames = `body-button ${classes}`

    return (
        <button className={classnames} onClick={handler || null}>{children ? children : `Create New ${name}`}</button>
    )

}