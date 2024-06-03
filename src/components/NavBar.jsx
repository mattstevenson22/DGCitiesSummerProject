import React from 'react';

export default function NavBar ( {setChosenView} ) {

    return (
        <div className='navbar-container'>
            <ul>
                <li > <button onClick={ () => {setChosenView("dash")}}> dash view</button> </li>
                <li > <button onClick={ () => {setChosenView("map")}}> map view</button> </li>
            </ul>
        </div>
    );
};