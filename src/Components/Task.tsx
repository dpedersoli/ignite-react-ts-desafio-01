import {useState} from 'react'

import { CheckCircle, Circle, Trash } from 'phosphor-react'
import styles from './Task.module.css'

interface TaskProps {
  taskContent: string;
  onDeleteTask: (task: string) => void
  onTaskCount: (task: boolean) => void
}

export function Task({taskContent, onDeleteTask, onTaskCount}: TaskProps) {
  const [isTaskUndone, setIsTaskUndone] = useState(true);

  function handleDeleteTask() {
    onDeleteTask(taskContent)
  }

  function handleTaskCheck(){
    setIsTaskUndone(!isTaskUndone);
    onTaskCount(isTaskUndone);
  }

  return (
    <div className={styles.task}>
      {
        isTaskUndone ?
        <div className={styles.undoneTask}>
          <Circle
            className={styles.undoneCircle}
            onClick={handleTaskCheck}
            size={24}
          /> 
          <p>{taskContent}</p>
          <button onClick={handleDeleteTask} title="deletar tarefa">
            <Trash size={14} className={styles.trash}/>
          </button>
        </div>
        : <div className={styles.doneTask}>
          <CheckCircle
            className={styles.doneCircle}
            onClick={handleTaskCheck}
            size={24}
            weight="fill"
          />
          <p className={styles.doneTaskParagraph}> {taskContent} </p>
          <button onClick={handleDeleteTask} title="deletar tarefa">
            <Trash size={14} className={styles.trash}/>
          </button>
        </div>
      }
    </div>
  )
}