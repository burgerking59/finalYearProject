import React, { useLayoutEffect, useRef } from 'react';
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
      <a href={route('file.download', data.data.id)} className="rounded-lg bg-gray-200 px-4 py-1">
        <label>Download</label>
      </a>
      <button onClick={onDelete}>Delete</button>
    </div>
  )
}

const FileSystem = ({files}) => {

    const [file, setFile] = useState(null);

    const [fileChanges, setFileChanges] = useState(0)

    const { data, setData, post, progress } = useForm({
        avatar: null,
      })

    function onSubmit (e) {
      e.preventDefault()
        post(route('file.store'))
    }

    function fileChange(e) {
      
      setData('avatar', e.target.files[0])
      setFileChanges(fileChanges + 1)
    }

    useLayoutEffect(() => {
      document.getElementById('form').requestSubmit()
  },[fileChanges])
    
    return (
        <div className='border border-black w-full bg-white'>
            <h1 className='m-4'>Files</h1>
            <form id="form" onSubmit={onSubmit} method="POST">
            <label htmlFor="fileInput">Upload File</label>
            <input className='hidden' id='fileInput' type="file" onChange={e => fileChange(e)}/>
            </form>
            <div className='p-10 border'>
            {files.map((data) => {
                return <File data={data} />
            })}
            </div>
        </div>
    )
}


export default FileSystem;