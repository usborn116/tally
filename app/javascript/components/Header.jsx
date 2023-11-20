import React from "react";
import { Link } from "react-router-dom";
import { Logout } from "./Logout";

export const Header = ({setUser, user, setLoading}) => {

    return (
        <div className="nav">
            <div className="left-bar">
                <Link to="/" className="button">HOME</Link>
            </div>
            <div className="center-bar">
                <h1>Tally</h1>
            </div>
            <div className="right-bar">
                {user ? <Link to="/mygames" className="button">My Games</Link> : ''}
                {user ? <Link to="/user" className="button">Profile</Link> : ''}
                {user ? <Logout setUser={setUser} setLoading={setLoading}/> : <Link className="button" to={'/login'}>Log In</Link>}
            </div>
        </div>
    )

};