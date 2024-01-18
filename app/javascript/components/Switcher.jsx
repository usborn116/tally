import React from "react";

export const Switcher = ({setter, data, children}) => {

    return (
        <button className="body-button green-button" onClick={() => data ? setter(false) : setter(true)}>
            {children}
        </button>
    )

};