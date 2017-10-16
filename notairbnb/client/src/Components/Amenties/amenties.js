import React, { Component } from 'react';
import './amenties.css'

export default function Amenties({ amenties }) {
    console.log(amenties); 
    return (
        <div>
            <h3>Amenties</h3>
            {amenties.map((amentie, i) => (
                <p key={i}>{amentie}</p>
            ))}
        </div>
    )

};