import React, {useEffect} from "react";
import { Link } from "react-router-dom";
import { Players } from "./Players";
import Games from "./Games";
import Logout from "./Logout";
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
                <Games user={user} homeError={setError} endpoint='games'/>
                {user ? <Players homeError={setError} /> : ''}
            </div>
        </div>
        

    )

}