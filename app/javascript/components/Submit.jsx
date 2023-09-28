import React from "react";

const Submit = ({children}) => {

    return <input type="submit" className="button" value={children ? children : "Submit"}></input>

};

export default Submit