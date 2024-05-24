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
        const response = info[item]?.name !== '' ? await updater(`${endpoint}${id ? `/${id}` : ''}`, info, setError) : null

        if (response?.error){
            return
        } else {
            if (item=='game' && !id) {
                window.location.href = `${window.location.href}games/${response?.id}`
            }
            if (item=='share') {
                window.alert(response.message)
            }
            if (setToggle) setToggle(false)
            if (navigate) navigate('/')
        }
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