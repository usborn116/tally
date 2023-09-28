import React from "react";
import Form from "./Form";
import Input from "./Input";
import Submit from "./Submit";
import { updateData } from "./helpers/api_helpers";
import { useState } from "react";

export default Player = ({data, setData}) => {

    const [toggle, setToggle] = useState(true)

    return (
        <>
        <Form endpoint="players" item='player' id={data.id} updater={updateData} setter={setData} setToggle={setToggle}>
            <Input type="text" name="name" value={data.name}/>
            <Submit>Save</Submit>
        </Form>
        </>
    )


}