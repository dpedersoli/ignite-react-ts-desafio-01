import { ChangeEvent, FormEvent, InvalidEvent, useState } from 'react'

import { Header } from './Components/Header'
import { Task } from './Components/Task'

import {Notepad, PlusCircle} from 'phosphor-react'

import styles from './App.module.css'
import './global.css'

export function App() {
  const [tasks, setTasks] = useState([])
  const [ newTaskText, setNewTaskText] = useState('');

  function handleCreateNewTask(event: FormEvent) {
    event.preventDefault()

    setTasks([...tasks, newTaskText ])

    setNewTaskText('')
  }

  function handleNewTaskChange(event: ChangeEvent<HTMLInputElement>) {
    event.target.setCustomValidity('')
    setNewTaskText(event.target.value)
  }

  function handleNewTaskInvalid(event: InvalidEvent<HTMLInputElement>) {
    event.target.setCustomValidity('Esse campo é obrigatório')
  }

  return (
    <>
      <header>
        <Header/>
      </header>

      <main className={styles.main}>

        <form onSubmit={handleCreateNewTask}>
          <input
            type="text"
            placeholder="Adicione uma nova tarefa"
            value={newTaskText}
            onChange={handleNewTaskChange}
            onInvalid={handleNewTaskInvalid}
            required
          />
          <button
            type="submit"
          > 
            Criar
            <PlusCircle size={18}/>
          </button>
        </form>

        <div className={styles.tasksCounter}>
          <p>Tarefas criadas <span>0</span></p>
          <p>Concluídas <span>0</span></p>
        </div>



        {
          tasks.length > 0 ? 
          <div className={styles.tasksTable}>
          {tasks.map(task => {
            return (
              <Task
              taskContent={task}
            />
            )
          })}
          </div> :
          <div className={styles.emptyTasksTable}>
            <Notepad className={styles.img} size={56}/>
            <p>Você ainda não tem tarefas cadastradas</p>
            <p>Crie tarefas e organize seus itens a fazer</p>
          </div>
        }


        
      </main>
    </>
  )
}