import React from 'react';
import './Firebase';
import Navbar from './navbar/Navbar';
import Share from './Compartir/Compartir';

export default function HolaGente() {
    console.log("hola gente");
    return (
        <React.StrictMode>
            <Navbar />
            <Share />
        </React.StrictMode>
    );
}
