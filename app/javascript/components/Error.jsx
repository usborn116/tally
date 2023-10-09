import React from "react";

export const Error = ({message = 'Unknown Error!'}) => {
    return (
        <div className="table">
          <h1>ERROR!</h1>
          <h3>{message}</h3>
        </div>
          )
};