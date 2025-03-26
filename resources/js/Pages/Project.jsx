import { Head, Link } from '@inertiajs/react';
import Whiteboard from '../Components/Whiteboard';
import TaskTracker from '@/Components/taskTracker';
import FileSystem from '@/Components/FileSystem';
import NavBar from '@/Components/Navbar';
import { useState } from 'react';


export default function Welcome({ auth, files, stages, tasks}) {
    const [displayFile, setDisplayFile] = useState(false)
    const [displayTask, setDisplayTask] = useState(false)

    function showFiles() {
        setDisplayFile(!displayFile)
    }
    function showTasks() {
        setDisplayTask(!displayTask)
    }

    return (
        <div className='overflow-hidden overflow-y-hidden'>
        <Head title="Welcome" />
            <div>
                <NavBar/>
            </div>
            
            <Whiteboard displayTask={displayTask} setDisplayTask={setDisplayTask} displayFile={displayFile} setDisplayFile={setDisplayFile}>
                
            </Whiteboard>
            <div className='flex absolute bottom-0 w-full z-10'>
                {displayTask && <TaskTracker stages={stages} tasks={tasks} />}
                
                {displayFile && <FileSystem files={files} />}
            </div>
        </div>   
);
}
