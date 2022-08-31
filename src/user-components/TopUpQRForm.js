import '../css/Form.css';
import { useEffect } from 'react';
import SigninError from '../common/SigninError';
import SuccessModal from '../common/SuccessModal';
import ErrorModal from '../common/ErrorModal';

export default function TopUpQRForm(props) {
  const {
    amount,
    description,
    changeAmount,
    changeDescription,
    registerSubmitHandler,
    showSuccess,
    setShowSuccess,
    showFailed,
    setShowFailed,
    isError,
    errorMessage,
    fixedAmount,
  } = props;

  useEffect(() => {
    if (isError == null) {
      return;
    }
    const checkSubmitStatus = () => {
      if (isError) {
        setShowFailed(true);
      }
      if (!isError) setShowSuccess(true);
    };
    checkSubmitStatus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isError]);

  return (
    <div className="container formContainer">
      <a className="homepageTitle" href="/">QR Transfer</a>
      <form className="formClass" onSubmit={registerSubmitHandler}>

        <h5>Amount</h5>
        {fixedAmount === undefined ? (
          <input className="amount-input qr-input" type="text" value={amount} onChange={changeAmount} />
        ) : (
          <input className="amount-input qr-input" type="text" value={fixedAmount} onChange={changeAmount} readOnly style={{ backgroundColor: 'darkgrey' }} />
        )}
        <h5>Wallet</h5>
        <input className="qr-wallet-id qr-input" type="text" value="External Transfer" onChange={changeAmount} readOnly />
        <h5>Description</h5>
        <input className="description-input qr-input" type="text" value={description} onChange={changeDescription} />
        <input className="submit-qr" type="submit" value="Submit Payment" />
        <SigninError
          showFailed={showFailed}
          closeError={() => setShowFailed(false)}
        />
        <SuccessModal
          showSuccess={showSuccess}
          onClose={() => setShowSuccess(false)}
        />
        <ErrorModal
          showFailed={showFailed}
          errorMessage={errorMessage}
          closeError={() => setShowFailed(false)}
        />
      </form>
    </div>

  );
}
