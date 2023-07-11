import { ChangeEvent, FormEvent, useEffect, useState } from 'react'

import { Header } from './Components/Header'
import { Task } from './Components/Task'

import { Notepad, PlusCircle } from 'phosphor-react'

import styles from './App.module.css'
import './global.css'

export function App() {
  const [tasks, setTasks] = useState<string[]>([]);
  const [newTaskText, setNewTaskText] = useState('');
  const [doneTasksCounter, setDoneTasksCounter] = useState(0);
  const [totalOfTasks, setTotalOfTasks] = useState(tasks.length)
  const [isTaskExists, setIsTaskExists] = useState(false)
  const [isInputEmpty, setIsInputEmpty] = useState(false);
  const [taskStatus, setTaskStatus] = useState('undone')

  const localStorageTasksList = JSON.stringify(tasks)
  const localStorageTotalTasks = JSON.stringify(totalOfTasks)
  const storageTasksList = localStorage.getItem('@to-do-list:tasks-list-1.0.0')
  const storageTotalTasks = localStorage.getItem('@to-do-list:total-tasks-1.0.0')

  useEffect(() => {
    if (tasks.length >= 0) {
      localStorage.setItem('@to-do-list:tasks-list-1.0.0', localStorageTasksList)
      localStorage.setItem('@to-do-list:total-tasks-1.0.0', localStorageTotalTasks)
    }
  }, [tasks, totalOfTasks])

  useEffect(() => {
    if (storageTasksList) {
      setTasks(JSON.parse(storageTasksList))

      if (storageTotalTasks) {
        setTotalOfTasks(JSON.parse(storageTotalTasks))
      }
    }
  }, [])

  function handleCreateNewTask(event: FormEvent) {
    event.preventDefault()

    if (newTaskText.length > 0) {

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

    if (doneTasksCounter >= tasks.length) {
      setDoneTasksCounter(doneTasksCounter - 1)
    }
  }

  function taskCounter(taskToCount: boolean) {
    if (!taskToCount) {
      setDoneTasksCounter(doneTasksCounter + 1)
    } else if (taskToCount) {
      setDoneTasksCounter(doneTasksCounter - 1)
    }
  }

  ////////////////////////////////////////////////////
  function handleTaskStatus(newValue: string) {
    setTaskStatus(newValue);
  }
  ////////////////////////////////////////////////////

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

        {isInputEmpty &&
          <p className={styles.errorMessage} >Esse campo é obrigatório</p>
        }

        {isTaskExists &&
          <p className={styles.errorMessage} >Essa tarefa já existe na lista. Crie uma nova</p>
        }

        <div className={styles.tasksCounter}>
          <p>Tarefas criadas <span>{totalOfTasks}</span></p>
          <p>Concluídas <span>{doneTasksCounter} de {tasks.length}</span></p>
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
                    taskStatus={taskStatus}
                    onTaskStatusChange={handleTaskStatus}
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
