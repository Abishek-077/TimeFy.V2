import { Button, ConfigProvider } from 'antd';
import style from './AddTask.module.css';
import { PlusCircleFilled } from '@ant-design/icons';
import { useState } from 'react';
import TaskForm from '../TaskForm';
import { useDispatch } from 'react-redux';
import { addTask } from '../../features/taskSlice'; // Import addTask action
import { useTranslation } from 'react-i18next';

const AddTask = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [isAdding, setIsAdding] = useState(false);

  const openForm = () => {
    setIsAdding(true);
  };

  const handleCloseForm = () => {
    setIsAdding(false);
  };

  const handleAddTask = (taskData) => {
    dispatch(addTask(taskData)); // Dispatch the addTask action
    handleCloseForm();
  };

  return (
    <ConfigProvider theme={{ components: { Button: { defaultHoverBg: 'transparent' } } }}>
      {isAdding ? (
        <TaskForm onClose={handleCloseForm} onSave={handleAddTask} /> // Pass onSave prop
      ) : (
        <Button className={style.addButton} type='dashed' icon={<PlusCircleFilled />} onClick={openForm}>
          {t('Add Task')}
        </Button>
      )}
    </ConfigProvider>
  );
};

export default AddTask;


// import { Button, ConfigProvider } from 'antd';
// import style from './AddTask.module.css';
// import { PlusCircleFilled } from '@ant-design/icons';
// import { useEffect, useRef, useState } from 'react';
// import TaskForm from '../TaskForm';
// import { useTranslation } from 'react-i18next';

// const AddTask = () => {
//   const { t } = useTranslation();
//   const [isAdding, setIsAdding] = useState(false);
//   const formRef = useRef(null);

//   console.log('AddTask');

//   const openForm = () => {
//     setIsAdding(true);
//   };

//   useEffect(() => {
//     const handleClickOutside = (e) => {
//       if (formRef.current && !formRef.current.contains(e.target)) {
//         setIsAdding(false);
//       }
//     };

//     if (isAdding) {
//       window.scrollTo({
//         top: formRef.current?.getBoundingClientRect().top ?? 0,
//         behavior: 'smooth',
//       });

//       document.addEventListener('mousedown', handleClickOutside);
//     }

//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, [isAdding]);

//   return (
//     <ConfigProvider
//       theme={{ components: { Button: { defaultHoverBg: 'transparent' } } }}
//     >
//       {isAdding ? (
//         <TaskForm ref={formRef} onClose={() => setIsAdding(false)} />
//       ) : (
//         <Button
//           className={style.addButton}
//           type='dashed'
//           icon={<PlusCircleFilled />}
//           iconPosition='start'
//           onClick={openForm}
//         >
//           {t('Add Task')}
//         </Button>
//       )}
//     </ConfigProvider>
//   );
// };

// export default AddTask;

// // import { Button, ConfigProvider } from 'antd';
// // import style from './AddTask.module.css';
// // import { PlusCircleFilled } from '@ant-design/icons';
// // import { useEffect, useRef, useState } from 'react';
// // import TaskForm from '../TaskForm';
// // import { useTranslation } from 'react-i18next';

// // const AddTask = () => {
// //   const { t } = useTranslation();
// //   const [isAdding, setIsAdding] = useState(false);
// //   const formRef = useRef(null);

// //   console.log('AddTask');

// //   const openForm = () => {
// //     setIsAdding(true);
// //   };

// //   useEffect(() => {
// //     const handleClickOutside = (e) => {
// //       if (!formRef.current.contains(e.target)) {
// //         setIsAdding(false);
// //       }
// //     };

// //     if (isAdding) {
// //       window.scrollTo({
// //         top: formRef.current.getBoundingClientRect().top,
// //         behavior: 'smooth',
// //       });

// //       document.addEventListener('mousedown', handleClickOutside);
// //     }

// //     return () => document.removeEventListener('mousedown', handleClickOutside);
// //   }, [isAdding]);

// //   return (
// //     <ConfigProvider
// //       theme={{ components: { Button: { defaultHoverBg: 'transparent' } } }}
// //     >
// //       {isAdding ? (
// //         <TaskForm ref={formRef} onClose={() => setIsAdding(false)} />
// //       ) : (
// //         <Button
// //           className={style.addButton}
// //           type='dashed'
// //           icon={<PlusCircleFilled />}
// //           iconPosition='start'
// //           onClick={openForm}
// //         >
// //           {t('Add Task')}
// //         </Button>
// //       )}
// //     </ConfigProvider>
// //   );
// // };

// // export default AddTask;
