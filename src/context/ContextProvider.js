import { createContext, useEffect, useReducer } from "react"

const initialState = {
    tasks: [],
}

function taskReducer(state,action){
    switch(action.type){
        case 'SetTasks':
            return (
                {
                    ...state, 
                    tasks: action.payload,
                }
            )
        case 'AddTask': 
            return (
                {
                    ...state, 
                    tasks: [
                        ...state.tasks, 
                        {
                            taskId: Date.now(),
                            taskName: action.payload.taskName,
                            taskDesc: action.payload.taskDesc,
                            completed: false,
                        }
                    ]
                }
            )
        case 'MarkCompleted':
            return (
                {
                    ...state, 
                    tasks: state.tasks.map((task)=>task.taskId===action.payload?({...task, completed:!task.completed}):(task)),
                }
            )
        case 'DeleleTask':
            return (
                {
                    ...state, 
                    tasks:state.tasks.filter((task)=>(task.taskId!==action.payload)?true:false)
                }
            )
        case 'UpdateTask':
            return (
                {
                    ...state,
                    tasks:state.tasks.map(task=>(task.taskId===action.payload.taskId)?(
                        {
                            ...task,
                            taskName: action.payload.taskName?action.payload.taskName:task.taskName,
                            taskDesc: action.payload.taskDesc?action.payload.taskDesc:task.taskDesc,
                        }
                    ):task)
                }
            )
        default:
            return state;
    }
}

export const TaskContext = createContext();

function ContextProvider({ children }) {

    const [state, dispatch] = useReducer(taskReducer,initialState)

    useEffect(()=>{
        const tasks = JSON.parse(localStorage.getItem("tasks"))
        if(tasks?.length>0){
            dispatch({type:'SetTasks',payload:tasks})
        }
    },[])
    
    useEffect(()=>{
        localStorage.setItem("tasks", JSON.stringify(state.tasks))
    },[state.tasks])

    return (
        <TaskContext.Provider 
            value={
                { state,dispatch }  
            }>{children}
        </TaskContext.Provider>
    )
}

export default ContextProvider