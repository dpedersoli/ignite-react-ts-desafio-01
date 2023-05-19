import {useState} from 'react'

import { CheckCircle, Circle, Trash } from 'phosphor-react'
import styles from './Task.module.css'

interface TaskProps {
  taskContent: string;
  onDeleteTask: (task: string) => void
  onTaskChecked: (task: boolean) => void
}

export function Task({taskContent, onDeleteTask, onTaskChecked}: TaskProps) {
  const [isTaskDone, setIsTaskDone] = useState(true);

  function handleDeleteTask() {
    onDeleteTask(taskContent)
  }

  function handleTaskCheck(){
    onTaskChecked(!isTaskDone);
  }

  return (
    <div className={styles.task}>
      {
        isTaskDone ?
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
        : <div className={styles.doneTasks}>
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