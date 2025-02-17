import { Button } from "@headlessui/react";
import React, { useRef } from 'react';
import { useState } from 'react';
import { router } from '@inertiajs/react';
import { Description, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'

const Column = ({ title, column, taskData, stageId, addTask}) => {
    const [active, setActive] = useState(false);
    const [values, setValues] = useState({
      stageId: stageId,
    })

    const filteredTasks = taskData.filter((c) => c.stage_id === stageId)
    
    const handleDragStart = (e, task) => {
        e.dataTransfer.setData("taskId", task.id);
      };
    
      const handleDragEnd = (e) => {
        const taskId = e.dataTransfer.getData("taskId");
        setActive(false);
        clearHighlights();
        
        router.post(route('task.move',taskId), values)
        
      };
    
      const handleDragOver = (e) => {
        
        e.preventDefault();
        highlightIndicator(e);
    
        setActive(true);
      };
    
      const clearHighlights = (els) => {
        const indicators = els || getIndicators();
    
        indicators.forEach((i) => {
          i.style.opacity = "0";
        });
      };
    
      const highlightIndicator = (e) => {
        const indicators = getIndicators();
    
        clearHighlights(indicators);
    
        const el = getNearestIndicator(e, indicators);
    
        el.element.style.opacity = "1";
      };
    
      const getNearestIndicator = (e, indicators) => {
        const DISTANCE_OFFSET = 50;
    
        const el = indicators.reduce(
          (closest, child) => {
            const box = child.getBoundingClientRect();
    
            const offset = e.clientY - (box.top + DISTANCE_OFFSET);
    
            if (offset < 0 && offset > closest.offset) {
              return { offset: offset, element: child };
            } else {
              return closest;
            }
          },
          {
            offset: Number.NEGATIVE_INFINITY,
            element: indicators[indicators.length - 1],
          }
        );
    
        return el;
      };
    
      const getIndicators = () => {
        return Array.from(document.querySelectorAll(`[data-column="${column}"]`));
      };
    
      const handleDragLeave = () => {
        clearHighlights();
        setActive(false);
      };
    return (
        <div>
          
            <h1>{title}</h1>
            <div
            onDragOver={handleDragOver}
            onDrop={handleDragEnd}
            onDragLeave={handleDragLeave}>
                
            {filteredTasks.map((data) => {
                return <Task key={data.id} {...data} handleDragStart={handleDragStart} taskData={taskData}/>
            })}
            <DropIndicator beforeId={null} column={column} />
            <button id="addTask" type="button" onClick={addTask}>Add Task</button>
            </div>
        </div>
    )
}

const DropIndicator = ({ beforeId, column }) => {
    return (
      <div
        data-before={beforeId || "-1"}
        data-column={column}
        className="my-0.5 h-0.5 w-full bg-violet-400 opacity-0"
      />
    );
  };

const Task = ({taskName, description, id, stage_id, handleDragStart, taskData}) => {
  const [values, setValues] = useState({
    title: taskName,
    description: description
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
    router.post(route('task.edit',id), values)
    setDisplayEdit(false)
}
  

  const [displayEdit, setDisplayEdit] = useState(false)
  const editTask = () => {
    setDisplayEdit(true)
  }
 
  const deleteTask = () => {
    router.delete(route('task.destroy', id))
    setDisplayEdit(false)
  }

  const closeTask = () => {
    setDisplayEdit(false)
  }

    return (
        <>
        { displayEdit && <div className="border fixed z-40 top-10">
      <input type="text" id="title" value={values.title} onChange={handleChange}/>
      <input type="text" id="description" value={values.description} onChange={handleChange}/>
      <button type="button" onClick={deleteTask}>Delete</button>
      <button type="button" onClick={onSubmit}>Confirm</button>
      <button type="button" onClick={closeTask}>X</button>
    </div> }
        <DropIndicator beforeId={id} column={stage_id} />
        <div draggable="true"
        className="cursor-grab active:cursor-grabbing text-red-400"
        onDragStart={(e) => handleDragStart(e, {
          taskName, description, id, stage_id
        })}>
            <button onClick={editTask}>
            <p>{taskName}</p>
            <p>{description}</p>
            </button>
        </div>
        </>
    )
}


const TaskCreate = ({setDisplayCreate, stages}) => {

  const [values, setValues] = useState({
          title: "Enter Task Title",
          description: "Add a description",
          stageId: stages[0]['id']
        })
  
        function handleChange(e) {
          const key = e.target.id;
          console.log(key)
          const value = e.target.value
          setValues(values => ({
              ...values,
              [key]: value,
          }))
        }
  
      function onSubmit(e) {
          e.preventDefault()
          router.post(route('task.store'), values)
          setDisplayCreate(false)
      }

  const closeTask = () => {
    setDisplayCreate(false)
  }
  return (
    <div className="border fixed z-40 top-10">
      <input type="text" id="title" value={values.title} onChange={handleChange}/>
      <input type="text" id='description' value={values.description} onChange={handleChange}/>
      <button type="button" onClick={onSubmit}>Confirm</button>
      <button type="button" onClick={closeTask}>X</button>
    </div>
  )
}

const TaskTracker = ({stages, tasks}) => {
  const [displayCreate, setDisplayCreate] = useState(false)

    const addTask = () => {
      setDisplayCreate(true)
    }
    var c = -1

    return (
        <div  className="flex-container">
          { displayCreate && <TaskCreate 
          setDisplayCreate={setDisplayCreate}
          stages={stages}/> }

        {stages.map((data) => {
          c += 1
              return <Column
            title={data.stageName}
            column={data.stageName}
            taskData={tasks}
            stageId={data.id}
            addTask={addTask}
          />
          })}
            
        </div>
    );
};


export default TaskTracker;