import { useDispatch, useSelector } from 'react-redux';
import style from './Timer.module.css';
import { useEffect, useRef } from 'react';
import { decrease } from '../../features/timerSlice';

const descriptions = {
  main: 'Time to focus!',
  shortBreak: 'Time for a break!',
  longBreak: 'Time for a break!',
};

const Timer = () => {
  const timer = useSelector((state) => state.timer[state.timer.tab].time);
  const tab = useSelector((state) => state.timer.tab);
  const selectedTask = useSelector((state) => state.task.selectedTask);
  const { startAt, isRunning } = useSelector((state) => state.timer);
  const dispatch = useDispatch();
  const timeId = useRef();

  console.log('Timer');

  useEffect(() => {
    timeId.current = setInterval(() => {
      if (isRunning) {
        dispatch(decrease());
      } else {
        clearInterval(timeId.current);
        document
          .getElementById('favicon')
          .setAttribute('href', 'favicon-gray.png');
      }
    }, 1000);

    return () => clearInterval(timeId.current);
  }, [isRunning, dispatch]);

  const getDescription = () => {
    return (selectedTask && selectedTask.title) || descriptions[tab];
  };

  const getTimeFormat = () => {
    const minutes = parseInt(Math.abs(timer - startAt) / (1000 * 60));
    const seconds = parseInt((Math.abs(timer - startAt) / 1000) % 60);
    return `${minutes < 10 ? '0' + minutes : minutes}:${
      seconds < 10 ? '0' + seconds : seconds
    }`;
  };

  document.title = `${getTimeFormat()} - ${getDescription()}`;

  return <div className={style.timer}>{getTimeFormat()}</div>;
};

export default Timer;
