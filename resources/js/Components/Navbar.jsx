import React, { useRef } from 'react';
import { useState } from 'react';

export default function Navbar() {
    const [displayMenu, setDisplayMenu] = useState(false)
    const baseClass = 'bg-white border px-2 py-5'
    const [dropDownClass, setDropDownClass] = useState(baseClass + ' border-black')
    
    const dropDown = () => {
        setDisplayMenu(!displayMenu)
        if (!displayMenu) {
            setDropDownClass(baseClass + ' border-orange')
        } else {
            setDropDownClass(baseClass + ' border-black')
        }
    }

    return (
        <>
        <header>
            <nav className="flex flex-1 bg-light_grey">
            <button onClick={dropDown} className={dropDownClass}>Dropdown</button>
            {displayMenu && <div id="myDropdown" className='flex flex-col absolute top-16 m-1 bg-white border border-black rounded-md z-20'>
                <a href={route('projects.index')} className='p-3'>Projects</a>
                <a href={route('profile.edit')} className='p-3'>Account</a>
            </div>}
            </nav>
        </header>
        </>
    )
}