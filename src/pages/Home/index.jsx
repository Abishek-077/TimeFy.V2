import AddTask from '../../components/AddTask/AddTask';
import FinishedCounter from '../../components/FinishedCounter';
import Stats from '../../components/Stats';
import TaskList from '../../components/TaskList';
import TimerContainer from '../../components/TimerContainer';
import style from './Home.module.css';

const Home = () => {
  return (
    <div className={style.container}>
      <TimerContainer />

      <FinishedCounter />

      <TaskList />

      <AddTask />

      <Stats />
    </div>
  );
};

export default Home;
