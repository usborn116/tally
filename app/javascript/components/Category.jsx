import React from "react";
import Form from "./Form";
import Input from "./Input";
import Submit from "./Submit";
import { updateData } from "./helpers/api_helpers";
import { useState } from "react";
import Switcher from "./Switcher";

export default Category = ({data, setData}) => {

    const [toggle, setToggle] = useState(true)

    return (
        <>
        <Form endpoint="categories" item='category' id={data.id} updater={updateData} setter={setData} setToggle={setToggle}>
            <Input type="text" name="name" value={data.name}/>
            <div>Points Based?</div>
            <Input type="checkbox" name="point_based" value={data.point_based} />
            <Submit>Save</Submit>
        </Form>
        </>
    )


}