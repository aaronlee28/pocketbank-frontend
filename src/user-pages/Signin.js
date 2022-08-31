import { useState } from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';
import api from './api';
import SigninForm from '../user-components/SigninForm';

export default function Signin() {
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [isError, setIsError] = useState(null);
  const [showFailed, setShowFailed] = useState(false);

  const cookies = new Cookies();
  const changeLoginEmail = (event) => {
    setLoginEmail(event.target.value);
  };
  const changeLoginPassword = (event) => {
    setLoginPassword(event.target.value);
  };

  const ChangePostData = () => ({
    email: loginEmail,
    password: loginPassword,
  });

  const fetchSuccess = () => {
    setIsError(false);
  };
  const fetchFailed = () => {
    setIsError(true);
  };

  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const PostSignin = (data) => {
    axios.post(api('signin'), data, config)
      .then((response) => response.data)
      .then((response) => {
        if (response.statusCode === 400) {
          fetchFailed();
        } else {
          fetchSuccess();

          const restoken = response.data.idToken;
          cookies.set('idToken', restoken, { path: '/' });
        }
      })
      .catch(() => {
        fetchFailed();
      });
  };

  const SigninSubmitHandler = (event) => {
    event.preventDefault();
    PostSignin(ChangePostData());
  };

  return (
    <div>
      <SigninForm
        loginEmail={loginEmail}
        loginPassword={loginPassword}
        changeLoginEmail={changeLoginEmail}
        changeLoginPassword={changeLoginPassword}
        isError={isError}
        SigninSubmitHandler={SigninSubmitHandler}
        showFailed={showFailed}
        setShowFailed={setShowFailed}
      />
    </div>
  );
}
