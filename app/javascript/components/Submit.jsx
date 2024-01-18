import React from "react";

export const Submit = ({children, nobutton = false}) => {

    if (nobutton) return <></>

    return <input type="submit" className="submit body-button green-button" value={children ? children : "Submit"}></input>
};