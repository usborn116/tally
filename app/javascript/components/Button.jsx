import React from "react";

export const Button = ({name = null, children, handler = null, classes = null }) => {
    console.log('class!', classes)

    const classnames = `body-button ${classes}`

    return (
        <button className={classnames} onClick={handler || ''}>{children ? children : `Create New ${name}`}</button>
    )

}