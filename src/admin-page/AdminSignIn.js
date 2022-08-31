import { useState } from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';
import api from '../user-pages/api';
import AdminSigninForm from '../admin-components/AdminSigninForm';

export default function Signin() {
  const [loginAdminEmail, setLoginAdminEmail] = useState('');
  const [loginAdminPassword, setLoginAdminPassword] = useState('');
  const [isError, setIsError] = useState(null);
  const [showFailed, setShowFailed] = useState(false);

  const cookies = new Cookies();
  const changeLoginAdminEmail = (event) => {
    setLoginAdminEmail(event.target.value);
  };
  const changeLoginAdminPassword = (event) => {
    setLoginAdminPassword(event.target.value);
  };

  const ChangePostData = () => ({
    email: loginAdminEmail,
    password: loginAdminPassword,
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

  const PostSigninAdmin = (data) => {
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

  const AdminSigninSubmitHandler = (event) => {
    event.preventDefault();
    PostSigninAdmin(ChangePostData());
  };
  return (
    <div>
      <AdminSigninForm
        loginAdminEmail={loginAdminEmail}
        loginAdminPassword={loginAdminPassword}
        changeLoginAdminEmail={changeLoginAdminEmail}
        changeLoginAdminPassword={changeLoginAdminPassword}
        isError={isError}
        AdminSigninSubmitHandler={AdminSigninSubmitHandler}
        showFailed={showFailed}
        setShowFailed={setShowFailed}
      />
    </div>
  );
}
