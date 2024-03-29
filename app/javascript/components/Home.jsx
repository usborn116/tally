import React, {useEffect} from "react";
import { Players } from "./Players";
import { Games } from "./Games";
import { getUser } from "./helpers/api_helpers";
import { Error } from "./Error";

export const Home = ({user, setUser, loading, setLoading, setError, error}) => {

    useEffect(() => {
        setLoading(true)
        getUser(setUser, setError)
        setLoading(false)
    }, [loading])

    if (error) return (<Error message={error}/>)

    return (
        <div className="home">
            <h1>Welcome To Tally, {user?.name || 'friend'}!</h1>
            <div className="home-table">
                <Games homeError={setError} loading={loading} user={user} endpoint='games'/>
                
            </div>
        </div> 

    )
}