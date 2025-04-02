import React, { useRef } from 'react';
import { useState } from 'react';

export default function Navbar({ children, title }) {
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
            <nav className="flex flex-1 bg-light_grey justify-between">
            <div className='flex'>
                <button onClick={dropDown} className={dropDownClass}>
                    {!displayMenu && <img className='h-4 mx-1' src={ `http://localhost:8000/images/closeDropdown.png` } alt="download icon"/>}
                    {displayMenu && <img className='h-4 mx-1' src={ `http://localhost:8000/images/openDropdown.png` } alt="download icon"/>}
                </button>
                {displayMenu && <div id="myDropdown" className='flex flex-col absolute top-16 m-1 bg-white border border-black rounded-md z-20'>
                    <a href={route('projects.index')} className='p-3'>Projects</a>
                    <a href={route('profile.edit')} className='p-3'>Account</a>
                </div>}
                <h1 className='self-center mx-8 font-bold text-xl'>{title}</h1>
            </div>
            <div className='self-center'>
                {children}
            </div>
            </nav>
        </header>
        </>
    )
}