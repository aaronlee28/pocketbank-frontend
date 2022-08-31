import { useEffect, useState } from 'react';
import Cookies from 'universal-cookie';
import { Link, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSackDollar, faSackXmark, faCircleArrowLeft } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';
import useAxiosGet from '../hooks/useAxiosGet';
import AddDot from '../common/AddDot';
import api from '../user-pages/api';

export default function UserTransactions() {
  const [userData, setUserData] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [isError, setIsError] = useState(null);

  const cookies = new Cookies();
  const params = useParams();
  const authCookies = `Bearer ${cookies.get('idToken')}`;

  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: authCookies,
    },
  };

  const urlUserDetails = api(`userdetails/${params.id}`);
  const [data1] = useAxiosGet(urlUserDetails, config, setIsError);

  const urlUserTransaction = api(`usertransaction/${params.id}`);
  const [data2] = useAxiosGet(urlUserTransaction, config, setIsError);

  useEffect(() => {
    setUserData(data1);
  }, [data1, isError]);

  useEffect(() => {
    setTransactions(data2);
  }, [data2]);

  const SetTitle = (trans) => {
    let title;
    if (trans?.from === userData.accountNumber) {
      title = trans?.receiverName;
    }
    if (trans?.from === 1) {
      title = 'Interest From Savings Account';
    }
    if (trans?.to === 2) {
      title = 'Tax on Interest';
    }
    if (trans?.type === 'Deposit') {
      title = 'Deposit';
    }
    if (trans?.from === 3) {
      title = 'Deposit Interest';
    }
    if (trans?.from === 4) {
      title = 'Deposit Withdrawal';
    }
    if (trans?.from === 5) {
      title = 'Referral Code Bonus';
    }
    if (trans?.status === 'Failed') {
      title = 'Transaction Failed';
    }
    if (trans?.from === 6 && userData.accountNumber) {
      title = 'Top Up from ShopeePay';
    }
    if (trans?.from === 7) {
      title = 'Top Up from GoPay';
    }
    if (trans?.from === 8) {
      title = 'External Transfer - QR';
    }
    if (trans?.to === userData.accountNumber && trans?.type === 'Transfer') {
      title = trans?.senderName;
    }
    return title;
  };
  const tableTitle = [];
  if (transactions) {
    for (let i = 0; i < transactions?.length; i += 1) {
      tableTitle[i] = SetTitle(transactions[i]);
    }
  }

  return (
    <div className="container">
      <div className="back">
        <Link to="/adminhome">
          <FontAwesomeIcon className="transIcon" icon={faCircleArrowLeft} style={{ fontSize: '1.5rem', color: '#083eab', marginTop: '5rem' }} />
        </Link>
      </div>

      <div className="card admin-main-card">
        <div className="card-body admin-card">
          <div className="row info-card" key={Math.random()}>
            <h1 className="user-title">User Details</h1>
            <div className="container">
              <table>
                <tbody>
                  <tr>
                    <td>Name:</td>
                    <td>{userData.name}</td>
                  </tr>
                  <tr>
                    <td>Contact:</td>
                    <td>{userData.contact}</td>
                  </tr>
                  <tr>
                    <td>Email:</td>
                    <td>{userData.email}</td>
                  </tr>
                  <tr>
                    <td>Name:</td>
                    <td>{userData.name}</td>
                  </tr>
                  <tr>
                    <td>Savings Account:</td>
                    <td>{params.id}</td>
                  </tr>
                  <tr>
                    <td>Referral ID:</td>
                    <td>{userData.referralNumber}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <div className="card admin-main-card">
        <div className="card-body admin-card bottom-card">
          <div className="row info-card" key={Math.random()}>
            <h1 className="user-title">User Transaction</h1>
            <div className="container">
              {transactions?.map((t, index) => (
                <div className="container transContainer" key={Math.random()}>
                  <div className="row">
                    <div className="col-2">
                      {t.to === 2 || t.status === 'Failed' || (t.from === userData?.accountNumber && t.type === 'Transfer') ? (
                        <FontAwesomeIcon className="transIcon" icon={faSackXmark} style={{ fontSize: '1.5rem', color: 'red', marginTop: '0.3rem' }} />
                      ) : (
                        <FontAwesomeIcon className="menuIcon" icon={faSackDollar} style={{ fontSize: '1.5rem', color: '#33CC63', marginTop: '0.3rem' }} />
                      )}

                    </div>
                    <div className="col-6">
                      <h1 className="transactionHomeTitle">{tableTitle[index]}</h1>
                      <h1 className="transaction-description">{t.description}</h1>

                      <h1 className="transactionHomeDate">{moment(t.date).format('D MMMM YYYY - H:mm')}</h1>
                    </div>
                    <div className="col-4">
                      {t.to === 2 || t.status === 'Failed' || (t.from === userData?.accountNumber && t.type === 'Transfer') ? (
                        <h1
                          className="transactionHomeAmount"
                          style={{
                            color: 'red',
                          }}
                        >
                          -Rp.
                          {AddDot(t.amount)}
                        </h1>
                      ) : (
                        <h1
                          className="transactionHomeAmount"
                          style={{
                            color: '#33CC63',
                          }}
                        >
                          +Rp.
                          {AddDot(t.amount)}
                        </h1>
                      )}
                    </div>
                  </div>
                </div>
              ))}

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
