import React, {useRef} from "react";
import { form_object } from "./helpers/form_helpers";

export const Form = ({submitter = null, navigate = null, className = null, style = null, endpoint, item, updater, id, setError, setToggle, children}) => {

    const formRef = useRef()

    const onSubmit = async (e) =>{
        e.preventDefault()
        const formData=new FormData(formRef.current)
        const data=Object.fromEntries(formData)
        let info = {}
        info = form_object(item, info, data)
        console.log(info)
        const response = info[item]?.name !== '' ? await updater(`/${endpoint}${id ? `/${id}` : ''}`, info, setError) : null
        if (item=='game' && !id) {
            window.location.href = `${window.location.href}/${response?.id}`
        }
        setToggle ? setToggle(false) : ''
        navigate ? navigate('/') : ''

    }

    const empty = (e) => e.preventDefault()

    return (
        <div className="form">
            <form className={className} style={style} ref={formRef} onMouseLeave={submitter ? onSubmit : empty} onSubmit={onSubmit}>
                {children}
            </form>
        </div>
          )
};