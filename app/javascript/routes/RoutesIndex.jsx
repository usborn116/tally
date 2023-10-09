import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {Home} from "../components/Home";
import { User } from "../components/User";
import Games from "../components/Games";
import { Sessions } from "../components/Sessions";
import { Game } from "../components/Game";
import { Session } from "../components/Session";
import { Login } from "../components/Login";
import Logout from "../components/Logout";

export default RoutesIndex = ({user, setUser, error, setError, setLoading}) => {

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home user={user} setLoading={setLoading} setUser={setUser}/>} />
        <Route path="/user" element={<User user={user}/>} />
        <Route path="/mygames" element={<Games user={user} endpoint='user_games'/>} />
        <Route path="/mygames/:id" element={<Game />} />
        <Route path="/game_session/:id" element={<Session />} />
        <Route path="/login" element={<Login user={user} setUser={setUser}/>} />
        <Route path="/logout" element={<Logout setLoading={setLoading}/>} />
      </Routes>
    </Router>
  );
}

//</Routes><Route path="sessions" element={<Sessions user={user}/>} />
//</Route>
  