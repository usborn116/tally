import React from "react";
import { RoutesIndex } from "../routes/RoutesIndex";
import { useSetUser } from "./helpers/useSetUser";
import { useEffect } from "react";

export const App = () => {

    const {user, setUser, loading, setLoading, error, setError} = useSetUser()

    return (
        <div className="main">
            <RoutesIndex user={user} setUser={setUser} loading={loading} error={error} setError={setError} setLoading={setLoading}/>
        </div>
    )
}
