import { message, Modal, Switch } from 'antd';
import {
  CloseOutlined,
  ClockCircleOutlined,
  InfoCircleFilled,
  GlobalOutlined,
  CheckSquareOutlined,
} from '@ant-design/icons';
import style from './Setting.module.css';
import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeSetting } from '../../features/timerSlice';
import { changeSetting as taskChangeSetting } from '../../features/taskSlice';
import { changeLanguage } from '../../features/settingSlice';
import { useTranslation } from 'react-i18next';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const languages = [
  {
    code: 'en',
    name: 'English',
  },
];

const codes = languages.map((language) => language.code);

const Setting = ({ isOpen, onClose }) => {
  const { t } = useTranslation();
  const SettingSchema = useMemo(
    () =>
      z.object({
        pomodoro: z.number({ message: t('Invalid pomodoro') }).min(0.1, {
          message: t('Pomodoro must be greater than or equal 0.1'),
        }),
        shortBreak: z.number({ message: t('Invalid short break') }).min(0, {
          message: t('Short break must be greater than or equal 0'),
        }),
        longBreak: z
          .number({ message: t('Invalid long break') })
          .min(0, { message: t('Long break must be greater than or equal 0') }),
        longBreakInterval: z
          .number({
            message: t('Invalid long break interval'),
          })
          .int({
            message: t('Invalid long break interval'),
          })
          .min(0, {
            message: t('Long break interval must be greater than or equal 0'),
          }),
        language: z.enum(codes, { message: 'Invalid language' }),
      }),
    [t]
  );

  const [messageApi, contextHolder] = message.useMessage();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: zodResolver(SettingSchema),
  });

  const [main, setMain] = useState(
    useSelector((state) => state.timer.setting.main)
  );
  const [shortBreak, setShortBreak] = useState(
    useSelector((state) => state.timer.setting.shortBreak)
  );
  const [longBreak, setLongBreak] = useState(
    useSelector((state) => state.timer.setting.longBreak)
  );
  const [autoStartBreak, setAutoStartBreak] = useState(
    useSelector((state) => state.timer.setting.autoStartBreak)
  );
  const [autoStartPomo, setAutoStartPomo] = useState(
    useSelector((state) => state.timer.setting.autoStartPomo)
  );
  const [longBreakInterval, setLongBreakInterval] = useState(
    useSelector((state) => state.timer.setting.longBreakInterval)
  );
  const [autoCheckTasks, setAutoCheckTasks] = useState(
    useSelector((state) => state.task.setting.autoCheckTasks)
  );
  const [autoSwitchTasks, setAutoSwitchTasks] = useState(
    useSelector((state) => state.task.setting.autoSwitchTasks)
  );
  const lang = useSelector((state) => state.setting.language);
  const [language, setLanguage] = useState(lang);
  const dispatch = useDispatch();

  console.log('Setting');

  const onOk = () => {
    dispatch(
      changeSetting({
        main: +main,
        shortBreak: +shortBreak,
        longBreak: +longBreak,
        autoStartBreak,
        autoStartPomo,
        longBreakInterval: +longBreakInterval,
      })
    );
    dispatch(
      taskChangeSetting({
        autoCheckTasks,
        autoSwitchTasks,
      })
    );
    onClose();
  };

  useEffect(() => {
    setValue('main', main);
    setValue('shortBreak', shortBreak);
    setValue('longBreak', longBreak);
    setValue('autoStartBreak', autoStartBreak);
    setValue('autoStartPomo', autoStartPomo);
    setValue('longBreakInterval', longBreakInterval);
    setValue('autoCheckTasks', autoCheckTasks);
    setValue('autoSwitchTasks', autoSwitchTasks);
    setValue('language', language);
  }, [
    setValue,
    main,
    shortBreak,
    longBreak,
    autoStartBreak,
    autoStartPomo,
    longBreakInterval,
    autoCheckTasks,
    autoSwitchTasks,
    language,
  ]);

  useEffect(() => {
    for (const error of Object.values(errors).values()) {
      messageApi.error(error.message);
    }
  }, [errors, messageApi]);

  return (
    <Modal
      width={400}
      title={<span className={style.modalTitle}>{t('Setting')}</span>}
      maskClosable
      onCancel={handleSubmit(onOk)}
      onOk={handleSubmit(onOk)}
      closeIcon={
        <CloseOutlined onClick={onClose} className={style.closeIcon} />
      }
      open={isOpen}
      cancelButtonProps={{ className: style.cancelButton }}
      okButtonProps={{ className: style.okButton }}
      className={style.modal}
      classNames={{
        content: style.modalContent,
        header: style.modalHeader,
        body: style.modalBody,
        footer: style.modalFooter,
      }}
    >
      {contextHolder}
      <section className={style.section}>
        <div className={style.title}>
          <ClockCircleOutlined className={style.titleIcon} />
          {t('Timer')}
        </div>
        <div className={style.vertical}>
          <span className={style.subTitle}>{t('Time (minutes)')}</span>
          <div className={style.times}>
            <div className={style.item}>
              <label>Pomodoro</label>
              <input
                type='number'
                min={0}
                step={1}
                className={style.inputNumber}
                value={main}
                {...register('pomodoro', {
                  valueAsNumber: true,
                  onChange: (e) => setMain(e.target.value),
                })}
              />
            </div>
            <div className={style.item}>
              <label>{t('Short Break')}</label>
              <input
                type='number'
                min={0}
                step={1}
                value={shortBreak}
                className={style.inputNumber}
                {...register('shortBreak', {
                  valueAsNumber: true,
                  onChange: (e) => setShortBreak(e.target.value),
                })}
              />
            </div>
            <div className={style.item}>
              <label>{t('Long Break')}</label>
              <input
                type='number'
                value={longBreak}
                min={0}
                step={1}
                className={style.inputNumber}
                {...register('longBreak', {
                  valueAsNumber: true,
                  onChange: (e) => setLongBreak(e.target.value),
                })}
              />
            </div>
          </div>
        </div>
        <div className={style.horizontal}>
          <span>{t('Auto Start Breaks')}</span>
          <Switch
            className={style.switch}
            value={autoStartBreak}
            onChange={setAutoStartBreak}
          />
        </div>
        <div className={style.horizontal}>
          <span>{t('Auto Start Pomodoros')}</span>
          <Switch
            className={style.switch}
            value={autoStartPomo}
            onChange={setAutoStartPomo}
          />
        </div>
        <div className={style.horizontal}>
          <span>{t('Long Break interval')}</span>
          <input
            type='number'
            value={longBreakInterval}
            className={style.inputNumber}
            style={{ width: '70px' }}
            min={0}
            step={1}
            {...register('longBreakInterval', {
              valueAsNumber: true,
              onChange: (e) => setLongBreakInterval(e.target.value),
            })}
          />
        </div>
      </section>

      <div className={style.seperator}></div>

      <section className={style.section}>
        <div className={style.title}>
          <CheckSquareOutlined className={style.titleIcon} />
          {t('Task')}
        </div>
        <div className={style.horizontal}>
          <span>
            {t('Auto Check Tasks')}
            <InfoCircleFilled className={style.infoIcon} />
          </span>
          <Switch
            className={style.switch}
            value={autoCheckTasks}
            onChange={setAutoCheckTasks}
          />
        </div>
        <div className={style.horizontal}>
          <span>
            {t('Auto Switch Tasks')}
            <InfoCircleFilled className={style.infoIcon} />
          </span>
          <Switch
            className={style.switch}
            value={autoSwitchTasks}
            onChange={setAutoSwitchTasks}
          />
        </div>
      </section>

      <div className={style.seperator}></div>

      <section className={style.section}>
        <div className={style.title}>
          <GlobalOutlined className={style.titleIcon} />
          {t('Language')}
        </div>
        <div className={style.horizontal}>
          <span>{t('Language')}</span>
          <select
            className={style.select}
            value={language}
            {...register('language', {
              onChange: (e) => {
                console.log(e.target.value);
                setLanguage(e.target.value);
                dispatch(changeLanguage(e.target.value));
              },
            })}
          >
            {languages.map((language) => (
              <option key={language.code} value={language.code}>
                {language.name}
              </option>
            ))}
          </select>
        </div>
      </section>
    </Modal>
  );
};

export default Setting;
