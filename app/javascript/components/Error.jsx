import React from "react";
import { Button } from "./Button";

export const Error = ({message = null, setError = null}) => {

    return (
        <div className="table">
          <h1>ERROR!</h1>
          <h3>{message}</h3>
          {setError ? 
          <Button handler={() => setError(() => false)}>Go Back</Button> : ''
          }
        </div>
    )
};