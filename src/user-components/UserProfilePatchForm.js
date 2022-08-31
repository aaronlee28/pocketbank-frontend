import { useEffect } from 'react';
import Cookies from 'universal-cookie';
import SuccessModalUniversal from '../common/SuccessModalUniversal';
import ErrorProfilePatch from '../common/ErrorProfilePatch';
import '../css/Payment.css';
import '../css/UserProfile.css';

const cookies = new Cookies();

export default function UserProfilePatchForm(props) {
  const {
    formName,
    formEmail,
    formContact,
    changeName,
    changeEmail,
    changeContact,
    showSuccess,
    setShowSuccess,
    showFailed,
    setShowFailed,
    isError,
    errorMessage,
    userData,
    PatchSubmitHandler,
    changeProfilePicture,
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

  const logout = () => {
    cookies.set('idToken', null, { path: '/' });
  };
  return (
    <div className="user-main">
      <div className="user-page-container">
        <div className="container">
          <div className="container top-page-container">
            <h1 className="deposit-back">
              <a href="/userhome" style={{ color: 'white' }}>
                &lt;&nbsp;&nbsp;
              </a>
            </h1>
            <h1 className="deposit-back-text"><a href="/userhome" style={{ color: 'White' }}>User Profile</a></h1>
          </div>
        </div>
      </div>
      <div className="container-bottom">
        <div className="card deposit-card">
          <div className="card-body">
            <div className="container">
              <div className="form-div">
                <form onSubmit={PatchSubmitHandler}>
                  <div className="container">
                    <h5 className="form-title">Name</h5>
                    <input className="formInputlogreg nameInput" type="text" value={formName} placeholder={userData.name} onChange={changeName} />
                    <h5 className="form-title">Email</h5>
                    <input className="formInputlogreg emailInput" type="text" value={formEmail} placeholder={userData.email} onChange={changeEmail} />
                    <h5 className="form-title">Contact</h5>
                    <input className="formInputlogreg contactInput" type="text" value={formContact} placeholder={userData.contact} onChange={changeContact} />
                    <h5 className="form-title">Profile Picture</h5>
                    <input className="form-input-patch contactInput" type="file" onChange={changeProfilePicture} />
                    <input className="submit-patch" type="submit" value="Submit" />
                  </div>
                </form>
                <div className="container logout-container">
                  <a className="logout" href="/" onClick={logout}>Log Out</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <SuccessModalUniversal
        showSuccess={showSuccess}
        onClose={() => setShowSuccess(false)}
      />
      <ErrorProfilePatch
        showFailed={showFailed}
        errorMessage={errorMessage}
        closeError={() => setShowFailed(false)}
      />
    </div>
  );
}
