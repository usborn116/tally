import React from "react";
import { Form } from "./Form";
import { Input } from "./Input";
import { Submit } from "./Submit";
import { updateData } from "./helpers/api_helpers";

export const Player = ({data, setData}) => {

    return (
        <Form submitter={true} endpoint="players" item='player' id={data.id} updater={updateData} setter={setData}>
            <Input type="text" name="name" value={data.name}/>
            <Submit nobutton={true}>Save</Submit>
        </Form>
    )
}