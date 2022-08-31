import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSackDollar, faSackXmark } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';
import AddDot from '../common/AddDot';

export default function TransactionsTable(props) {
  const {
    transactions,
    userData,
  } = props;

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

  useEffect(() => {

  }, [transactions]);
  return (
    <div className="container transactionContainer">
      <div className="card transactions-card">
        <div className="card-body">
          <div className=" transactiontitle">

            <Link to="/transaction" className="moreTransLink">
              <h1 className="transactiontoptext">Transaction History</h1>
            </Link>
          </div>
          <div className="transaction-list">
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
  );
}
