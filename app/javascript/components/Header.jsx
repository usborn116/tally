import React from "react";
import { Link } from "react-router-dom";
import { Logout } from "./Logout";
import { useState } from "react";

export const Header = ({setUser, user, setLoading, setError}) => {

    const [loggedOut, setLoggedOut] = useState(false)

    const logoutMessage = async () => {
        setLoading(() => true)
        setLoggedOut(() => true)
        await setTimeout(() => setLoggedOut(() => false), 900)
        setLoading(() => false)
    }

    return (
        <div className="nav">
            { loggedOut ? 
            <>
            <div></div>
            <div className="center-bar">
                <h1>Logged Out!</h1>
            </div> 
            <div></div>
            </>
            
            :
            <>
            <div className="left-bar">
                <Link to="/" className="button">HOME</Link>
            </div>
            <div className="center-bar">
                <h1>Tally</h1>
            </div>
            <div className="right-bar">
                {user ? <Link to="/players" className="button">My Players</Link> : ''}
                {user ? <Link to="/user" className="button">Profile</Link> : ''}
                {user ? <Logout setUser={setUser} user={user} setLoading={setLoading}
                            logoutMessage={logoutMessage} setError={setError} /> :
                            <Link className="button" to={'/login'}>Log In</Link>}
            </div> 
            </>
            }
        </div>
    )

};