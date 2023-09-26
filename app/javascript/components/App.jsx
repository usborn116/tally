import React from "react";
import RoutesIndex from "../routes/RoutesIndex";
import { useState, useEffect } from "react";
import { getUser } from "./helpers/api_helpers";

export default App = () => {

    const [user, setUser] = useState(null)
    const [error, setError] = useState(null)

    useEffect(() => {
        getUser(setUser)
    }, [])

    return (
        <>
            <RoutesIndex user={user} setUser={setUser} error={error} setError={setError}/>
        </>
    )
}
