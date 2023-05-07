import getRandomColor from '@/utils/getRandomColor'
import { Box, Checkbox, FormControlLabel, IconButton, Input, Stack } from '@mui/material'
import React, { useContext, useEffect, useRef, useState } from 'react'
import DeleteForeverTwoToneIcon from '@mui/icons-material/DeleteForeverTwoTone';
import { TaskContext } from '@/context/ContextProvider';
import EditNoteIcon from '@mui/icons-material/EditNote';

const Task = ({task,markCompleted,deleteTask,updateTask}) => {
  
  const [currentColor, setCurrentColor] = useState('primary')
  useEffect(()=>{setCurrentColor(getRandomColor())},[])

  const {dispatch} = useContext(TaskContext);

  const [editMode, setEditMode] = useState(false);
  const [taskName, setTaskName] = useState(task.taskName)
  const [taskDesc, setTaskDesc] = useState(task.taskDesc)
  const taskDescRef = useRef(null)
  return (
    <>
      {!editMode?(
        task && 
          <Stack justifyContent='flex-start' alignItems='center' 
            sx={{
              border:`4px solid var(--mui-palette-${currentColor}-light)`,
              p:'1rem',
              m:'1rem',
              minWidth:'180px',
              '@media (max-width: 990px)':{
                minWidth:'60px',
              }
            }}
          >
            <Stack direction='row' justifyContent='space-between' alignItems='center' width='100%'
              color={`var(--mui-palette-${currentColor}-dark)`}
            >
              <FormControlLabel control={
                <Checkbox 
                  color={currentColor} 
                  checked={task.completed}
                  onChange={()=>dispatch(markCompleted(task.taskId))}
                />
              } />
              <Box
                onClick={()=>{
                  setEditMode(!editMode)
                }}
              > {task.taskName}
              </Box>
              <Stack direction={'row'} justifyContent={'flex-end'} alignItems={'center'} spacing={1}>
                <IconButton 
                  size='small' 
                  color={currentColor}
                  onClick={()=>setEditMode(!editMode)}
                ><EditNoteIcon size='small'/></IconButton>
                <IconButton 
                  size='small' 
                  color={currentColor}
                  onClick={()=>dispatch(deleteTask(task.taskId))}
                ><DeleteForeverTwoToneIcon size='small'/></IconButton>
              </Stack>
            </Stack>
            <Box
              color={`var(--mui-palette-${currentColor}-light)`}
              onClick={()=>{
                setEditMode(!editMode)
              }}
            >
              {task.taskDesc}
            </Box>
          </Stack>
      ):(
        task && 
        <Stack justifyContent='flex-start' alignItems='center' 
          sx={{
            border:`4px solid var(--mui-palette-${currentColor}-light)`,
            p:'1rem',
            m:'1rem',
            minWidth:'180px',
            '@media (max-width: 990px)':{
              minWidth:'60px',
            }
          }}
        >
          <Stack direction='row' justifyContent='space-between' alignItems='center' width='100%'
            color={`var(--mui-palette-${currentColor}-dark)`}
          >
            <FormControlLabel control={
              <Checkbox 
                color={currentColor} 
                checked={task.completed}
                onChange={()=>dispatch(markCompleted(task.taskId))}
              />
            }/>
            <Input
              autoFocus
              value={taskName}
              onChange={(evt)=>setTaskName(evt.target.value)}
              sx={{
                color:`var(--mui-palette-${currentColor}-dark)`,
                'input':{
                  p:'8px',
                }
              }}
              onBlur={(evt)=>{
                dispatch(updateTask({...task,taskName:evt.target.value}))
              }}
            />
            <IconButton 
              size='small' 
              color={currentColor}
              onClick={()=>setEditMode(!editMode)}
            ><EditNoteIcon size='small'/></IconButton>
          </Stack>
          <Input
            value={taskDesc}
            onChange={(evt)=>setTaskDesc(evt.target.value)}
            sx={{
              color:`var(--mui-palette-${currentColor}-light)`,
              'input':{
                p:'8px',
              }
            }}
            onBlur={(evt)=>{
              dispatch(updateTask({...task,taskDesc:evt.target.value}))
            }}
          />
        </Stack>
      )}
    </>
  )
}

export default Task