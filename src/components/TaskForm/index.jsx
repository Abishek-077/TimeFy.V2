import { Button } from 'antd';
import style from './TaskForm.module.css';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const TaskForm = ({ onClose, onSave, task, isEditing }) => {
  const { t } = useTranslation();
  const [title, setTitle] = useState(task?.title || '');
  const [est, setEst] = useState(task?.est || 1);
  const [note, setNote] = useState(task?.note || '');
  const [act, setAct] = useState(task?.act || 0);

  const saveTask = () => {
    if (isEditing) {
      onSave({ ...task, title, note, est, act }); // Update task
    } else {
      onSave({ title, note, est, act }); // Create new task
    }
  };

  return (
    <form className={style.container}>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder={t('What are you working on?')}
        className={style.titleInput}
      />
      {/* Other form elements for estimating time, adding notes, etc. */}
      <Button onClick={saveTask}>{isEditing ? t('Update') : t('Save')}</Button>
      <Button onClick={onClose}>{t('Cancel')}</Button>
    </form>
  );
};

export default TaskForm;


// import { Button, message } from 'antd';
// import style from './TaskForm.module.css';
// import {
//   CaretUpOutlined,
//   CaretDownOutlined,
//   PlusOutlined,
// } from '@ant-design/icons';
// import { forwardRef, useEffect, useMemo, useRef, useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { deleteOne, save, update } from '../../features/taskSlice';
// import classNames from 'classnames';
// import { useTranslation } from 'react-i18next';
// import { useForm } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { z } from 'zod';

// const TaskForm = ({ onClose, task, isEditing }, ref) => {
//   const [messageApi, contextHolder] = message.useMessage();
//   const { t } = useTranslation();
//   const [title, setTitle] = useState(task?.title || '');
//   const [est, setEst] = useState(task?.est || 1);
//   const [note, setNote] = useState(task?.note || '');
//   const [act, setAct] = useState(task?.act || 0);
//   const [isNoting, setIsNoting] = useState(false);
//   const estRef = useRef(null);
//   const titleRef = useRef(null);
//   const dispatch = useDispatch();
//   const TaskSchema = useMemo(
//     () =>
//       z.object({
//         title: z
//           .string({ message: t('Title must not be empty') })
//           .trim()
//           .nonempty({ message: t('Title must not be empty') }),
//         act: z
//           .number({ message: t('Invalid act') })
//           .min(0, { message: t('Act must be greater than or equal 0') })
//           .optional(),
//         est: z
//           .number({ message: t('Invalid estimation') })
//           .min(0, { message: t('Estimation must be greater than or equal 0') }),
//         note: z.string().optional(),
//       }),
//     [t]
//   );
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     setValue,
//   } = useForm({
//     resolver: zodResolver(TaskSchema),
//   });
//   const { ref: titleRefFunc, ...titleRest } = register('title', {
//     onChange: (e) => setTitle(e.target.value),
//   });
//   const { ref: estRefFunc, ...estRest } = register('est', {
//     valueAsNumber: true,
//     onChange: (e) => setEst(e.target.value),
//   });

//   useEffect(() => {
//     setValue('act', act);
//     setValue('title', title);
//     setValue('est', est);
//     setValue('note', note);
//   }, [act, title, est, note, setValue]);

//   useEffect(() => {
//     for (const error of Object.values(errors).values()) {
//       messageApi.error(error.message);
//     }
//   }, [errors, messageApi]);

//   console.log('TaskForm');

//   const saveTask = () => {
//     if (!isEditing) {
//       dispatch(
//         save({
//           title,
//           note,
//           est: +est,
//         })
//       );

//       setEst(1);
//       setTitle('');
//       setNote('');
//       setIsNoting(false);
//       titleRef.current.focus();
//     } else {
//       if (!task) {
//         return;
//       }
//       dispatch(
//         update({
//           ...task,
//           title,
//           note,
//           act,
//           est: +est,
//         })
//       );
//       onClose();
//     }
//   };

//   const deleteTask = () => {
//     if (!task) {
//       return;
//     }
//     dispatch(deleteOne(task.id));
//     onClose();
//   };

//   return (
//     <form ref={ref} className={style.container} id='task-form'>
//       {contextHolder}
//       <div className={style.form}>
//         <input
//           {...titleRest}
//           placeholder={t('What are you working on?')}
//           className={style.titleInput}
//           value={title}
//           autoFocus
//           ref={(e) => {
//             titleRefFunc(e);
//             titleRef.current = e;
//           }}
//           onKeyDown={(e) => {
//             if (e.key === 'Enter') {
//               estRef.current.focus();
//             }
//           }}
//         />

//         <div className={style.est}>
//           <span>{isEditing ? 'Act / Est Pomodoros' : 'Est Pomodoros'}</span>

//           <div className={style.estInputs}>
//             {isEditing && (
//               <>
//                 <input
//                   value={act}
//                   min={0}
//                   step={1}
//                   type='number'
//                   {...register('act', {
//                     onChange: (e) => setAct(e.target.value),
//                     valueAsNumber: true,
//                   })}
//                 />
//                 <span className={style.seperator}>/</span>
//               </>
//             )}
//             <input
//               value={est}
//               ref={(e) => {
//                 estRefFunc(e);
//                 estRef.current = e;
//               }}
//               {...estRest}
//               onKeyDown={(e) => {
//                 if (e.key === 'Enter') {
//                   handleSubmit(saveTask)();
//                 }
//               }}
//             />
//             <Button onClick={() => setEst((prev) => Number(prev) + 1)}>
//               <CaretUpOutlined />
//             </Button>
//             <Button
//               onClick={() => est > 0 && setEst((prev) => Number(prev) - 1)}
//             >
//               <CaretDownOutlined />
//             </Button>
//           </div>

//           {(note || isNoting) && (
//             <textarea
//               value={note}
//               placeholder='Some notes...'
//               className={style.note}
//               {...register('note', {
//                 onChange: (e) => setNote(e.target.value),
//               })}
//             />
//           )}

//           <div className={style.addButtons}>
//             {!isNoting && (
//               <Button icon={<PlusOutlined />} onClick={() => setIsNoting(true)}>
//                 {t('Add Note')}
//               </Button>
//             )}
//             <Button icon={<PlusOutlined />}>{t('Add Project')}</Button>
//           </div>
//         </div>
//       </div>

//       <div className={style.actions}>
//         <Button
//           className={classNames(
//             style.deleteButton,
//             isEditing ? style.visible : null
//           )}
//           onClick={deleteTask}
//         >
//           {t('Delete')}
//         </Button>
//         <div className={style.rightActions}>
//           <Button className={style.cancelButton} onClick={onClose}>
//             {t('Cancel')}
//           </Button>
//           <Button onClick={handleSubmit(saveTask)} className={style.saveButton}>
//             {t('Save')}
//           </Button>
//         </div>
//       </div>
//     </form>
//   );
// };

// export default forwardRef(TaskForm);
