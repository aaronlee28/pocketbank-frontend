import { useState, useEffect } from 'react';
import Cookies from 'universal-cookie';
import api from './api';
import useAxiosGet from '../hooks/useAxiosGet';

import UserHomeHeader from '../user-components/UserHomeHeader';
import UserHomeAccountCard from '../user-components/UserHomeAccountCard';
import UserMenu from '../user-components/UserMenu';
import UserHomeCarousel from '../user-components/UserHomeCarousel';
import UserHomeTransaction from '../user-components/UserHomeTransaction';

export default function UserHome() {
  const [isError, setIsError] = useState(null);
  const [showFailed, setShowFailed] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [userData, setUserData] = useState([]);
  const [userSavings, setUserSavings] = useState([]);
  const [userDeposit, setUserDeposit] = useState([]);
  const [promotionImage, setPromotionImage] = useState([]);
  const [transaction, setTransaction] = useState([]);
  const cookies = new Cookies();

  const authCookies = `Bearer ${cookies.get('idToken')}`;

  const urlUserDetails = api('userdetails');
  const urlUserSavings = api('savingsinfo');
  const urlUserDeposit = api('depositinfo');
  const urlUserPromotion = api('promotion');
  const urlUserTransaction = api('transactionhistory?limit=3');
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: authCookies,
    },
  };

  const [data1, error1] = useAxiosGet(urlUserDetails, config, setIsError);
  const [data2, error2] = useAxiosGet(urlUserSavings, config, setIsError);
  const [data3, error3] = useAxiosGet(urlUserDeposit, config, setIsError);
  const [data4, error4] = useAxiosGet(urlUserPromotion, config, setIsError);
  const [data5, error5] = useAxiosGet(urlUserTransaction, config, setIsError);

  useEffect(() => {
    setUserData(data1);
  }, [data1]);
  useEffect(() => {
    setUserSavings(data2);
  }, [data2]);
  useEffect(() => {
    setUserDeposit(data3);
  }, [data3]);
  useEffect(() => {
    setPromotionImage(data4);
  }, [data4]);
  useEffect(() => {
    setTransaction(data5);
  }, [data5]);
  useEffect(() => {
    setErrorMessage(error1);
  }, [error1, error2, error3, error4, error5]);

  useEffect(() => {
    if (isError == null) {
      return;
    }

    const CheckSubmitStatus = () => {
      if (isError) {
        setShowFailed(true);
      }
    };
    CheckSubmitStatus();
  }, [isError]);
  return (
    <div>
      <UserHomeHeader
        isError={isError}
        showFailed={showFailed}
        setShowFailed={setShowFailed}
        userData={userData}
        errorMessage={errorMessage}
      />
      <UserHomeAccountCard
        userSavings={userSavings}
        userDeposit={userDeposit}
      />
      <UserMenu />
      <UserHomeCarousel
        promotionImage={promotionImage}
      />
      <UserHomeTransaction
        transaction={transaction}
        userData={userData}
      />
    </div>
  );
}
