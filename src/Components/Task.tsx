import {useState} from 'react'

import { CheckCircle, Circle, Trash } from 'phosphor-react'
import styles from './Task.module.css'

interface TaskProps {
  taskContent: string;
  onDeleteTask: (task: string) => void
}

export function Task({taskContent, onDeleteTask}: TaskProps) {
  const [isTaskDone, setIsTaskDone] = useState(true);

  function handleDeleteTask() {
    onDeleteTask(taskContent)
  }

  function toggle(){
    setIsTaskDone(!isTaskDone);
  }

  return (
    <div className={styles.task}>
      {
        isTaskDone ?
        <div className={styles.undoneTask}>
          <Circle
            className={styles.undoneCircle}
            onClick={toggle}
            size={24}
          /> 
          <p>{taskContent}</p>
          <Trash size={14} className={styles.trash}/>
        </div> :
        <div className={styles.doneTasks}>
          <CheckCircle
            className={styles.doneCircle}
            onClick={toggle}
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