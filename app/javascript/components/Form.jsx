import React, {useRef} from "react";

const Form = ({endpoint, item, updater, id, setter = null, setLoading = null, setError, setToggle, children, setUser}) => {

    const formRef = useRef()

    const onSubmit = async (e) =>{
        e.preventDefault()
        const formData=new FormData(formRef.current)
        const data=Object.fromEntries(formData)
        const info = {}
        if(item == 'game'){info[item] = { name: data.name, game_category: data.game_category, image: data.image, 
            gameplay_length: data.gameplay_length, player_number: data.player_number, complexity: data.complexity, 
            category_count: data.category_count}}
        if(item == 'category'){info[item] = { name: data.name, point_based: data.point_based, game_id: data.game_id}}
        if(item == 'player' || item == 'session_player'){info[item] = { name: data.name, session_id: data.session_id }}
        if(item == 'session'){info[item] = { date: data.date, game_id: data.game_id }} 
        const response =  await updater(`/${endpoint}${id ? `/${id}` : ''}`, info)
        console.log(response)
        if (item=='game' && !id) {
            window.location.href = `${window.location.href}/${response.id}`
        }
        setToggle ? setToggle(false) : ''

    }

    return (
        <div className="form">
            <form ref={formRef} onSubmit={onSubmit}>
                {children}
            </form>
        </div>
          )
};

export default Form