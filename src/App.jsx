import { useState , useEffect} from 'react'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid';


function App() {

  const oldTasks=localStorage.getItem("todos");

  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState(JSON.parse(oldTasks) || [])
  const [showFinished, setshowFinished] = useState(true)

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos])

  const toggleFinished= (e)=>{
    setshowFinished(!showFinished)
  }

  /*const saveToLS = () => {
    localStorage.setItem("todos",JSON.stringify(todos))
  }*/
  
  const handleDelete = (e,id) => {
    let index=todos.findIndex(item=>{
      return item.id===id;
    })
    let newTodos=todos.filter(item=>{
      return item.id!==id
    })
    setTodos(newTodos)
    //saveToLS()
  }
  const handleAdd = () => {
    setTodos([...todos, { id:uuidv4(), todo, isCompleted: false }])
    setTodo("")
    //saveToLS()
  }
  const handleChange = (e) => {
    setTodo(e.target.value)
  }
  const handleEdit = (e,id) => {
    let t=todos.filter(i=>i.id===id)
    setTodo(t[0].todo)
    let newTodos=todos.filter(item=>{
      return item.id!==id
    })
    setTodos(newTodos)
  }

  const handleCheckbox= (e)=>{
    let id=e.target.name;
    let index=todos.findIndex(item=>{
      return item.id === id;
    })
    let newTodos=[...todos];
    newTodos[index].isCompleted=!newTodos[index].isCompleted;
    setTodos(newTodos);
    //saveToLS()
  }

  return (
    <>
      <Navbar />
      <div className="mx-3 md:container md:mx-auto my-5 rounded-xl p-5 bg-violet-100 min-h-[80vh] md:w-1/2">
        <h1 className='font-bold text-center text-xl'>TaskMaster: Perfect place to manage your tasks</h1>
        <div className="addTodo my-5 flex flex-col gap-4 justify-center items-center">
          <h2 className="text-lg font-bold">Add a Todo</h2>
          <input onChange={handleChange} value={todo} type="text" className='w-full rounded-full px-2 py-1' />
          <button onClick={handleAdd} disabled={todo.length<=3} className='bg-violet-800 disabled:bg-violet-700 text-sm font-bold hover:bg-violet-950 p-2 py-1 text-white rounded-md mx-6 w-full'>Save</button>
        </div>
        <input type="checkbox" onChange={toggleFinished} checked={showFinished} /> <span className='text-sm'>Show finished Tasks</span>
        <h2 className='text-3xl font-bold m-4 '>your tasks</h2>
        <div className="todos">
          {todos.length===0 && <div className='m-5'>No pending tasks</div>}
          {todos.map(item => {
            return (showFinished || !item.isCompleted) && <div key={item.id} className="todo flex md:w-1/2 justify-between my-3">
              <div className='flex gap-5'>
              <input name={item.id} onChange={handleCheckbox} type="checkbox" checked={item.isCompleted}  />
              <div className={item.isCompleted ? "line-through " : ""}>{item.todo}</div>
              </div>
              <div className="buttons flex h-full">
                <button onClick={(e)=>handleEdit(e,item.id)} className='bg-violet-800 text-sm font-bold hover:bg-violet-950 p-2 py-1 text-white rounded-md mx-1'>Edit</button>
                <button onClick={(e)=>{handleDelete(e,item.id)}} className='bg-violet-800 text-sm font-bold hover:bg-violet-950 p-2 py-1 text-white rounded-md mx-1'>Delete</button>
              </div>
            </div>
          })}
        </div>
      </div>
    </>
  )
}

export default App
