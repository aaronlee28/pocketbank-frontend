import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import TopUpQRForm from '../user-components/TopUpQRForm';
import api from './api';

export default function TopUpQRCode() {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [showFailed, setShowFailed] = useState(false);
  const [isError, setIsError] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const params = useParams();
  const fixedAmount = params.amount;

  useEffect(() => {
    setAmount(fixedAmount);
  }, [fixedAmount]);
  const changeAmount = (event) => {
    setAmount(event.target.value);
  };
  const changeDescription = (event) => {
    setDescription(event.target.value);
  };

  const ChangePostData = () => ({
    amount: Number(amount),
    senderWalletNumber: 8,
    description,
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

  const PostTopUpQR = (data, accountNumber) => {
    axios.post(api(`topupqr/${accountNumber}`), data, config)
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
    PostTopUpQR(ChangePostData(), params.id);
  };

  return (
    <TopUpQRForm
      amount={amount}
      description={description}
      changeAmount={changeAmount}
      changeDescription={changeDescription}
      registerSubmitHandler={registerSubmitHandler}
      showSuccess={showSuccess}
      setShowSuccess={setShowSuccess}
      showFailed={showFailed}
      setShowFailed={setShowFailed}
      isError={isError}
      errorMessage={errorMessage}
      fixedAmount={fixedAmount}
    />
  );
}
