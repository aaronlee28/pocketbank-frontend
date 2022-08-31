import '../css/Form.css';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SigninError from '../common/SigninError';

export default function AdminSigninForm(props) {
  const {
    loginAdminEmail,
    LoginAdminPassword,
    changeLoginAdminEmail,
    changeLoginAdminPassword,
    isError,
    AdminSigninSubmitHandler,
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
        navigate('/adminhome');
      }
    };
    CheckSubmitStatus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isError]);
  return (
    <div className="container formContainer">
      <a className="homepageTitle" href="/">Sign In</a>
      <form className="formClass" onSubmit={AdminSigninSubmitHandler}>

        <h5>Email</h5>
        <input className="formInputlogreg loginInput" type="text" value={loginAdminEmail} onChange={changeLoginAdminEmail} />
        <h5>Password</h5>
        <input className="formInputlogreg passwordInput" type="password" value={LoginAdminPassword} onChange={changeLoginAdminPassword} />
        <input className="sendButton1" type="submit" value="Sign In" />
        <SigninError
          showFailed={showFailed}
          closeError={() => setShowFailed(false)}
        />
      </form>
    </div>

  );
}
