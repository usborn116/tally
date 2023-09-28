import React, {useState, useEffect} from "react";
import { Button } from "./Button";
import { useParams, useLocation } from "react-router-dom";
import { Sessions } from "./Sessions";
import { getData, updateData } from "./helpers/api_helpers";
import Form from "./Form";
import Submit from "./Submit";
import Input from "./Input";
import Switcher from "./Switcher";
import Category from "./Category";


export const Game = ({user, usergames = true}) => {
    const id = useParams().id

    const [data, setData] = useState([])
    const [toggle, setToggle] = useState(false)
    const [edit, setEdit] = useState(false)

    useEffect(() => {
        getData(`/user_game/${id}`, setData)
    }, [toggle, edit])

    const categorySection = data?.categories?.map(c => <Category key={c.id} data={c} setData={setData} toggle={toggle} setToggle={setToggle} />)

    if (edit) return (
        <>
        <Switcher setter={setEdit} data={edit}>See Game Details</Switcher>
        <Form endpoint="games" item='game' id={data.id} updater={updateData} setter={setData} setToggle={setEdit}>
                <Input type="text" name="name" value={data?.name} />
                <Input type="text" name="game_category" value={data?.game_category}  />
                <Input type="text" name="image" value={data?.image}  />
                <Input type="text" name="gameplay_length" value={data?.gameplay_length}  />
                <Input type="text" name="player_number" value={data?.player_number}  />
                <Input type="text" name="complexity" value={data?.complexity} />
                <Submit/>
        </Form>
        </>
    )


    return (
        <>
            <Switcher setter={setEdit} data={edit}>Edit Game Details</Switcher>
            <div>{data?.name}</div>
            <img src={data?.image}></img>
            <div>Category: {data?.game_category}</div>
            <div>Playtime: {data?.gameplay_length}</div>
            <div>Players Supported: {data?.player_number}</div>
            <div>Complexity: {data?.complexity}/5</div>
            <h4>Categories</h4>
            {categorySection}
            {user ? <Button name='Session'/> : ''}
            {usergames && data?.sessions ? <Sessions data={data?.sessions} /> : ''}
        </>
        

    )

}