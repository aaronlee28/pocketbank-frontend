import { useState } from 'react';
import axios from 'axios';
import RegisterForm from '../user-components/RegisterForm';
import api from './api';

export default function Register() {
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formContact, setFormContact] = useState('');
  const [formPassword, setFormPassword] = useState('');
  const [formReferralNumber, setFormReferralNumber] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [showFailed, setShowFailed] = useState(false);
  const [isError, setIsError] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const changeName = (event) => {
    setFormName(event.target.value);
  };
  const changeEmail = (event) => {
    setFormEmail(event.target.value);
  };

  const changeContact = (event) => {
    setFormContact(event.target.value);
  };

  const changePassword = (event) => {
    setFormPassword(event.target.value);
  };

  const changeReferralNumber = (event) => {
    setFormReferralNumber(event.target.value);
  };

  const changePostData = () => {
    const formData = new FormData();
    formData.append('name', formName);
    formData.append('email', formEmail);
    formData.append('contact', formContact);
    formData.append('password', formPassword);
    formData.append('referralNumber', formReferralNumber.toString());
    return (formData);
  };

  const fetchSuccess = () => {
    setIsError(false);
  };
  const fetchFailed = () => {
    setIsError(true);
  };

  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  };

  const PostRegister = (data) => {
    axios.post(api('register'), data, config)
      .then((response) => response.data)
      .then((response) => {
        if (response.statusCode === 400) {
          fetchFailed();
        } else {
          fetchSuccess();
        }
      })
      .catch((event) => {
        fetchFailed();
        const errMessage = event.response.data.error;
        setErrorMessage(errMessage);
      });
  };

  const registerSubmitHandler = (event) => {
    event.preventDefault();
    PostRegister(changePostData());
  };

  return (
    <div className="container">
      <RegisterForm
        formName={formName}
        formEmail={formEmail}
        formContact={formContact}
        formPassword={formPassword}
        formReferralNumber={formReferralNumber}
        changeName={changeName}
        changeEmail={changeEmail}
        changeContact={changeContact}
        changePassword={changePassword}
        changeReferralNumber={changeReferralNumber}
        showSuccess={showSuccess}
        setShowSuccess={setShowSuccess}
        showFailed={showFailed}
        setShowFailed={setShowFailed}
        isError={isError}
        registerSubmitHandler={registerSubmitHandler}
        errorMessage={errorMessage}
      />
    </div>
  );
}
