import moment from 'moment';
import AddDot from '../common/AddDot';

export default function DepositBottomPart(props) {
  const {
    userDeposit,
  } = props;

  return (
    <div>
      {userDeposit === null ? (
        <div className="container-bottom">
          <div className="card deposit-card">
            <div className="card-body">
              <div className="container">
                <h1 className="card-title" style={{ color: 'black' }}>My Deposit</h1>
                <div className="card deposit-inner-card" />
                <div className="card add-deposit-card">
                  <div className="card-body ">
                    <div className="six-percent">
                      <h1 className="add-deposit"><a href="/" style={{ color: '#083eab' }}>6%&nbsp;</a></h1>
                      <h1 className="add-deposit-interest">
                        <a href="/" style={{ color: '#083eab' }}>
                          interest for deposits
                          below Rp.10.000.000
                        </a>
                      </h1>
                    </div>
                    <div className="eight-percent">
                      <h1 className="add-deposit"><a href="/" style={{ color: '#083eab' }}>8%&nbsp;</a></h1>
                      <h1 className="add-deposit-interest">
                        <a href="/" style={{ color: '#083eab' }}>
                          interest for deposits
                          above Rp.10.000.000
                        </a>
                      </h1>
                    </div>
                    <form action="/topupdeposit">
                      <input type="submit" value="Open Deposit" className="open-deposit-button" />
                    </form>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="container-bottom">
          <div className="card deposit-card">
            <div className="card-body">
              <div className="container">
                <h1 className="card-title" style={{ color: 'black' }}>My Deposit</h1>
                <div className="card deposit-inner-card">
                  <div className="card-body">
                    <div className="auto-deposit-bool">
                      {userDeposit[0]?.autoDeposit === true ? (
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

                    {userDeposit[0]?.duration > 1 ? (
                      <h1 className="deposit-duration">
                        {userDeposit[0]?.duration}
                        {' '}
                        Months Deposit
                      </h1>
                    ) : (
                      <h1 className="deposit-duration">
                        {userDeposit[0]?.duration}
                        {' '}
                        Month Deposit
                      </h1>
                    )}
                    <h1 className="deposit-number">
                      Deposit Number:&nbsp;
                      {userDeposit[0]?.depositNumber}
                    </h1>

                    <div className="row">
                      <div className="col-6">
                        <h1 className="second-title">Amount:</h1>
                        <h5 className="second-balance-date">
                          Rp&nbsp;
                          {AddDot(userDeposit[0]?.balance)}
                        </h5>
                      </div>
                      <div className="col-6">
                        <h1 className="second-title">Due:</h1>
                        <h5 className="second-balance-date">
                          {moment(userDeposit[0]?.UpdatedAt).add(userDeposit[0]?.duration, 'M').format('D MMMM YYYY')}
                        </h5>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card more-deposit-card">
                  <div className="card-body ">
                    <h1 className="more-deposit"><a href="/moredeposit" style={{ color: 'black' }}>More Deposit&nbsp;&gt;</a></h1>
                  </div>
                </div>

                <div className="card add-deposit-card">
                  <div className="card-body ">
                    <div className="six-percent">
                      <h1 className="add-deposit"><a href="/" style={{ color: '#083eab' }}>6%&nbsp;</a></h1>
                      <h1 className="add-deposit-interest">
                        <a href="/" style={{ color: '#083eab' }}>
                          interest for deposits
                          below Rp.10.000.000
                        </a>
                      </h1>
                    </div>

                    <div className="eight-percent">
                      <h1 className="add-deposit"><a href="/" style={{ color: '#083eab' }}>8%&nbsp;</a></h1>
                      <h1 className="add-deposit-interest">
                        <a href="/" style={{ color: '#083eab' }}>
                          interest for deposits
                          above Rp.10.000.000
                        </a>
                      </h1>
                    </div>
                    <form action="/topupdeposit">
                      <input type="submit" value="Open Deposit" className="open-deposit-button" />
                    </form>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>

  );
}
