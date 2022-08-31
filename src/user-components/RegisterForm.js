import '../css/Form.css';
import { useEffect } from 'react';
import ErrorModal from '../common/ErrorModal';
import SuccessModal from '../common/SuccessModal';

export default function RegisterForm(props) {
  const {
    formName,
    formEmail,
    formContact,
    formPassword,
    formReferralNumber,
    changeName,
    changeEmail,
    changeContact,
    changePassword,
    changeReferralNumber,
    showSuccess,
    setShowSuccess,
    showFailed,
    setShowFailed,
    isError,
    registerSubmitHandler,
    errorMessage,
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
      <a className="homepageTitle" href="/">Register</a>
      <form className="formClass" onSubmit={registerSubmitHandler}>

        <h5>Name</h5>
        <input className="formInputlogreg nameInput" type="text" value={formName} onChange={changeName} />
        <h5>Email</h5>
        <input className="formInputlogreg emailInput" type="email" value={formEmail} onChange={changeEmail} />
        <h5>Contact</h5>
        <input className="formInputlogreg contactInput" type="number" value={formContact} onChange={changeContact} />
        <h5>Password</h5>
        <input className="formInputlogreg passwordInput" type="password" value={formPassword} onChange={changePassword} />
        <h5>Referral Number</h5>
        <input className="formInputlogreg referralNumberInput" type="number" value={formReferralNumber} onChange={changeReferralNumber} />
        <input className="sendButton" type="submit" value="Register" />
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
