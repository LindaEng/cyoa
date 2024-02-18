import React from 'react';
import { useState } from 'react';

export const Modal = ({handleClose}) => {
    return (
        <div>
            <h1>Modal</h1>
            <button onClick={handleClose}>Close</button>
        </div>
    )
}