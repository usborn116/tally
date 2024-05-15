import React, { useState, useEffect } from "react";
import { Form } from "./Form";
import { Input } from "./Input";
import { Submit } from "./Submit";
import { logIn, signup, getData} from "./helpers/api_helpers";
import { Switcher } from "./Switcher";
import {useNavigate} from 'react-router-dom'
import { useError } from "./helpers/useError";
import { Error } from "./Error";

export const Login = ({setUser}) => {

    const navigate = useNavigate()

    const [existing, setExisting] = useState(true)
    const [notLoggedIn, setNotLoggedIn] = useState(true)

    const {error, setError} = useError()

    useEffect(() => {
        async () => {
            const response = await getData('get_user', setUser, setError)
            response ? navigate('/') : ''
        }
    }, [notLoggedIn])

    if (!notLoggedIn){
        navigate('/')
    }

    if (error) {
        navigate('/login')
        return <Error message={error} setError={setError}/>
        
    }

    const form = existing ? 
        <div className="data" data-testid="login-box">
        <h1>Log In</h1>
            <Form endpoint="users/sign_in" item='login' updater={logIn} setter={setUser} setToggle={setNotLoggedIn} setError={setError} navigate={navigate} >
                <Input type="email" name="email" placeHolder='email address'/>
                <Input type="password" name="password" placeHolder='password' />
                <Submit/>
            </Form>
        </div> : 
        <div className="data" data-testid="signup-box">
        <h1>Sign Up</h1>
            <Form endpoint="users" item='signup' updater={signup} setter={setUser} setToggle={setNotLoggedIn} setError={setError} navigate={navigate} >
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