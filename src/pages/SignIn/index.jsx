import { useTranslation } from 'react-i18next';
import style from './SignIn.module.css';
import { Button, message } from 'antd';
import { Link, useNavigate } from 'react-router';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useMemo } from 'react';
import apis from '../../apis';
import { AUTH_ENDPOINT } from '../../apis/endpoint';
import { useDispatch } from 'react-redux';
import { signIn } from '../../features/authSlice';

const SignIn = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const Schema = useMemo(() => {
    return z.object({
      email: z.string().email({ message: t('Invalid email') }),
      password: z.string().min(8, { message: t('Invalid password') }),
    });
  }, [t]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(Schema),
  });
  const navigate = useNavigate();

  console.log('SignIn');

  useEffect(() => {
    for (const error of Object.values(errors).values()) {
      messageApi.error(error.message);
    }
  }, [errors, messageApi]);

  const submit = async (cred) => {
    try {
      const res = await apis.post(AUTH_ENDPOINT.signIn, cred);
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
      <div className={style.title}>{t('Sign In')}</div>
      <form onSubmit={handleSubmit(submit)} className={style.form}>
        <div className={style.formItem}>
          <label>Email</label>
          <input placeholder={t('example@mail.com')} {...register('email')} />
        </div>
        <div className={style.formItem}>
          <label>{t('Password')}</label>
          <input type='password' {...register('password')} />
        </div>
        <Button htmlType='submit' className={style.signInButton}>
          {t('Sign in with Email')}
        </Button>
        <Button className={style.forgotPassButton}>
          {t('Forgot Password')}
        </Button>
      </form>
      <div className={style.bottom}>
        <div>{t('Do not have an account?')}</div>
        <Link to={'/signup'}>{t('Create account')}</Link>
      </div>
    </div>
  );
};

export default SignIn;