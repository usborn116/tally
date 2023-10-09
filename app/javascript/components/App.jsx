import React from "react";
import RoutesIndex from "../routes/RoutesIndex";
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
