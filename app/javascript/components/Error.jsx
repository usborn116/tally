import React from "react";
import { Button } from "./Button";
import { useRouteError, Link } from "react-router-dom";

export const Error = ({ message = null, setError = null }) => {
  
  const error = useRouteError()

    return (
        <div className="table error">
          <h1>ERROR!</h1>
          <h2>{message ? message : error?.data ?? 'Unexpected Error Occurred'}</h2>
            {setError ? 
            <Button handler={() => setError(() => false)}>Go Back</Button> : 
            <Link to='/'>Go Home</Link>
            }
        </div>
    )
};