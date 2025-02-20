import { Button, Tabs } from 'antd';
import style from './TimerContainer.module.css';
import Timer from '../Timer';
import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeTab, pause, skip, start } from '../../features/timerSlice';
import { StepForwardOutlined } from '@ant-design/icons';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

const TimerContainer = () => {
  const { t } = useTranslation();
  const items = useMemo(
    () => [
      {
        key: '1',
        name: 'main',
        label: 'Pomodoro',
        color: '--primary-bg-color',
        siteIcon: 'favicon-main.png',
      },
      {
        key: '2',
        name: 'shortBreak',
        label: t('Short Break'),
        color: '--secondary-bg-color',
        siteIcon: 'favicon-short-green.png',
      },
      {
        key: '3',
        name: 'longBreak',
        label: t('Long Break'),
        color: '--third-bg-color',
        siteIcon: 'favicon-long-blue.png',
      },
    ],
    [t]
  );
  const dispatch = useDispatch();
  const isRunning = useSelector((state) => state.timer.isRunning);
  const tab = useSelector((state) => state.timer.tab);

  console.log('TimerContainer');

  const onChangeTab = (tabIndex) => {
    dispatch(changeTab(items[tabIndex - 1].name));
  };

  useEffect(() => {
    const item = items.find((item) => item.name === tab);
    document.documentElement.style.backgroundColor = `var(${item.color})`;
    document.getElementById('favicon').setAttribute('href', item.siteIcon);
  }, [tab, items, isRunning]);

  const getColor = () => {
    return `var(${getTab().color})`;
  };

  const getTab = () => {
    return items.find((item) => item.name === tab);
  };

  return (
    <div className={style.container}>
      <Tabs
        onChange={onChangeTab}
        defaultActiveKey='1'
        items={items}
        centered
        type='card'
        activeKey={getTab().key}
        tabBarGutter={0}
      />

      <Timer />

      <div className={style.actions}>
        <Button
          className={style.actionButton}
          style={{ color: getColor() }}
          color='inherit'
          onClick={() => {
            if (isRunning) {
              dispatch(pause());
            } else {
              dispatch(start());
            }
          }}
        >
          {isRunning ? t('Pause') : t('Start')}
        </Button>

        <StepForwardOutlined
          onClick={() => dispatch(skip())}
          className={classNames(
            style.skipIcon,
            isRunning ? style.visible : null
          )}
        />
      </div>
    </div>
  );
};

export default TimerContainer;
