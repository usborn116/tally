import React from "react";

const Input = ({type, name, placeHolder, value = '', options = null}) => {

    if (type == 'select' || type == 'select_text') return (
        <select className='input' name={name} defaultValue={value}>
            {options?.map(op => <option key={op.id} value={type == 'select_text' ? op.name : op.id}>{op.month_name || op.name}</option> )}
        </select>

    )

    else if (type == 'checkbox') return (
        <div className="input">
            <input type={type} name={name} placeholder={placeHolder} defaultChecked={value}></input>
        </div>

    )

    else return (
        <div className="input">
            <input type={type} name={name} placeholder={placeHolder} defaultValue={value} style={type == 'hidden' ? {visibility: 'hidden'} : {display: 'block'}}></input>
        </div>
    )
};

export default Input