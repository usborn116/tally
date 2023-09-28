import React from "react";

const Input = ({type, name, placeHolder, value = '', options = null}) => {

    if (type == 'select') return (
        <select name={name} defaultValue={val}>
            {options.map(op => <option key={op.id} value={op.id}>{op.month_name || op.name}</option> )}
        </select>

    )

    if (type == 'checkbox') return (
        <div className="input">
            <input type={type} name={name} placeholder={placeHolder} defaultChecked={value}></input>
        </div>

    )

    return (
        <div className="input">
            <input type={type} name={name} placeholder={placeHolder} defaultValue={value} style={type == 'hidden' ? {visibility: 'hidden'} : {display: 'block'}}></input>
        </div>
    )
};

export default Input