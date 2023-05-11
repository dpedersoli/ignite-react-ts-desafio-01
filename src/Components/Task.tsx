import {useState} from 'react'

import { CheckCircle, Circle, Trash } from 'phosphor-react'
import styles from './Task.module.css'

interface TaskProps {
  taskContent: string;
}

export function Task({taskContent}: TaskProps) {
  const [isTaskDone, setIsTaskDone] = useState(false);
  const [tasks, setTasks] = useState([
    {
      content: ""
    }
  ]);

  function toggle(){
    setIsTaskDone(!isTaskDone);
  }

  return (
    <div className={styles.task}>
      {
        isTaskDone ?
        <>
          <Circle
            onClick={toggle}
            size={24}
            className={styles.undoneTask}
          /> 
          <p>{taskContent}</p>
        </> :
        <>
          <CheckCircle
            onClick={toggle}
            size={24}
            weight="fill"
            className={styles.doneTask}
          />
          <p className={styles.doneTaskParagraph}> {taskContent} </p>
        </>
      }
      <Trash size={14} className={styles.trash}/>
    </div>
  )
}