import React from "react";
import { Form } from "react-router-dom";
import { Input } from "./Input";
import { Submit } from "./Submit";

export const SessionShare = ({id, updateData, setData, setSessionShare, setError}) => {

    return (
    <Form endpoint={`create_share`} item='create_share' id={id} updater={updateData} setter={setData} setToggle={setSessionShare} setError={setError}>
        <Input type="text" name="email" placeHolder='User email'/>
        <Submit>Share</Submit>
    </Form>
    )
    
};