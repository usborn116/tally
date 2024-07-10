import React, { useState, useEffect } from "react";
import { Form } from "./Form";
import { Input } from "./Input";
import { Submit } from "./Submit";
import { logIn, signup, getData} from "./helpers/api_helpers";
import { Switcher } from "./Switcher";
import { useOutletContext, redirect, Navigate } from "react-router-dom";

export const Login = () => {

    const [user, setUser, loading, setLoading, error, setError] = useOutletContext()

    const [existing, setExisting] = useState(true)
    const [notLoggedIn, setNotLoggedIn] = useState(true)

    useEffect(() => {
        getData('user', setUser, setError)
    }, [notLoggedIn])

    if (user) return <Navigate to="/" replace /> 

    const form = existing ? 
        <div className="data" data-testid="login-box">
        <h1>Log In</h1>
            <Form endpoint="users/sign_in" item='login' updater={logIn} setToggle={setNotLoggedIn} setError={setError} >
                <Input type="email" name="email" placeHolder='email address'/>
                <Input type="password" name="password" placeHolder='password' />
                <Submit/>
            </Form>
        </div> : 
        <div className="data" data-testid="signup-box">
        <h1>Sign Up</h1>
            <Form endpoint="users" item='signup' updater={signup} setToggle={setNotLoggedIn} setError={setError} >
                <Input type="text" name="name" placeHolder='name'/>
                <Input type="email" name="email" placeHolder='email address'/>
                <Input type="password" name="password" placeHolder='password' />
                <Input type="password" name="password_confirmation" placeHolder='confirm password' />
                <Submit/>
            </Form>
        </div>

    return (
        <div className="data create-data">
        <Switcher setter={setExisting} data={existing}>{existing ? 'Sign Up' : 'Log In'}</Switcher>
        {form}
        </div>
    )
};