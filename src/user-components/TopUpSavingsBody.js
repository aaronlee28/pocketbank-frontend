import { useEffect, useState } from 'react';
import QRCode from 'qrcode';
import DepositError from '../common/DepositError';
import SuccessModalUniversal from '../common/SuccessModalUniversal';
import '../css/TopUpDeposit.css';
import '../css/Payment.css';

export default function TopUpSavingsBody(props) {
  const {
    userData,
    TopUpSubmitHandler,
    formAmount,
    formDescription,
    changeAmount,
    changeWallet,
    changeDescription,
    setShowSuccess,
    showFailed,
    errorMessage,
    showSuccess,
    setShowFailed,
  } = props;
  const [transferAmount, setTransferAmount] = useState('');
  const [src, setSrc] = useState('');
  const changeTransferAmount = (event) => {
    setTransferAmount(event.target.value);
  };
  useEffect(() => {
    QRCode.toDataURL(`http://localhost:3000/topupqr/${userData.accountNumber}/${transferAmount}`).then((data) => setSrc(data));
  }, [userData, transferAmount]);
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
            <h1 className="deposit-back-text"><a href="/userhome" style={{ color: 'White' }}>Home</a></h1>

          </div>
        </div>
      </div>

      <div className="container-bottom">
        <div className="card deposit-card">
          <div className="card-body">
            <div className="container">
              <h1 className="card-title topup-title" style={{ color: 'black' }}>Top Up Amount</h1>
              <div className="form-div">
                <form onSubmit={TopUpSubmitHandler}>
                  <select className="topupform-savings wallet-select" name="deposit-select" id="deposit-select" onChange={changeWallet}>
                    <option value="6">ShopeePay</option>
                    <option value="7">GoPay</option>
                  </select>
                  <input className=" topupform-savings  amount-input" type="number" value={formAmount} placeholder="1.000.000" onChange={changeAmount} />
                  <input className=" topupform-savings description-input " type="text" value={formDescription} placeholder="Description" onChange={changeDescription} />

                  <input className="submit-topup" type="submit" value="Submit" />
                </form>
                <div className="container">
                  <form>
                    <h1 className="topup-title">Transfer Amount</h1>
                    <input className=" topupform-savings  amount-input" type="number" value={transferAmount} placeholder="Optional" onChange={changeTransferAmount} />
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container qr-container">
        <img className="qr-code" src={src} alt={Math.random()} />
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
