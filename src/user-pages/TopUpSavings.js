import { useState, useEffect } from 'react';
import Cookies from 'universal-cookie';
import axios from 'axios';
import api from './api';
import TopUpSavingsBody from '../user-components/TopUpSavingsBody';
import useAxiosGet from '../hooks/useAxiosGet';

export default function TopUpDeposit() {
  const [isError, setIsError] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showFailed, setShowFailed] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [formWallet, setFormWallet] = useState('6');
  const [formAmount, setFormAmount] = useState('');
  const [formDescription, setFormDescription] = useState('');
  const [userData, setUserData] = useState([]);
  const [userDataError, setUserDataError] = useState(null);

  const changeWallet = (event) => {
    setFormWallet(event.target.value);
  };
  const changeAmount = (event) => {
    setFormAmount(event.target.value);
  };
  const changeDescription = (event) => {
    setFormDescription(event.target.value);
  };

  const cookies = new Cookies();

  const authCookies = `Bearer ${cookies.get('idToken')}`;

  const changePostData = () => ({
    amount: Number(formAmount),
    senderWalletNumber: Number(formWallet),
    description: formDescription,
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
  const urlUserDetails = api('userdetails');
  const [data2] = useAxiosGet(urlUserDetails, config, setUserDataError);

  const PostTopUpSavings = (data) => {
    axios.post(api('topupsavings'), data, config)
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

  useEffect(() => {
    setUserData(data2);
  }, [data2]);

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
  }, [isError, userDataError]);

  const TopUpSubmitHandler = (event) => {
    event.preventDefault();
    PostTopUpSavings(changePostData());
  };

  return (
    <div>

      <TopUpSavingsBody
        userData={userData}
        TopUpSubmitHandler={TopUpSubmitHandler}
        formAmount={formAmount}
        formDescription={formDescription}
        changeAmount={changeAmount}
        changeWallet={changeWallet}
        changeDescription={changeDescription}
        setShowSuccess={setShowSuccess}
        showFailed={showFailed}
        showSuccess={showSuccess}
        errorMessage={errorMessage}
        setShowFailed={setShowFailed}
      />

    </div>
  );
}
