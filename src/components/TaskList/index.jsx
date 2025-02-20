import { useDispatch, useSelector } from 'react-redux';
import style from './TaskList.module.css';
import {
  CheckOutlined,
  DeleteFilled,
  DeleteOutlined,
  EllipsisOutlined,
} from '@ant-design/icons';
import TaskItem from '../TaskItem';
import { useEffect, useMemo } from 'react';
import {
  clearActPomo,
  clearAll,
  clearFinished,
  doOne,
} from '../../features/taskSlice';
import { useTranslation } from 'react-i18next';
import { Dropdown } from 'antd';

const TaskList = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.task.tasks);
  const isFinishedMain = useSelector((state) => state.timer.isFinishedMain);
  const items = useMemo(
    () => [
      {
        key: '1',
        label: (
          <div
            className={style.dropdownItem}
            onClick={() => dispatch(clearFinished())}
          >
            <DeleteOutlined />
            {t('Clear finished tasks')}
          </div>
        ),
      },
      {
        key: '2',
        label: (
          <div
            className={style.dropdownItem}
            onClick={() => dispatch(clearActPomo())}
          >
            <CheckOutlined />
            {t('Clear act pomodoros')}
          </div>
        ),
      },
      {
        type: 'divider',
      },
      {
        key: '3',
        label: (
          <div
            className={style.dropdownItem}
            onClick={() => dispatch(clearAll())}
          >
            <DeleteFilled />
            {t('Clear all tasks')}
          </div>
        ),
      },
    ],
    [t, dispatch]
  );

  useEffect(() => {
    if (isFinishedMain) {
      dispatch(doOne());
    }
  }, [isFinishedMain, dispatch]);

  console.log('TaskList');

  return (
    <div className={style.container}>
      <div className={style.header}>
        <span>{t('Tasks')}</span>
        <Dropdown
          menu={{
            items,
          }}
          trigger={['click']}
          placement='bottomRight'
        >
          <div className={style.more}>
            <EllipsisOutlined />
          </div>
        </Dropdown>
      </div>
      <ul className={style.taskList}>
        {tasks.map((task) => (
          <TaskItem key={task.id} task={task} />
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
