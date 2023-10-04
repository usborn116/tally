import React from "react";

const Submit = ({children, nobutton = null}) => {

    if (nobutton) return <></>

    return (
        <input type="submit" className="button" value={children ? children : "Submit"}></input>
    )

};

export default Submit