import {useState} from 'react'

import { CheckCircle, Circle, Trash } from 'phosphor-react'
import styles from './Task.module.css'

interface TaskProps {
  taskContent: string;
  onDeleteTask: (task: string) => void
  onTaskCount: (task: boolean) => void
  onIsUndoneTask: (task: boolean) => void
  taskStatus: 'done' | 'undone'
}

export function Task({taskContent, onDeleteTask, onTaskCount, onIsUndoneTask, taskStatus = 'undone'}: TaskProps) {
  const [taskUndone, setTaskUndone] = useState(true);

  function handleDeleteTask() {
    onDeleteTask(taskContent)
  }

  //////////////////////////////////////////////////// Aqui precisa mudar o estilo (OK!); 'onIsUndoneTask' precisa p/ receber o valor dentro do componente (essencial para o LS) (OK!); 'onTaskCount' também precisará de info pro LS
  function handleTaskCheck(){
    setTaskUndone(!taskUndone);
    // onIsUndoneTask(taskUndone)
    onTaskCount(taskUndone);
  }
  ///////////////////////////////////////////////////

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