import { ChangeEvent, FormEvent, useEffect, useState } from 'react'

import { Header } from './Components/Header'
import { Task } from './Components/Task'

import { Notepad, PlusCircle } from 'phosphor-react'

import styles from './App.module.css'
import './global.css'

export function App() {
  const [tasks, setTasks] = useState<string[]>([]);
  const [newTaskText, setNewTaskText] = useState('');
  const [doneTasks, setDoneTasks] = useState(0);
  const [totalOfTasks, setTotalOfTasks] = useState(0) //mexer nisso p/ contar direito dps do 'getItem'
  const [isTaskExists, setIsTaskExists] = useState(false)
  const [isInputEmpty, setIsInputEmpty] = useState(false);
  
  useEffect(() => {
    const localStorageJSON = JSON.stringify(tasks)
    
    if(tasks.length > 0){ //consertar isso p/ ">= 0"
      localStorage.setItem('@to-do-list:1.0.0', localStorageJSON)
    }
  },[tasks])
  
  useEffect(() => {
    const storageTasks = localStorage.getItem('@to-do-list:1.0.0')
    
    if(storageTasks){
      setTasks(JSON.parse(storageTasks))
    }
  },[])
    
  function handleCreateNewTask(event: FormEvent) {
    event.preventDefault()
    
    if(newTaskText.length > 0) {

      if (!checkIfTaskExists(newTaskText)) {

        setTasks([...tasks, newTaskText])

        setTotalOfTasks(totalOfTasks + 1)
        
        setNewTaskText('')

        setIsInputEmpty(false)
        setIsTaskExists(false)
      } else {
        setIsTaskExists(true)
        setIsInputEmpty(false)
      } 
      
    } else {
      setIsInputEmpty(true)
      setIsTaskExists(false)
    }
  }

  function checkIfTaskExists(curentTaskInput: string) {
    for (let i = 0; i < tasks.length; i++) {

      if (curentTaskInput == tasks[i]) {
        return true;
      }
    }
  }

  function handleNewTaskChange(event: ChangeEvent<HTMLInputElement>) {
    setNewTaskText(event.target.value)
  }

  function deleteTask(taskToDelete: string) {
    const tasksWithoutDeletedOne = tasks.filter(task => {
      return task != taskToDelete
    })

    setTasks(tasksWithoutDeletedOne)

    if(doneTasks >= tasks.length) {
      setDoneTasks(doneTasks - 1)
    }
  }

  function taskCounter(taskToCount: boolean) {
    if(!taskToCount){
      setDoneTasks(doneTasks - 1)
    } else if (taskToCount){
      setDoneTasks(doneTasks + 1)
    }
  }

  return (
    <>
      <header>
        <Header />
      </header>

      <main className={styles.main}>

        <form onSubmit={handleCreateNewTask}>
          <input
            type="text"
            placeholder="Adicione uma nova tarefa"
            value={newTaskText}
            onChange={handleNewTaskChange}
          />
          <button
            type="submit"
          >
            Criar
            <PlusCircle size={18} />
          </button>
        </form>

        { isInputEmpty &&
          <p className={styles.errorMessage} >Esse campo é obrigatório</p>
        }

        { isTaskExists &&
          <p className={styles.errorMessage} >Essa tarefa já existe na lista. Crie uma nova</p>
        }

        <div className={styles.tasksCounter}>
          <p>Tarefas criadas <span>{totalOfTasks}</span></p>
          <p>Concluídas <span>{doneTasks} de {tasks.length}</span></p>
        </div>

        {
          tasks.length > 0 ?
            <div className={styles.tasksTable}>
              {tasks.map((task) => {
                return (
                  <Task
                    onTaskCount={taskCounter}
                    key={task}
                    taskContent={task}
                    onDeleteTask={deleteTask}
                  />
                )
              })}
            </div> :
            <div className={styles.emptyTasksTable}>
              <Notepad className={styles.img} size={56} />
              <p>Você ainda não tem tarefas cadastradas</p>
              <p>Crie tarefas e organize seus itens a fazer</p>
            </div>
        }

      </main>
    </>
  )
}
