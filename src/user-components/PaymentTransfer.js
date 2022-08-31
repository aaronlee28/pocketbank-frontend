import SuccessModalUniversal from '../common/SuccessModalUniversal';
import DepositError from '../common/DepositError';
import '../css/Payment.css';

export default function PaymentTransfer(props) {
  const {
    PaymentSubmitHandler,
    formReceiver,
    formAmount,
    formDescription,
    changeReceiver,
    changeAmount,
    changeDescription,
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
            <h1 className="deposit-back-text"><a href="/userhome" style={{ color: 'White' }}>Payment</a></h1>

          </div>
        </div>
      </div>

      <div className="container-bottom">
        <div className="card deposit-card">
          <div className="card-body">
            <div className="container">
              <h1 className="card-title" style={{ color: 'black' }}>Payment Amount</h1>
              <div className="form-div">
                <form onSubmit={PaymentSubmitHandler}>
                  <div className="container">
                    <input className=" transferform formInput topup-input" type="number" value={formReceiver} placeholder="Receiver Account Number" onChange={changeReceiver} />
                    <input className=" transferform formInput topup-input" type="number" value={formAmount} placeholder="Amount" onChange={changeAmount} />
                    <input className=" transferform formInput topup-input" type="text" value={formDescription} placeholder="Description (Optional)" onChange={changeDescription} />
                    <input className="submit-payment" type="submit" value="Submit" />
                  </div>

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
