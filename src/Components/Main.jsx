import React from 'react';
import './Firebase';
import Navbar from './navbar/Navbar';
import Share from './Compartir/Compartir';
import Post from './Post/Post';

export default function HolaGente() {
    console.log("hola gente");
    return (
        <React.StrictMode>
            <Navbar />
            <Share />
            <Post />
        </React.StrictMode>
    );
}
