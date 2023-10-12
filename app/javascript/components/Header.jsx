import React, {useState, useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";
import Logout from "./Logout";
import { Button } from "./Button";

const Header = ({setUser, user}) => {

    const navigate = useNavigate()
    const [home, setHome] = useState(false)

    return (
        <div className="nav">
            <div className="left-bar">
                <Link to="/" className="button">HOME</Link>
            </div>
            <div className="center-bar">
                <h1>Tally</h1>
            </div>
            <div className="right-bar">
                <Link to="/mygames" className="button">My Games</Link>
                <Link to="/user" className="button">Profile</Link>
                {user ? <Logout setUser={setUser}/> : <Link className="button" to={'/login'}>Log In</Link>}
            </div>
        </div>
    )

};

export default Header