
import { FormItems } from 'Components/FormItems/FormItems';
import { SubmitButton } from 'Components/SubmitButton/SubmitButton';

import css from './LoginPage.module.css';

import { useLoginMutation } from 'redux/authServise';

import { useDispatch } from 'react-redux';
import { isLogin, setToken } from 'redux/actions';

import { toast } from 'react-hot-toast';
import { loginSchema } from 'utils/validtionSchema';
import { loginFormOptions } from 'utils/formikOptions';

const LoginPage = () => {
  const [loginUser, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();

  function postLogin({ data }) {
    dispatch(setToken(data.token));
    dispatch(isLogin(true));
  }

  function loginHandler(event) {
    loginUser({ ...event })
      .then(postLogin)
      .catch(e => toast.error('Неверный логин или пароль'));
  }

  return (
    <div className={css.container}>
      <FormItems
        schema={loginSchema}
        onSubmit={loginHandler}
        initValues={{ email: '', password: '' }}
        inputTags={loginFormOptions}
      >
        <SubmitButton isLoading={isLoading} label={'Login'} />
      </FormItems>
    </div>
  );
};

export default LoginPage;