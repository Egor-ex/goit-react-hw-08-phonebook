
import * as Routes from 'Routes/Routes';

import { Switch, Redirect } from 'react-router-dom';
import { Suspense, lazy } from 'react';

import { LinearProgress } from '@material-ui/core';
import { Toaster } from 'react-hot-toast';
import { UserBar } from 'Pages/UserBar/UserBar';
const HomePage = lazy(() => import('./Pages/HomePage/HomePage'));
const Phonebook = lazy(() => import('./Pages/PhonebookPage/Phonebook'));
const LoginPage = lazy(() => import('./Pages/LoginPage/LoginPage'));
const SignupPage = lazy(() => import('./Pages/SignupPage/SignupPage'));

const App = () => {
  return (
    <>
      <UserBar />
      <Switch>
        <Suspense fallback={<LinearProgress style={{ marginTop: '60px' }} />}>
          <Routes.Public exact path="/">
            <HomePage />
          </Routes.Public>
          <Routes.Private path="/contacts">
            <Phonebook />
          </Routes.Private>
          <Routes.Public path="/login" restricted>
            <LoginPage />
          </Routes.Public>
          <Routes.Public path="/signup" restricted>
            <SignupPage />
          </Routes.Public>
          <Redirect to="/" />
        </Suspense>
      </Switch>
      <Toaster position="top-right" />
    </>
  );
};

export default App;