import React, {useState} from "react";
import { useSetUser } from "./helpers/useSetUser";
import { Form } from "./Form";
import { Input } from "./Input";
import { Submit } from "./Submit";
import { updateData } from "./helpers/api_helpers";
import { Switcher } from "./Switcher";

export const User = () => {

    const [edit, setEdit] = useState(false)
    const { user, setError } = useSetUser(edit)

    if (edit) return (
        <div className="data user-data">
        <h2>User Details</h2>
         <Form endpoint="users" item='signup' updater={updateData} setToggle={setEdit} setError={setError} >
            <Input type="text" name="name" value={user?.name} placeHolder='name'/>
            <Input type="email" name="email" value={user?.email} placeHolder='email address'/>
            <Submit/>
        </Form>
        </div>
    )

    return ( user && 
        <div className="data user-data">
            <Switcher setter={setEdit} data={edit}>Change User Details</Switcher>
            <h1>Name: {user?.name}</h1>
            <h2>Email: {user?.email}</h2>
            <h2>Games Played: {[...new Set(user?.sessions?.map(s => s.game_id))].length}</h2>
            <h2>Sessions Played: {user?.sessions?.length + user?.shared_sessions?.length}</h2>
        </div>
    )
}