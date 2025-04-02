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
    <div className='flex justify-between border border-black'>
      <h1 className='m-2'>{data.data.fileName}</h1>
      <div className='flex'>
      <a className='items-center justify-center flex m-2' href={route('file.download', data.data.id)}>
        <img className='h-4' src={ `http://localhost:8000/images/downloadIcon.png` } alt="download icon"/>
      </a>
      <button className='items-center justify-center flex m-2' onClick={onDelete}>
        <img className='h-4' src={ `http://localhost:8000/images/deleteIcon.png` } alt="download icon"/>
      </button>
      </div>
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
        <div className='border border-black w-full bg-white flex flex-col'>
            <h1 className='m-2'>Files</h1>
            <form id="form" onSubmit={onSubmit} method="POST">
            
            
            <div className='p-4 mb-4 border'>
            {files.map((data) => {
                return <File data={data} />
            })}
            </div>
            <div className='m-4'>
            <label className='border border-orange p-2 rounded-xl' htmlFor="fileInput">Upload File</label>
            <input className='hidden' id='fileInput' type="file" onChange={e => fileChange(e)}/>
            </div>
            </form>
        </div>
    )
}


export default FileSystem;