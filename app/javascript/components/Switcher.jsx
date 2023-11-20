import React from "react";

export const Switcher = ({setter, data, children}) => {

    return (
        <button className="body-button" onClick={() => data ? setter(false) : setter(true)}>
            {children}
        </button>
    )

};