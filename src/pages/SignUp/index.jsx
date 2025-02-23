import { useTranslation } from 'react-i18next';
import style from './SignUp.module.css';
import { Button, message } from 'antd';
import { Link, useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { useEffect, useMemo } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AUTH_ENDPOINT } from '../../apis/endpoint';
import apis from '../../apis';
import { signIn } from '../../features/authSlice';

const SignUp = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const Schema = useMemo(() => {
    return z.object({
      email: z.string().email({ message: t('Invalid email') }),
      password: z.string().min(8, { message: t('Invalid password') }),
      passwordConfirm: z.string(),
    });
  }, [t]).superRefine(({ password, passwordConfirm }, ctx) => {
    if (password !== passwordConfirm) {
      ctx.addIssue({
        code: 'custom',
        message: t('The passwords did not match'),
        path: ['passwordConfirm'],
      });
    }
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(Schema),
  });
  const navigate = useNavigate();

  console.log('SignUp');

  useEffect(() => {
    for (const error of Object.values(errors).values()) {
      messageApi.error(error.message);
    }
  }, [errors, messageApi]);

  const submit = async (cred) => {
    try {
      const res = await apis.post(AUTH_ENDPOINT.signUp, cred);
      dispatch(signIn(res.data));
      navigate('/');
    } catch (error) {
      if (String(error.status).startsWith('4')) {
        messageApi.error(error?.response?.data?.error);
      } else {
        messageApi.error('Something went wrong. Please try again!');
      }
    }
  };

  return (
    <div className={style.container}>
      {contextHolder}
      <Link to={'/'}>
        <img
          src='public/brand-logo.png'
          alt='brand logo'
          className={style.logo}
        />
      </Link>
      <div className={style.title}>{t('Create Account')}</div>
      <form onSubmit={handleSubmit(submit)} className={style.form}>
        <div className={style.formItem}>
          <label>Email</label>
          <input placeholder={t('example@mail.com')} {...register('email')} />
        </div>
        <div className={style.formItem}>
          <label>{t('Password')}</label>
          <input type='password' {...register('password')} />
        </div>
        <div className={style.formItem}>
          <label>{t('Password (Confirm)')}</label>
          <input type='password' {...register('passwordConfirm')} />
        </div>
        <Button htmlType='submit' className={style.signInButton}>
          {t('Sign up with Email')}
        </Button>
      </form>
      <div className={style.bottom}>
        <div>{t('Already have an account?')}</div>
        <Link to={'/signIn'}>{t('Sign in')}</Link>
      </div>
    </div>
  );
};

export default SignUp;