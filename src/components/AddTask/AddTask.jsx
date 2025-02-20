import { Button, ConfigProvider } from 'antd';
import style from './AddTask.module.css';
import { PlusCircleFilled } from '@ant-design/icons';
import { useEffect, useRef, useState } from 'react';
import TaskForm from '../TaskForm';
import { useTranslation } from 'react-i18next';

const AddTask = () => {
  const { t } = useTranslation();
  const [isAdding, setIsAdding] = useState(false);
  const formRef = useRef(null);

  console.log('AddTask');

  const openForm = () => {
    setIsAdding(true);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (formRef.current && !formRef.current.contains(e.target)) {
        setIsAdding(false);
      }
    };

    if (isAdding) {
      window.scrollTo({
        top: formRef.current?.getBoundingClientRect().top ?? 0,
        behavior: 'smooth',
      });

      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isAdding]);

  return (
    <ConfigProvider
      theme={{ components: { Button: { defaultHoverBg: 'transparent' } } }}
    >
      {isAdding ? (
        <TaskForm ref={formRef} onClose={() => setIsAdding(false)} />
      ) : (
        <Button
          className={style.addButton}
          type='dashed'
          icon={<PlusCircleFilled />}
          iconPosition='start'
          onClick={openForm}
        >
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
//       if (!formRef.current.contains(e.target)) {
//         setIsAdding(false);
//       }
//     };

//     if (isAdding) {
//       window.scrollTo({
//         top: formRef.current.getBoundingClientRect().top,
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
