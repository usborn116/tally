import React from "react";
import { useState, useEffect } from "react";
import { getData } from "./helpers/api_helpers";

export const Sessions = ({data}) => {

    const list = data.map(p => <div key={p.id}>{p.date} | Winner: {p.victor}</div>)
    
    return (
        <>
            <h2>Sessions</h2>
            {list}
        </>

    )

}