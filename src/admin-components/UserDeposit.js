import { useState, useEffect } from 'react';
import Cookies from 'universal-cookie';
import { Link, useParams } from 'react-router-dom';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleArrowLeft } from '@fortawesome/free-solid-svg-icons';
import useAxiosGet from '../hooks/useAxiosGet';
import AddDot from '../common/AddDot';
import api from '../user-pages/api';

export default function UserDeposit() {
  const [depositData, setDepositData] = useState([]);
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

  const urlDeposit = api(`userdepositinfo/${params.id}`);
  const [data1] = useAxiosGet(urlDeposit, config, setIsError);

  useEffect(() => {
    setDepositData(data1);
  }, [data1, isError]);
  return (
    <div className="container">
      <div className="back">
        <Link to="/adminhome">
          <FontAwesomeIcon className="transIcon" icon={faCircleArrowLeft} style={{ fontSize: '1.5rem', color: '#083eab', marginTop: '5rem' }} />
        </Link>
      </div>
      <div className="container">
        <div className="card transactions-card">
          <div className="card-body">
            <div className=" transactiontitle">
              <h1 className="transactiontoptext">User Deposit Detail</h1>
            </div>
            <div>
              <h1>
                User Id:
                {depositData.userId}
              </h1>
              <h1>
                Total Balance: Rp&nbsp;
                {AddDot(depositData.balance)}
              </h1>
            </div>
          </div>
        </div>
      </div>

      <div className="container bottom-c">
        <div className="card transactions-card">
          <div className="card-body">
            <div className=" transactiontitle">
              <h1 className="transactiontoptext">User Deposit Detail</h1>
            </div>
            {depositData.allDeposits?.map((deposit) => (
              <div className="container home-row" key={Math.random()}>
                <h1 className="generic-text">
                  Balance:&nbsp;&nbsp;Rp
                  {AddDot(deposit.balance)}
                </h1>
                {deposit.autoDeposit === true ? (
                  <h1 className="generic-text">
                    Auto Deposit:&nbsp;&nbsp;True
                  </h1>
                ) : (
                  <h1 className="generic-text">
                    Auto Deposit:&nbsp;&nbsp;False
                  </h1>
                )}

                <h1 className="generic-text">
                  Date Deposited:&nbsp;&nbsp;
                  {moment(deposit.createdAt).format('D MMMM YYYY')}
                </h1>
                <h1 className="generic-text">
                  Deposit Length:&nbsp;&nbsp;
                  {deposit.duration}
                  {' '}
                  Month
                </h1>
                <h1 className="generic-text">
                  Deposit Due:&nbsp;&nbsp;
                  {moment(deposit.createdAt).add(deposit.duration, 'M').format('D MMMM YYYY')}
                  {' '}

                </h1>
                <h1 className="generic-text">
                  Interest Rate:&nbsp;&nbsp;
                  {deposit.interestRate * 100}
                  %
                </h1>
                <h1 className="generic-text">
                  Tax:&nbsp;&nbsp;
                  {deposit.tax * 100}
                  %
                </h1>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>

  );
}
