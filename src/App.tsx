import {PlusCircle} from 'phosphor-react'

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

        <div className={styles.tasksTable}>

        </div>
      </main>
    </>
  )
}