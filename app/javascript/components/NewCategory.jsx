import React from "react";
import Form from "./Form";
import Input from "./Input";
import Submit from "./Submit";

export default NewCategory = ({endpoint}) => {

    return (
        <>
        <Form endpoint="categories" item='category'>
                <Input type="text" name="name" placeHolder='Name' />
                <div>Points Based?</div>
                <Input type="checkbox" name="point_based" />
                <Submit/>
        </Form>
        </>
    )


}