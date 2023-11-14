import React from "react";

const Submit = ({children, nobutton = false}) => {

    if (nobutton) return <></>

    return <input type="submit" className="submit body-button" value={children ? children : "Submit"}></input>
};

export default Submit