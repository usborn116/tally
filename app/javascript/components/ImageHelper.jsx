import React from "react";
import { useState } from "react";

export const ImageHelper = () => {
    
    const [show, setShow] = useState(false)

    if (show) return (
        <div className='help-modal'>
            <h2>Getting an Image URL</h2>
            <ol style={{display: 'flex', flexDirection: 'column', gap: '0.5em'}}>
                <li>Search the game on Google Images</li>
                <li>Open the image</li>
                <li>Tap and hold on the image</li>
                <li>Tap "Copy"</li>
                <li>Paste the image link in this field!</li>
            </ol>
            <p style={{filter: 'drop-shadow(0 0 1em #A0E8AF', alignSelf:'left'}}onClick={() => setShow(() => false)}>[hide]</p>
        </div>
    )

    return (
        <p className='small-button' onClick={() => setShow(() => true)}>?</p>
    )
}