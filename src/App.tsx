import { ChangeEvent, FormEvent, useState } from 'react'

import { Header } from './Components/Header'
import { Task } from './Components/Task'

import { Notepad, PlusCircle } from 'phosphor-react'

import styles from './App.module.css'
import './global.css'

export function App() {
  const [tasks, setTasks] = useState<string[]>([]);
  const [newTaskText, setNewTaskText] = useState('');
  const [error, setError] = useState(false);

  function handleCreateNewTask(event: FormEvent) {
    event.preventDefault()

      if(newTaskText.length > 0) {
        setTasks([...tasks, newTaskText])

        setNewTaskText('')

        setError(false)
      } else {
        setError(true)
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
  }

  function checkTask(taskToCheck: boolean){
    return !taskToCheck
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

        { error &&
          <p className={styles.errorMessage} >Esse campo é obrigatório</p>
        }

        <div className={styles.tasksCounter}>
          <p>Tarefas criadas <span>{tasks.length}</span></p>
          <p>Concluídas <span>0 de {tasks.length}</span></p>
        </div>

        {
          tasks.length > 0 ?
            <div className={styles.tasksTable}>
              {tasks.map((task, id) => {
                return (
                  <Task
                    key={id}
                    taskContent={task}
                    onDeleteTask={deleteTask}
                    onTaskChecked={checkTask}
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

// 1. crio uma array de conteúdos(p) das tasks com valor inicial[] FEITO
// 2. valor do input p / dentro do array de task que terá o conteúdo das task FEITO
// 3. dou um map nas tasks FEITO
// 4. se array de task > 0 mostra as tasks, se não, mostra a tela estilizada sem tarefa FEITO
// 5. mostrar erro de caracteres FEITO

// 6. função de deletar FEITO

// 7. consertar a função de tarefa pronta/não-pronta FEITO COM FALHAS

// 8. contador de tarefas criadas FEITO
// 9. contador de tarefas concluídas 
// 9.1 enviar o 'true'/'false' de cada tarefa KEY