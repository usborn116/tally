import React from "react";
import RoutesIndex from "../routes/RoutesIndex";
import { useSetUser } from "./helpers/useSetUser";

export default App = () => {

    const {user, setUser, loading, setLoading, error, setError} = useSetUser()

    return (
        <>
            <RoutesIndex user={user} setUser={setUser} loading={loading} error={error} setError={setError} setLoading={setLoading}/>
        </>
    )
}
