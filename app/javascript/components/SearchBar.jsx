import React from "react";

export const SearchBar = ({setSearch}) => {

    return (
        <div className="search">
            <div className="input" >
                <div className="label">Search</div>
                <div className="field">
                    <input type='text' placeholder='Find a game!' onChange={(e) => setSearch(e.target.value)}></input>
                </div>
            </div> 
        </div>
    )

};