import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, message } from 'antd';
import { z } from 'zod';
import apis from '../../apis';
import { AUTH_ENDPOINT } from '../../apis/endpoint';
import { signIn } from '../../features/authSlice';
import style from './SignUp.module.css';

const SignUp = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();

  const Schema = z.object({
    email: z.string().email({ message: t('Invalid email') }),
    password: z.string().min(8, { message: t('Password must be at least 8 characters') }),
    passwordConfirm: z.string(),
  }).superRefine(({ password, passwordConfirm }, ctx) => {
    if (password !== passwordConfirm) {
      ctx.addIssue({
        code: 'custom',
        message: t('Passwords do not match'),
        path: ['passwordConfirm'],
      });
    }
  });

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(Schema),
  });

  const submit = async (cred) => {
    try {
      const res = await apis.post(AUTH_ENDPOINT.signUp, cred);
      dispatch(signIn(res.data));
      navigate('/');
    } catch (error) {
      messageApi.error(error?.response?.data?.error || 'Something went wrong');
    }
  };

  return (
    <div className={style.container}>
      {contextHolder}
      <form onSubmit={handleSubmit(submit)} className={style.form}>
        <div className={style.formItem}>
          <label>Email</label>
          <input {...register('email')} placeholder="example@mail.com" />
        </div>
        <div className={style.formItem}>
          <label>Password</label>
          <input type="password" {...register('password')} />
        </div>
        <div className={style.formItem}>
          <label>Confirm Password</label>
          <input type="password" {...register('passwordConfirm')} />
        </div>
        <Button htmlType="submit" className={style.signUpButton}>
          {t('Sign up')}
        </Button>
      </form>
    </div>
  );
};

export default SignUp;
