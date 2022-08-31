import { useEffect, useState } from 'react';
import Cookies from 'universal-cookie';
import axios from 'axios';
import api from './api';
import useAxiosGet from '../hooks/useAxiosGet';
import UserProfilePatchForm from '../user-components/UserProfilePatchForm';

export default function UserProfile() {
  const [userData, setUserData] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showFailed, setShowFailed] = useState(false);
  const [isError, setIsError] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [axiosError, setAxiosError] = useState(null);
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formContact, setFormContact] = useState('');
  const [formProfilePicture, setFormProfilePicture] = useState(null);
  const urlUserDetails = api('userdetails');
  const cookies = new Cookies();
  const authCookies = `Bearer ${cookies.get('idToken')}`;
  const jsonConfig = {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: authCookies,
    },
  };

  const [data1, error1] = useAxiosGet(urlUserDetails, jsonConfig, setAxiosError);

  useEffect(() => {
    setUserData(data1);
  }, [data1]);

  const changeName = (event) => {
    setFormName(event.target.value);
  };
  const changeEmail = (event) => {
    setFormEmail(event.target.value);
  };

  const changeContact = (event) => {
    setFormContact(event.target.value);
  };

  const changeProfilePicture = (event) => {
    event.preventDefault();
    let baseURL = '';
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        baseURL = reader.result;
        const b64data = baseURL.split(',');
        resolve(setFormProfilePicture(b64data[1]));
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };
  const changePatchData = () => {
    const formData = new FormData();
    formData.append('name', formName);
    formData.append('email', formEmail);
    formData.append('contact', formContact);
    formData.append('photo', formProfilePicture);
    return (formData);
  };

  useEffect(() => {
    setErrorMessage(error1);
  }, [error1, axiosError]);

  const fetchSuccess = () => {
    setIsError(false);
  };
  const fetchFailed = () => {
    setIsError(true);
  };

  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: authCookies,
    },
  };
  const PatchUserDetails = (data) => {
    axios.patch(api('userdetails'), data, config)
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

  const PatchSubmitHandler = (event) => {
    event.preventDefault();
    PatchUserDetails(changePatchData());
  };

  return (
    <div>
      <UserProfilePatchForm
        formName={formName}
        formEmail={formEmail}
        formContact={formContact}
        formProfilePicture={formProfilePicture}
        changeName={changeName}
        changeEmail={changeEmail}
        changeContact={changeContact}
        changeProfilePicture={changeProfilePicture}
        userData={userData}
        showSuccess={showSuccess}
        setShowSuccess={setShowSuccess}
        showFailed={showFailed}
        setShowFailed={setShowFailed}
        isError={isError}
        errorMessage={errorMessage}
        PatchSubmitHandler={PatchSubmitHandler}
      />
    </div>
  );
}
