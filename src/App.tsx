import {Notepad, PlusCircle} from 'phosphor-react'

import { Header } from './Components/Header'

import styles from './App.module.css'
import './global.css'

export function App() {
  return (
    <>
      <header>
        <Header/>
      </header>

      <main className={styles.main}>

        <form>
          <input
            type="text"
            placeholder="Adicione uma nova tarefa"
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

        <div className={styles.emptyTasksTable}>
          <Notepad className={styles.img} size={56}/>
          <p>Você ainda não tem tarefas cadastradas</p>
          <p>Crie tarefas e organize seus itens a fazer</p>
        </div>
      </main>
    </>
  )
}