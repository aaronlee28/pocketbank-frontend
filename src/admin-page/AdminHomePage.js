import { useEffect, useState } from 'react';

import Cookies from 'universal-cookie';
import '../css/Admin.css';

import useAxiosGet from '../hooks/useAxiosGet';
import UnauthorizedErrorModal from '../common/UnauthorizedErrorModal';
import api from '../user-pages/api';

export default function UserList() {
  const [userData, setUserData] = useState([]);
  const [showFailed, setShowFailed] = useState(false);
  const [isError, setIsError] = useState(null);
  const cookies = new Cookies();
  const authCookies = `Bearer ${cookies.get('idToken')}`;
  const jsonConfig = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: authCookies,
    },
  };
  const urlUserList = api('userslist');

  const [data1] = useAxiosGet(urlUserList, jsonConfig, setIsError);

  useEffect(() => {
    setUserData(data1);
  }, [data1, isError]);

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

  const logout = () => {
    cookies.set('idToken', null, { path: '/' });
  }; return (
    <div className="container">
      <div className="card transactions-card">
        <div className="card-body">
          <div className=" transactiontitle">
            <h1 className="transactiontoptext">Users List</h1>
          </div>
          <div className="container">
            {userData?.map((t) => (
              <div className="row home-row" key={Math.random()}>
                <div className="col-4 left-box">
                  <h1 className="generic-text">
                    Name:&nbsp;
                    {t.name}
                  </h1>
                  <h1 className="generic-text">
                    Referral Code:&nbsp;
                    {t.referralCode}
                  </h1>
                  <h1 className="generic-text">
                    Account No.:&nbsp;
                    {t.id}
                  </h1>
                </div>
                <div className="col-8">
                  <a className="user-link" href={`/usertransactions/${t.id}`}>Details</a>
                  <a className="user-link" href={`/userreferral/${t.id}`}>Referral</a>
                  {t.IsActive === true ? (
                    <a className="user-link" href={`/setuserstatus/${t.id}`}>Deactivate</a>
                  ) : (
                    <a className="user-link" href={`/setuserstatus/${t.id}`}>Activate</a>
                  )}
                  <a className="user-link" href={`/usermerchstatus/${t.id}`}>Merch</a>
                  <a className="user-link" href={`/userdepositinfo/${t.id}`}>Deposit</a>
                  <a className="user-link" href={`/userrate/${t.id}`}>Set IR</a>

                </div>
              </div>
            ))}
          </div>
          <div className="setting-cont">
            <h6>Settings</h6>
          </div>
          <div className="setting-body">
            <a className="setting-link" href="/usermerchstatus">Merchandise</a>
            <a className="setting-link" href="/userrate">All Deposit</a>
            <a className="setting-link" href="/promotion">Promotion</a>
          </div>
          <div className="container logout-container">
            <a className="logout" href="/" onClick={logout}>Log Out</a>
          </div>
        </div>
      </div>
      <UnauthorizedErrorModal
        showFailed={showFailed}
        closeError={() => setShowFailed(false)}
      />
    </div>
  );
}
