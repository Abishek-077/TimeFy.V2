import classNames from 'classnames';
import style from './TaskItem.module.css';
import { CheckCircleOutlined, EllipsisOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { check, select } from '../../features/taskSlice';
import { useState } from 'react';
import TaskForm from '../TaskForm';

const TaskItem = ({ task }) => {
  const [isEditing, setIsEditing] = useState(false);
  const selectedTask = useSelector((state) => state.task.selectedTask);
  const dispatch = useDispatch();

  console.log('TaskItem');

  return isEditing ? (
    <TaskForm
      isEditing={true}
      task={task}
      onClose={() => setIsEditing(false)}
    />
  ) : (
    <li
      className={classNames(
        style.taskItem,
        selectedTask?.id === task.id ? style.selected : null
      )}
      key={task.id}
      onClick={() => dispatch(select(task))}
    >
      <div className={style.status}>
        <div className={style.statusLeft}>
          <CheckCircleOutlined
            onClick={(e) => {
              e.stopPropagation();
              dispatch(check(task));
            }}
            className={classNames(
              style.checkIcon,
              task.done ? style.done : null
            )}
            width={22}
            height={22}
          />
          <span
            className={classNames(
              style.title,
              task.done ? style.titleDone : null
            )}
          >
            {task.title}
          </span>
        </div>
        <div className={style.statusRight}>
          <span className={style.doneTime}>
            {task.act} <span>/ {task.est}</span>{' '}
          </span>
          <EllipsisOutlined
            className={style.more}
            onClick={() => setIsEditing(true)}
          />
        </div>
      </div>
      {task.note && (
        <div className={style.noteContainer}>
          <div className={style.noteWrapper}>
            <p className={style.note}>{task.note}</p>
          </div>
        </div>
      )}
    </li>
  );
};

export default TaskItem;