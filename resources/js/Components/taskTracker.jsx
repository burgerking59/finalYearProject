import { Button } from "@headlessui/react";
import React, { useRef } from 'react';
import { useState } from 'react';
import { Description, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'

const Column = ({ title, column, taskData, setTaskData, addTask}) => {
    const [active, setActive] = useState(false);

    const filteredTasks = taskData.filter((c) => c.column === column)

    

    const handleDragStart = (e, card) => {
        e.dataTransfer.setData("cardId", card.id);
      };
    
      const handleDragEnd = (e) => {
        const cardId = e.dataTransfer.getData("cardId");
    
        setActive(false);
        clearHighlights();
    
        const indicators = getIndicators();
        const { element } = getNearestIndicator(e, indicators);
    
        const before = element.dataset.before || "-1";
    
        if (before !== cardId) {
          let copy = [...taskData];
    
          let cardToTransfer = copy.find((c) => c.id === cardId);
          if (!cardToTransfer) return;
          cardToTransfer = { ...cardToTransfer, column };
    
          copy = copy.filter((c) => c.id !== cardId);
    
          const moveToBack = before === "-1";
    
          if (moveToBack) {
            copy.push(cardToTransfer);
          } else {
            const insertAtIndex = copy.findIndex((el) => el.id === before);
            if (insertAtIndex === undefined) return;
    
            copy.splice(insertAtIndex, 0, cardToTransfer);
          }
    
          setTaskData(copy);
        }
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
                return <Task key={data.id} {...data} handleDragStart={handleDragStart} taskData={taskData} setTaskData={setTaskData}/>
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

const Task = ({title, description, id, column, handleDragStart, taskData, setTaskData}) => {
  const [titl, setTitle] = useState(title)
  const [desc, setDescription] = useState(description)
  

  const [displayEdit, setDisplayEdit] = useState(false)
  const editTask = () => {
    setDisplayEdit(true)
  }
  const confirmTask = () => {
    const newTaskData = taskData.map(task => {
      if (task.id != id) {
        return task;
      } else {
        return {title:titl,description:desc,id:id,column:column};
      }
    });
    setTaskData(newTaskData)
    setDisplayEdit(false)
  }

  const deleteTask = () => {
    setTaskData(
      taskData.filter(a =>
        a.id !== id
      )
    );
    setDisplayEdit(false)
  }

  const closeTask = () => {
    setDisplayEdit(false)
  }

    return (
        <>
        { displayEdit && <TaskEdit 
          title={titl}
          setTitle={setTitle}
          description={desc}
          setDescription={setDescription}
          confirmTask={confirmTask} 
          deleteTask={deleteTask} 
          closeTask={closeTask} /> }
        <DropIndicator beforeId={id} column={column} />
        <div draggable="true"
        className="cursor-grab active:cursor-grabbing text-red-400"
        onDragStart={(e) => handleDragStart(e, {
            title, description, id, column
        })}>
            <button onClick={editTask}>
            <p>{title}</p>
            <p>{description}</p>
            </button>
        </div>
        </>
    )
}

const TaskEdit = ({title, setTitle, description, setDescription, confirmTask, deleteTask, closeTask}) => {
  const editTitle = event => {
    setTitle(event.target.value)
  }
  const editDescription = event => {
    setDescription(event.target.value)
  }
  return (
    <div className="border fixed z-40 top-10">
      <input type="text" onChange={editTitle} value={title}/>
      <input type="text" onChange={editDescription} value={description}/>
      <button type="button" onClick={deleteTask}>Delete</button>
      <button type="button" onClick={confirmTask}>Confirm</button>
      <button type="button" onClick={closeTask}>X</button>
    </div>
  )
}

const TaskCreate = ({setDisplayCreate, setTaskData, taskData}) => {
  const [title, setTitle] = useState("Enter Task Title")
  const [description, setDescription] = useState("Add a description")
  var newId
  const editTitle = event => {
    setTitle(event.target.value)
  }
  const editDescription = event => {
    setDescription(event.target.value)
  }
  const confirmTask = () => {
    if (taskData.length == 0) {
      newId = "0"
    } else {
      var tempTaskData = taskData.sort(function (a,b) {
        if (a.id < b.id) return -1;
        if (a.id > b.id) return 1;
        return 0;
      });
      newId = (parseInt(tempTaskData[tempTaskData.length - 1].id) + 1).toString()
    }
    var newTask = {title:title, description:description, id:newId, column:"backlog"}
    setTaskData([...taskData, newTask])
    setDisplayCreate(false)
  }
  const closeTask = () => {
    setDisplayCreate(false)
  }
  return (
    <div className="border fixed z-40 top-10">
      <input type="text" onChange={editTitle} value={title}/>
      <input type="text" onChange={editDescription} value={description}/>
      <button type="button" onClick={confirmTask}>Confirm</button>
      <button type="button" onClick={closeTask}>X</button>
    </div>
  )
}

const TaskTracker = () => {
  const [displayCreate, setDisplayCreate] = useState(false)
    const [taskData, setTaskData] = useState([
        {title:"task1", description:"this is the first task", id:"2", column:"backlog"},
        {title:"task2", description:"this is the second task", id:"1", column:"backlog"}])
        
    const addTask = () => {
      setDisplayCreate(true)
    }

    return (
        <div  className="flex-container">
          { displayCreate && <TaskCreate 
          setDisplayCreate={setDisplayCreate}
          setTaskData={setTaskData}
          taskData={taskData}/> }

            <Column
        title="Backlog"
        column="backlog"
        taskData={taskData}
        setTaskData={setTaskData}
        addTask={addTask}
      />
      <Column
        title="Sprint Backlog"
        column="sprintBacklog"
        taskData={taskData}
        setTaskData={setTaskData}
        addTask={addTask}
      />
      <Column
        title="Doing"
        column="doing"
        taskData={taskData}
        setTaskData={setTaskData}
        addTask={addTask}
      />
      <Column
        title="Completed"
        column="completed"
        taskData={taskData}
        setTaskData={setTaskData}
        addTask={addTask}
      />
            
        </div>
    );
};


export default TaskTracker;