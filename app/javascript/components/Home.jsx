import React, {useEffect} from "react";
import { Link } from "react-router-dom";
import { Players } from "./Players";
import Games from "./Games";
import Logout from "./Logout";
import { getUser } from "./helpers/api_helpers";

export const Home = ({user, setUser, setLoading}) => {

    useEffect(() => {
        setLoading(true)
        getUser(setUser)
        setLoading(false)
    }, [])

    return (
        <>
            {user ? <Link to={'/user'}>My User Details</Link> : ''}
            {user ? <Link to={'/mygames'}>My Games</Link> : ''}
            {user ? <Logout setLoading={setLoading}/> : <Link to={'/login'}>Log In</Link>}
            <h1>Welcome To Tally, {user?.name || 'friend'}!!!</h1>
            <Games user={user} endpoint='games'/>
            {user ? <Players /> : ''}
        </>
        

    )

}