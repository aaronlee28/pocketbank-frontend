import { useState, useEffect } from 'react';
import Cookies from 'universal-cookie';
import axios from 'axios';
import useAxiosGet from '../hooks/useAxiosGet';
import PaymentTransfer from '../user-components/PaymentTransfer';
import PaymentHomeTransaction from '../user-components/PaymentHomeTransaction';
import PreviousTransactions from '../user-components/PreviousTransactions';
import api from './api';

export default function Payment() {
  const [isError, setIsError] = useState(null);
  const [showFailed, setShowFailed] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [formReceiver, setFormReceiver] = useState('');
  const [formAmount, setFormAmount] = useState('');
  const [formDescription, setFormDescription] = useState('');
  const [userData, setUserData] = useState([]);
  const [transaction, setTransaction] = useState([]);
  const [postError, setPostError] = useState(false);
  const [axiosError, setAxiosError] = useState(null);

  const urlUserDetails = api('userdetails');
  const urlUserTransaction = api('transactionhistory?type=Transfer');

  const cookies = new Cookies();

  const authCookies = `Bearer ${cookies.get('idToken')}`;
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: authCookies,
    },
  };

  const [data1, error1] = useAxiosGet(urlUserDetails, config, setAxiosError);
  const [data5, error5] = useAxiosGet(urlUserTransaction, config, setAxiosError);

  useEffect(() => {
    setUserData(data1);
  }, [data1]);

  useEffect(() => {
    setTransaction(data5);
  }, [data5]);

  useEffect(() => {
    setErrorMessage(error1);
  }, [error1, error5, axiosError, postError]);

  const changeReceiver = (event) => {
    setFormReceiver(event.target.value);
  };

  const changeAmount = (event) => {
    setFormAmount(event.target.value);
  };

  const changeDescription = (event) => {
    setFormDescription(event.target.value);
  };
  const changePostData = () => ({
    receiverAccount: Number(formReceiver),
    amount: Number(formAmount),
    description: formDescription,
  });

  const fetchSuccess = () => {
    setIsError(false);
  };
  const fetchFailed = () => {
    setIsError(true);
  };

  const PostPayment = (data) => {
    axios.post(api('payment'), data, config)
      .then((response) => response.data)
      .then((response) => {
        if (response.statusCode === 400) {
          fetchFailed();
          setPostError(true);
        } else {
          fetchSuccess();
        }
      })
      .catch((event) => {
        fetchFailed();
        setPostError(true);

        const errMessage = event.response.data.error;
        setErrorMessage(errMessage);
      });
  };

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

  const PaymentSubmitHandler = (event) => {
    event.preventDefault();

    PostPayment(changePostData());
  };

  return (
    <div>
      <PaymentTransfer
        PaymentSubmitHandler={PaymentSubmitHandler}
        formReceiver={formReceiver}
        formAmount={formAmount}
        formDescription={formDescription}
        changeReceiver={changeReceiver}
        changeAmount={changeAmount}
        changeDescription={changeDescription}
        showSuccess={showSuccess}
        setShowSuccess={setShowSuccess}
        showFailed={showFailed}
        errorMessage={errorMessage}
        setShowFailed={setShowFailed}
      />

      <PreviousTransactions
        transaction={transaction}
        userData={userData}
      />
      <PaymentHomeTransaction
        transaction={transaction}
        userData={userData}
      />
    </div>
  );
}
