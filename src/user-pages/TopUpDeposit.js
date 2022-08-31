import { useState, useEffect } from 'react';
import Cookies from 'universal-cookie';
import axios from 'axios';
import useAxiosGet from '../hooks/useAxiosGet';
import TopUpDepositBody from '../user-components/TopUpDepositBody';
import api from './api';

export default function TopUpDeposit() {
  const [isError, setIsError] = useState(null);
  const [isError2, setIsError2] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showFailed, setShowFailed] = useState(false);
  const [userSavings, setUserSavings] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [formTopUp, setFormTopUp] = useState('');
  const [formDuration, setFormDuration] = useState('1');
  const [formAutoDeposit, setFormAutoDeposit] = useState('true');

  const changeTopUp = (event) => {
    setFormTopUp(event.target.value);
  };
  const changeDuration = (event) => {
    setFormDuration(event.target.value);
  };

  const changeAutoDeposit = (event) => {
    setFormAutoDeposit(event.target.value);
  };

  const cookies = new Cookies();

  const authCookies = `Bearer ${cookies.get('idToken')}`;

  const changePostData = () => ({
    amount: Number(formTopUp),
    duration: Number(formDuration),
    autoDeposit: formAutoDeposit === 'true',
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
      Authorization: authCookies,
    },
  };

  const PostTopUpDeposit = (data) => {
    axios.post(api('topupdeposit'), data, config)
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

  const urlUserSavings = api('savingsinfo');
  const [data1, error2] = useAxiosGet(urlUserSavings, config, setIsError2);

  useEffect(() => {
    setUserSavings(data1);
  }, [data1, isError2]);
  useEffect(() => {
    setErrorMessage(error2);
  }, [error2]);
  useEffect(() => {
    if (isError == null) {
      return;
    }
    const CheckSubmitStatus = () => {
      if (isError) {
        setShowFailed(true);
      }
      if (!isError) setShowSuccess(true);
    };
    CheckSubmitStatus();
  }, [isError]);

  const TopUpSubmitHandler = (event) => {
    event.preventDefault();

    PostTopUpDeposit(changePostData());
  };

  return (
    <div>

      <TopUpDepositBody
        userSavings={userSavings}
        TopUpSubmitHandler={TopUpSubmitHandler}
        formTopUp={formTopUp}
        formDuration={formDuration}
        changeTopUp={changeTopUp}
        changeDuration={changeDuration}
        changeAutoDeposit={changeAutoDeposit}
        showSuccess={showSuccess}
        setShowSuccess={setShowSuccess}
        showFailed={showFailed}
        errorMessage={errorMessage}
        setShowFailed={setShowFailed}
      />

    </div>
  );
}
