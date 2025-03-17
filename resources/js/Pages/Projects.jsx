import React, { useRef } from 'react';
import { useState } from 'react';
import { router } from '@inertiajs/react';
import NavBar from '@/Components/Navbar';


export default function Projects({projects}) {
    const [displayCreate, setDisplayCreate] = useState(false)
    const createProject = () => {
        setDisplayCreate(!displayCreate)
    }
    const [displayMenu, setDisplayMenu] = useState(false)
    const baseClass = 'bg-white border px-2 py-5'
    const [dropDownClass, setDropDownClass] = useState(baseClass + ' border-black')

    function selectProject(id) {
        router.get(route('home', id))
    } 

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
                <nav className="flex justify-between bg-light_grey">
                <button onClick={dropDown} className={dropDownClass}>Dropdown</button>
                {displayMenu && <div id="myDropdown" className='flex flex-col absolute top-16 m-1 bg-white border border-black rounded-md'>
                    <a href={route('projects.index')} className='p-3'>Projects</a>
                    <a href={route('profile.edit')} className='p-3'>Account</a>
                </div>}
                <button onClick={createProject} className='border border-orange bg-white m-2 p-2 px-6 rounded-2xl'>New Project</button>
                </nav>
            </header>
            
            <div className='bg-light_grey flex flex-col m-4'>
            {projects.map((data) => {
                return <button onClick={() => selectProject(data.id)}>
                    <h1 className='bg-white border border-black m-3 p-3'>{data.projectName}</h1>
                    </button>
            })}
            </div>
            {displayCreate && <CreateProject createProject={createProject}/>}
        </>
    )
}

const CreateProject = ({createProject}) => {
    const [values, setValues] = useState({
        projectName: "Project Name",
        sprintLength: "Sprint Length",
      })

      function handleChange(e) {
        const key = e.target.id;
        const value = e.target.value
        setValues(values => ({
            ...values,
            [key]: value,
        }))
      }

    function onSubmit(e) {
        createProject()
        e.preventDefault()
        router.post(route('projects.create'), values)
    }
    return (
        <div className='bg-white border border-black fixed inset-x-0 inset-y-0 h-3/4 w-1/2 m-auto'>
            <button className='absolute right-4 mt-2 font-bold text-orange' onClick={() => createProject()}>X</button>
            <form onSubmit={onSubmit} method='POST' className='flex flex-col p-4 mt-2'>
                <input className='m-4' type="text" name="projectName" id="projectName" placeholder={values.projectName} onChange={handleChange}/>
                <input className='m-4' type="text" name="sprintLength" id="sprintLength" placeholder={values.sprintLength} onChange={handleChange}/>
                <input className='m-auto mt-12 p-4 border border-orange' type="submit" value="Create Project" />
            </form>
        </div>
    )
}