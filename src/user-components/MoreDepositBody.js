/* eslint no-unsafe-optional-chaining: "error" */
import moment from 'moment';
import AddDot from '../common/AddDot';

export default function MoreDepositBody(props) {
  const {
    userDeposit,
  } = props;
  return (
    <div className="container-white">
      <div className="card white-deposit-card">
        <div className="card-body">
          <div className="container">
            <h1 className="more-deposit-back"><a href="/deposit" style={{ color: 'black' }}>&lt;</a></h1>

            <h1 className="more-deposit-title" style={{ color: 'black' }}>My Deposit</h1>
            {userDeposit.map((deposit) => (
              <div className="card more-deposit-inner-card" key={Math.random()}>
                <div className="card-body">
                  <div className="auto-deposit-bool">
                    {deposit.autoDeposit === true ? (
                      <h1
                        className="auto-deposit-text"
                        style={{ color: 'darkgreen', backgroundColor: 'palegreen' }}
                      >
                        Auto Deposit
                      </h1>
                    ) : (
                      <h1 className="auto-deposit-text" style={{ color: 'orange', backgroundColor: '#fff1d6' }}>
                        One Time
                        Deposit
                      </h1>
                    )}
                  </div>

                  {deposit.duration > 1 ? (
                    <h1 className="deposit-duration">
                      {userDeposit[0]?.duration}
                      {' '}
                      Months Deposit
                    </h1>
                  ) : (
                    <h1 className="deposit-duration">
                      {deposit.duration}
                      {' '}
                      Month Deposit
                    </h1>
                  )}
                  <h1 className="deposit-number">
                    Deposit Number:&nbsp;
                    {deposit.depositNumber}
                  </h1>

                  <div className="row">
                    <div className="col-4">
                      <h1 className="second-title">Amount:</h1>
                      <h5 className="second-balance-date">
                        Rp&nbsp;
                        {AddDot(deposit.balance)}
                      </h5>
                    </div>
                    <div className="col-4">
                      <h1 className="second-title">Due:</h1>
                      <h5 className="second-balance-date">
                        {moment(deposit.UpdatedAt).add(userDeposit[0]?.duration, 'M').format('D MMMM YYYY')}
                      </h5>
                    </div>
                    <div className="col-4">
                      <h1 className="second-title">Interest Rate:</h1>
                      <h5 className="second-balance-date">
                        {userDeposit[0]?.interestRate * 100}
                        %
                      </h5>
                    </div>
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
