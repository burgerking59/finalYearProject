import React, { useRef } from 'react';
import { useState } from 'react';

export default function Navbar() {
    const [displayMenu, setDisplayMenu] = useState(false)
    
    const dropDown = () => {
        setDisplayMenu(!displayMenu)
    }

    return (
        <>
        <header>
            <nav className="flex flex-1 ">
            <button onClick={dropDown}>Dropdown</button>
            {displayMenu && <div id="myDropdown">
                <a href={route('projects.index')}>Projects</a>
                <a href={route('profile.edit')}>Account</a>
            </div>}
            </nav>
        </header>
        </>
    )
}