import {useState} from 'react'

import { CheckCircle, Circle, Trash } from 'phosphor-react'
import styles from './Task.module.css'

interface TaskProps {
  taskContent: string;
  onDeleteTask: (task: string) => void
  onTaskCount: (task: boolean) => void
  onIsUnTaskDone: (task: boolean) => void
}

export function Task({taskContent, onDeleteTask, onTaskCount, onIsUnTaskDone}: TaskProps) {
  const [taskUndone, setTaskUndone] = useState(true);

  function handleDeleteTask() {
    onDeleteTask(taskContent)
  }

  //////////////////////////////////////////////////// Será que preciso adicionar algum retorno aqui? Talvez eu deva fazer as alterações de estado onde a função é criada e aqui ele somente recebe o valor sem mudar estado ('taskUndone')
  function handleTaskCheck(){
    onIsUnTaskDone(taskUndone)
    // setTaskUndone(!taskUndone);
    onTaskCount(taskUndone);
  }
  ////////////////////////////////////////////////////

  return (
    <div className={styles.task}>
        <div className={styles.undoneTask}>
          { taskUndone ?
            <Circle
              className={styles.undoneCircle}
              onClick={handleTaskCheck}
              size={24}
            />:
            <CheckCircle
              className={styles.doneCircle}
              onClick={handleTaskCheck}
              size={24}
              weight="fill"
            />
          }
          <p>{taskContent}</p>
          <button onClick={handleDeleteTask} title="deletar tarefa">
            <Trash size={14} className={styles.trash}/>
          </button>
        </div>
    </div>
  )
}