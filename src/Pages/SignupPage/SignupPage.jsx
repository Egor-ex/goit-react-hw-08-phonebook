
import css from './SignupPage.module.css';

import { SubmitButton } from 'Components/SubmitButton/SubmitButton';
import { FormItems } from 'Components/FormItems/FormItems';

import toast from 'react-hot-toast';
import { signupSchema } from 'utils/validtionSchema';
import { signupOptions } from 'utils/formikOptions';

import { useDispatch } from 'react-redux';
import { isLogin, setToken } from 'redux/actions';

import { useSignupMutation } from 'redux/authServise';

const SignupPage = () => {
  const [signupUser, { isLoading }] = useSignupMutation();
  const dispatch = useDispatch();

  function postSubmit({ data }) {
    dispatch(setToken(data.token));
    dispatch(isLogin(true));
  }

  function submitHandler(event, actions) {
    signupUser({ ...event })
      .then(postSubmit)
      .catch(error => toast.error('Такой email уже зарегестрирован'));
    actions.resetForm();
  }

  return (
    <div className={css.container}>
      <FormItems
        schema={signupSchema}
        onSubmit={submitHandler}
        initValues={{ name: '', email: '', password: '' }}
        inputTags={signupOptions}
      >
        <SubmitButton isLoading={isLoading} label={'Signup'} />
      </FormItems>
    </div>
  );
};

export default SignupPage;