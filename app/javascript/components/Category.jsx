import React from "react";
import Form from "./Form";
import Input from "./Input";
import Submit from "./Submit";
import { updateData } from "./helpers/api_helpers";
import { useState } from "react";
import Switcher from "./Switcher";

export default Category = ({data, setData}) => {

    return (
        <>
        <Form submitter={true} endpoint="categories" item='category' id={data.id} updater={updateData} 
        setter={setData} style={{gridTemplateColumns: `repeat(3, 1fr)`}} className="row">
            <Input type="text" name="name" value={data.name}/>
            <div className="linked">
                <div>Points Based?</div>
                <Input type="checkbox" name="point_based" value={data.point_based} />
            </div>
            <Submit nobutton={true}>Save</Submit>
        </Form>
        </>
    )


}