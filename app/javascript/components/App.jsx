import React from "react";
import RoutesIndex from "../routes/RoutesIndex";
import { useState, useEffect } from "react";
import { getUser } from "./helpers/api_helpers";
import { useSetUser } from "./helpers/useSetUser";

export default App = () => {

    const {user, setUser, loading, setLoading, error, setError} = useSetUser()

    if (error) return <Error />

    return (
        <>
            <RoutesIndex user={user} setUser={setUser} error={error} setError={setError} setLoading={setLoading}/>
        </>
    )
}
