import React, { useState, useEffect } from "react";
import Form from "./Form";
import Input from "./Input";
import Submit from "./Submit";
import { logIn, signup, getUser } from "./helpers/api_helpers";
import Switcher from "./Switcher";
import {useNavigate} from 'react-router-dom'

export const Login = ({user, setUser}) => {

    const navigate = useNavigate()

    const [existing, setExisting] = useState(true)
    const [notLoggedIn, setNotLoggedIn] = useState(true)

    useEffect(() => {
        async () => {
            const response = await getUser(setUser)
            response ? navigate('/') : ''
        }
    }, [notLoggedIn])

    const form = existing ? 
    <>
    <h1>Log In</h1>
    <Form endpoint="users/sign_in" item='login' updater={logIn} setter={setUser} setToggle={setNotLoggedIn} navigate={navigate}>
            <Input type="email" name="email" placeHolder='email address'/>
            <Input type="password" name="password" placeHolder='password' />
            <Submit/>
    </Form>
    </> : 
    <>
    <h1>Sign Up</h1>
    <Form endpoint="users" item='signup' updater={signup} setter={setUser} setToggle={setNotLoggedIn} navigate={navigate}>
            <Input type="text" name="name" placeHolder='name'/>
            <Input type="email" name="email" placeHolder='email address'/>
            <Input type="password" name="password" placeHolder='password' />
            <Input type="password" name="password_confirmation" placeHolder='confirm password' />
            <Submit/>
    </Form>
    </>

    return (
        <>
        <Switcher setter={setExisting} data={existing}>{existing ? 'Sign Up' : 'Log In'}</Switcher>
        {form}
        </>
    )

};