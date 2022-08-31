import '../css/Form.css';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SigninError from '../common/SigninError';

export default function SigninForm(props) {
  const {
    loginEmail,
    loginPassword,
    changeLoginEmail,
    changeLoginPassword,
    isError,
    SigninSubmitHandler,
    showFailed,
    setShowFailed,
  } = props;

  const navigate = useNavigate();

  useEffect(() => {
    if (isError == null) {
      return;
    }
    const CheckSubmitStatus = () => {
      if (isError) {
        setShowFailed(true);
      }
      if (!isError) {
        navigate('/userhome');
      }
    };
    CheckSubmitStatus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isError]);
  return (
    <div className="container formContainer">
      <a className="homepageTitle" href="/">Sign In</a>
      <form className="formClass" onSubmit={SigninSubmitHandler}>

        <h5>Email</h5>
        <input className="formInputlogreg loginInput" type="email" value={loginEmail} onChange={changeLoginEmail} />
        <h5>Password</h5>
        <input className="formInputlogreg passwordInput" type="password" value={loginPassword} onChange={changeLoginPassword} />
        <div className="sign-reset-button">
          <input className="sign-in-button sign-button" type="submit" value="Sign In" />
          <Link to="/resetpassword">
            <button className="sign-in-button reset-button" type="button">Reset Password</button>
          </Link>
        </div>

        <SigninError
          showFailed={showFailed}
          closeError={() => setShowFailed(false)}
        />
      </form>
    </div>

  );
}
