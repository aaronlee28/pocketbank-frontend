import { useState, useEffect } from 'react';
import Cookies from 'universal-cookie';
import useAxiosGet from '../hooks/useAxiosGet';
import UnauthorizedErrorModal from '../common/UnauthorizedErrorModal';
import MoreDepositBody from '../user-components/MoreDepositBody';
import api from './api';

export default function Deposit() {
  const [isError, setIsError] = useState(null);
  const [showFailed, setShowFailed] = useState(false);
  const [userDeposit, setUserDeposit] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const cookies = new Cookies();

  const authCookies = `Bearer ${cookies.get('idToken')}`;

  const urlUserDeposit = api('depositinfo');
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: authCookies,
    },
  };
  const [data1, error1] = useAxiosGet(urlUserDeposit, config, setIsError);

  useEffect(() => {
    setUserDeposit(data1);
  }, [data1]);
  useEffect(() => {
    setErrorMessage(error1);
  }, [error1]);
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
      <UnauthorizedErrorModal
        showFailed={showFailed}
        errorMessage={errorMessage}
        closeError={() => setShowFailed(false)}
      />
      <MoreDepositBody
        userDeposit={userDeposit}
      />

    </div>
  );
}
