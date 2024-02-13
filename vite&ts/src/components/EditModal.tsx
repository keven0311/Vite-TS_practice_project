import { Modal , Box, Typography} from "@mui/material";

interface EditModalProps{
    targetTodo:string;
    open:boolean;
    setOpen:(value:boolean) => void;
    modalInput:string;
    setModalInput:(value:string) => void
    todos:{name:string, completed:boolean}[]
    setTodos:(value:{name:string; completed:boolean}[]) => void
}

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "50%",
    height:"25%",
    bgcolor: 'primary.main',
    color: "",
    border: '2px solid #000',
    borderColor:"grey.200",
    borderRadius:3,
    boxShadow: 24,
    p: 4,
    display:"grid",
    gridAutoRows:"80px",
    textAlign:"center",
    
  };

const EditModal:React.FC<EditModalProps> = ({targetTodo, open, setOpen, modalInput, setModalInput, todos, setTodos}) => {

    const handleClose = () => setOpen(false)

    const handleEditButton = () => {

        const newTodo:{name:string, completed:boolean} = {
            name:modalInput,
            completed:false
        }
        const todosExceptTarget:{name:string, completed:boolean}[] = todos.filter((todo) => todo.name !== targetTodo)
        const newTodoList:{name:string, completed:boolean}[] = [newTodo, ...todosExceptTarget]
        setTodos(newTodoList)
        setModalInput("")
        setOpen(!open)
    }

    // addEventListener to the modal input element.
    // user can pree "Enter" key to edit todo.
    const input = document.getElementById("modal_input")
    input?.addEventListener("keypress", (e) => {
        if(e.key == "Enter"){
                e.preventDefault();
                document.getElementById("modal_button")?.click()
        }
    })

  return (
    <Modal
        open={open}
        onClose={handleClose}
    >
        <Box sx={style}>
            <Typography>
                <span className="modal_todo_name">{targetTodo}</span>
            </Typography>
            <div className="modal_input_button_div">
                <input 
                    id="modal_input"
                    className="modal_input"
                    placeholder="What's your new plan?"
                    value={modalInput}
                    onChange={(e) => setModalInput(e.target.value)}
                />
                <button
                    id="modal_button"
                    className="modal_button"
                    onClick={handleEditButton}
                >
                    Edit
                </button>
            </div>
        </Box>
    </Modal>
  )
}

export default EditModal