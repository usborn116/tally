import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {Home} from "../components/Home";
import { User } from "../components/User";

export default RoutesIndex = ({user, setUser, error, setError}) => {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home user={user}/>} />
        <Route path="/user" element={<User user={user}/>} />
      </Routes>
    </Router>
  );
}
  