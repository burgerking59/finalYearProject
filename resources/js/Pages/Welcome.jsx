import { Head, Link } from '@inertiajs/react';
import Whiteboard from '../Components/Whiteboard';
import TaskTracker from '@/Components/taskTracker';
import FileSystem from '@/Components/FileSystem';
import NavBar from '@/Components/Navbar';


export default function Welcome({ auth, files}) {
    const handleImageError = () => {
        document
            .getElementById('screenshot-container')
            ?.classList.add('!hidden');
        document.getElementById('docs-card')?.classList.add('!row-span-1');
        document
            .getElementById('docs-card-content')
            ?.classList.add('!flex-row');
        document.getElementById('background')?.classList.add('!hidden');
    };
    
    

    return (
        <>
        <Head title="Welcome" />
            <div>
                <NavBar/>
            </div>
            <Whiteboard>
                
            </Whiteboard>
            <TaskTracker />
            <FileSystem files={files} />
        </>   
);
}
