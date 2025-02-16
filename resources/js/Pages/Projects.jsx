import React, { useRef } from 'react';
import { useState } from 'react';
import { router } from '@inertiajs/react';
import NavBar from '@/Components/Navbar';


export default function Projects({projects}) {
    const [displayCreate, setDisplayCreate] = useState(false)
    const createProject = () => {
        setDisplayCreate(true)
    }

    function selectProject(id) {
        router.get(route('home', id))
    } 

    return (
        <>
            <NavBar/>
            <button onClick={createProject}>Create Project</button>
            <div>
            {projects.map((data) => {
                return <button onClick={() => selectProject(data.id)}>
                    <h1>{data.projectName}</h1>
                    </button>
            })}
            </div>
            {displayCreate && <CreateProject/>}
        </>
    )
}

const CreateProject = () => {
    const [values, setValues] = useState({
        projectName: "",
        sprintLength: "",
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
        e.preventDefault()
        router.post(route('projects.create'), values)
    }
    return (
        <>
            <form onSubmit={onSubmit} method='POST'>
                <input type="text" name="projectName" id="projectName" value={values.projectName} onChange={handleChange}/>
                <input type="text" name="sprintLength" id="sprintLength" value={values.sprintLength} onChange={handleChange}/>
                <input type="submit" value="Create Project" />
            </form>
        </>
    )
}