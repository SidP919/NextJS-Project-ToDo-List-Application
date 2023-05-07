import { Box, Grid, ListItem, Stack } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import Task from './Task'
import { TaskContext } from '@/context/ContextProvider'

const TaskList = ({markCompleted,deleteTask,updateTask}) => {
  const [toDoHeading, setToDoHeading] = useState('No Task In Queue')
  const [toDoCompletedHeading, setToDoCompletedHeading] = useState('')
  const taskList = useContext(TaskContext)?.state?.tasks;
  useEffect(()=>{
    if(taskList?.filter(task=>task.completed===true)?.length>0){
      setToDoCompletedHeading('List of Completed ToDos')
    }else{
      setToDoCompletedHeading('')
    }
  },[
    taskList?.filter(task=>task.completed===true)?.length
  ])
  useEffect(()=>{
    if(taskList?.filter(task=>task.completed===false)?.length>0){
      setToDoHeading('List of ToDos')
    }else{
      setToDoHeading('No Task In Queue')
    }
  },[
    taskList?.filter(task=>task.completed===false)?.length
  ])
  return (
  <Stack justifyContent={'center'} width='100%'>
    <Box
      sx={{ 
        textDecoration:'underline', 
        color:'var(--mui-palette-primary-main)',
        py:'1rem',
      }}
      textAlign='center'
    >
      <h2>
        {toDoHeading}
      </h2>
    </Box>
    <Grid container spacing={1}>
      {
        taskList?.filter(task=>task.completed===false).map((task, index) => {
          return (
            <Grid item xs={12} sm={6} md={4} lg={4} key={index}>
              <Task task={task} markCompleted={markCompleted} deleteTask={deleteTask} updateTask={updateTask}/>
            </Grid>
          )
        })
      }
    </Grid>
    <Box
      sx={{ 
        textDecoration:'underline', 
        color:'var(--mui-palette-primary-main)',
        py:'1rem',
      }}
      textAlign='center'
    >
      <h2>
        {toDoCompletedHeading}
      </h2>
    </Box>
    <Grid container spacing={1} width='100%'>
      {
        taskList?.filter(task=>task.completed===true).map((task, index) => {
          return (
            <Grid item xs={12} sm={6} md={4} lg={4} key={index}>
              <Task 
                task={task} 
                markCompleted={markCompleted} 
                deleteTask={deleteTask} 
                updateTask={updateTask}/>
            </Grid>
          )
          
        })
      }
    </Grid>
  </Stack>
  )
}

export default TaskList