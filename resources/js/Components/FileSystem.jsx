import React, { useRef } from 'react';
import { useEffect } from 'react';
import { useState } from "react";
import { router } from '@inertiajs/react';
import { useForm } from '@inertiajs/react'

const File = (data) => {
  function onDelete (e) {
    e.preventDefault();
    router.delete(route('file.destroy', data.data.id))
  }

  return (
    <div>
      <h1>{data.data.fileName}</h1>
      <a href={route('file.download', data.data.id)} class="rounded-lg bg-gray-200 px-4 py-1">
        <label>Download</label>
      </a>
      <button onClick={onDelete}>Delete</button>
    </div>
  )
}

const FileSystem = ({files}) => {

    const [file, setFile] = useState(null);

    const { data, setData, post, progress } = useForm({
        avatar: null,
      })

    function onSubmit (e) {
        e.preventDefault();
        post(route('file.store'))
    }

    const handleFileChange = (e) => {
        if (e.target.files) {
          setFile(e.target.files[0]);
        }
      };
    
    return (
        <>
        <div>
            <h1>File System</h1>
            <form onSubmit={onSubmit} method="POST">
            <input type="file" onChange={e => setData('avatar', e.target.files[0])}/>
            <input type="submit" />
            </form>
            <div className='p-10 border'>
            {files.map((data) => {
                return <File data={data} />
            })}
            </div>
        </div>
        </>
    )
}


export default FileSystem;