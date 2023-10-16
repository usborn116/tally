import React from "react";

const Switcher = ({setter, data, children}) => {

    return (
        <button className="body-button" onClick={() => data ? setter(false) : setter(true)}>
            {children}
        </button>
    )

};

export default Switcher