import {useState} from 'react'

import { CheckCircle, Circle, Trash } from 'phosphor-react'
import styles from './Task.module.css'

interface TaskProps {
  //// id: number -> "how to change the property value of only one item of an array through a component using react with typescript"
  taskContent: string;
  onDeleteTask: (task: string) => void
  onTaskCount: (task: boolean) => void
  taskStatus: string
  onTaskStatusChange: (newValue: string) => void
}

export function Task({taskContent, onDeleteTask, onTaskCount, taskStatus, onTaskStatusChange}: TaskProps) {
  const [isTaskDone, setTaskDone] = useState(false);


  function handleDeleteTask() {
    onDeleteTask(taskContent)
  }

  function handleTaskCheck(){
    setTaskDone(!isTaskDone);
    onTaskCount(isTaskDone);

    if(taskStatus == 'undone'){
      onTaskStatusChange('done')
    } else if(taskStatus == 'done'){
      onTaskStatusChange('undone')
    }
  }

  return (
    <div className={styles.task}>
        <div className={styles.undoneTask}>
          { taskStatus == 'undone' &&
              <>
                <Circle
                  className={styles.undoneCircle}
                  onClick={handleTaskCheck}
                  size={24}
                  />
                <p>{taskContent}</p>
              </>
            }
            { taskStatus == 'done' &&
              <>
                <CheckCircle
                  className={styles.doneCircle}
                  onClick={handleTaskCheck}
                  size={24}
                  weight="fill"
                />
                <p className={styles.doneTask}> {taskContent} </p>
              </>
            }
          <button onClick={handleDeleteTask} title="deletar tarefa">
            <Trash size={14} className={styles.trash}/>
          </button>
        </div>
    </div>
  )
}