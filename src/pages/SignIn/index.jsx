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
import style from './SignIn.module.css';

const SignIn = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();

  // Define schema validation for login
  const Schema = z.object({
    email: z.string().email({ message: t('Invalid email') }),
    password: z.string().min(8, { message: t('Invalid password') }),
  });

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(Schema),
  });

  // Handle form submission
  const submit = async (cred) => {
    try {
      const res = await apis.post(AUTH_ENDPOINT.signIn, cred);
      dispatch(signIn(res.data));  // Store user data in Redux
      navigate('/');  // Redirect to home page
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
        <Button htmlType="submit" className={style.signInButton}>
          {t('Sign in')}
        </Button>
      </form>
    </div>
  );
};

export default SignIn;
