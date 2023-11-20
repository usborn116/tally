import React, {useState} from "react";

export const Input = ({type, name, placeHolder, value = '', options = null}) => {

    const [checked, setChecked] = useState(value)

    const handleChange = async (e) => {
        const set = await e.target.checked
        setChecked(set)
    }

    if (type == 'select' || type == 'select_text') return (
        <select className='input' name={name} defaultValue={value || ''}>
            <option value=''></option>
            {options?.map(op => <option key={op.id} value={type == 'select_text' ? op.name : op.id}>{op.month_name || op.name}</option> )}
        </select>
    )

    else if (type == 'checkbox') return (
        <div className="input">
            <input type={type} name={name} onChange={handleChange} defaultChecked={value} defaultValue={checked}></input>
            <p className="checkmark">✓</p>
        </div>
    )

    else return (
        <div className="input" style={type == 'hidden' ? {visibility: 'hidden'} : {display: 'block'}}>
            <div className="label">{placeHolder ? <div>{placeHolder}</div> : ''}</div>
            <div className="field">
                <input type={type} name={name} placeholder={placeHolder} defaultValue={value}></input>
            <p className="checkmark">✓</p>
            </div>
        </div>
    )
};