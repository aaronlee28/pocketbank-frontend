import DepositError from '../common/DepositError';
import SuccessModalUniversal from '../common/SuccessModalUniversal';
import AddDot from '../common/AddDot';
import '../css/TopUpDeposit.css';

export default function TopUpDepositBody(props) {
  const {
    userSavings,
    TopUpSubmitHandler,
    formTopUp,
    changeTopUp,
    changeDuration,
    changeAutoDeposit,
    showSuccess,
    setShowSuccess,
    showFailed,
    errorMessage,
    setShowFailed,
  } = props;
  return (
    <div>
      <div className="deposit-page-container">
        <div className="container">
          <div className="container top-page-container">
            <h1 className="deposit-back">
              <a href="/userhome" style={{ color: 'white' }}>
                &lt;&nbsp;&nbsp;
              </a>
            </h1>
            <h1 className="deposit-back-text"><a href="/userhome" style={{ color: 'White' }}>Deposit</a></h1>
          </div>
        </div>
      </div>

      <div className="container-bottom">
        <div className="card deposit-card">
          <div className="card-body">
            <div className="container">
              <h1 className="card-title" style={{ color: 'black' }}>Deposit Amount</h1>
              <div className="form-div">
                <form onSubmit={TopUpSubmitHandler}>
                  <input className=" topupform formInput topup-input" type="number" value={formTopUp} placeholder="1.000.000" onChange={changeTopUp} />
                  <h1 className="savings-info">
                    Savings Balance: Rp&nbsp;
                    {AddDot(userSavings.balance)}
                  </h1>
                  <select className="topupform deposit-duration-select" name="deposit-select" id="deposit-select" onChange={changeDuration}>
                    <option value="1">One Month</option>
                    <option value="3">Three Months</option>
                  </select>
                  <select className="topupform deposit-auto-deposit" name="deposit-auto-deposit" id="deposit-auto-deposit" onChange={changeAutoDeposit}>
                    <option value="true">Auto Deposit</option>
                    <option value="false">One-Time Deposit</option>
                  </select>
                  <input className="submit-topup" type="submit" value="Submit" />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <SuccessModalUniversal
        showSuccess={showSuccess}
        closeSuccess={() => setShowSuccess(false)}
      />
      <DepositError
        showFailed={showFailed}
        errorMessage={errorMessage}
        closeError={() => setShowFailed(false)}
      />
    </div>
  );
}
