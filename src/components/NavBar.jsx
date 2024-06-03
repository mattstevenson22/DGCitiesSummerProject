import React from 'react';

export default function NavBar ( {setChosenView} ) {

    return (
        <div className='navbar-container'>
            <ul>
                <li onClick={ () => {setChosenView("dash")}}> Dashboard View </li>
                <li  onClick={ () => {setChosenView("map")}}> Map View </li>
            </ul>
        </div>
    );
};