import React from 'react';

export default function NavBar ( {setChosenView} ) {

    return (
        <div className='navbar-container'>
            <ul>
                <li onClick={ () => {setChosenView("dashboard")}}> Dashboard View </li>
                <li  onClick={ () => {setChosenView("mapwithfilters")}}> Map View </li>
            </ul>
        </div>
    );
};