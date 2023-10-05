import React, {useState} from "react";

const Input = ({type, name, placeHolder, value = '', options = null}) => {

    const [checked, setChecked] = useState(value)

    console.log(`${name}`, checked)

    const handleChange = (e) => {
        setChecked(e.target.checked)
    }

    if (type == 'select' || type == 'select_text') return (
        <select className='input' name={name} defaultValue={value}>
            {options?.map(op => <option key={op.id} value={type == 'select_text' ? op.name : op.id}>{op.month_name || op.name}</option> )}
        </select>

    )

    else if (type == 'checkbox') return (
        <div className="input">
            <input type={type} name={name} onChange={handleChange} defaultChecked={value} defaultValue={checked}></input>
        </div>

    )

    else return (
        <div className="input">
            <input type={type} name={name} placeholder={placeHolder} defaultValue={value} style={type == 'hidden' ? {visibility: 'hidden'} : {display: 'block'}}></input>
        </div>
    )
};

export default Input