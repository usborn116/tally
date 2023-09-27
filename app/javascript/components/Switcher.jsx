import React from "react";

const Switcher = ({setter, data}) => {

    return (
        <button className="button" onClick={() => data ? setter(false) : setter(true)}>
            Create New
        </button>
    )

};

export default Switcher