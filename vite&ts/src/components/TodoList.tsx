import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { todosList, Todos } from '../ulti/ultility';
import { useState } from 'react';
import EditModal from './EditModal';



function TodoList() {
    const [todos, setTodos] = useState(todosList)
    const [input, setInput ] = useState("")
    const [open, setOpen] = useState(false)
    const [modalInput, setModalInput] = useState("")
    const [targetTodo, setTargetTodo] = useState("")
    

    function handleAdd():void{
        const todo:Todos = {
            name:input,
            completed:false
        }
        const newTodosList:Todos[] = [...todos,todo]
        setTodos(newTodosList)
        setInput("")
    }
    
    function handleEdit(name:string):void{
        setOpen(true)
        setTargetTodo(name)
    }

    function handleDelete(name:string):void{
        const newTodosList:Todos[] = [...todos].filter((todo) => todo.name !== name)
        setTodos(newTodosList)
    }
    

  return (
    <div className='todo_list_container'>
        <h3>Your tasks</h3>
        <div className='todo_list_input_div'>
            <input 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder=" What's the task?"/>
            <button
                onClick={handleAdd}
            >add</button>
        </div>
            <EditModal targetTodo={targetTodo} open={open} setOpen={setOpen} modalInput={modalInput} setModalInput={setModalInput} todos={todos} setTodos={setTodos}/>
        <ul>
            {todos.map(todo => {
                return (
                    
                <li key={todo.name}>
                    <span>{todo.name}</span>
                    <button 
                        onClick={() => handleEdit(todo.name)}
                        >
                        <EditIcon sx={{fontSize: 30}}/>
                    </button>
                    <button
                        onClick={() => handleDelete(todo.name)}
                        >
                        <DeleteForeverIcon sx={{fontSize:30}}/>
                </button>
                </li>
                
            )})}      
        </ul>

    </div>
  )
}

export default TodoList