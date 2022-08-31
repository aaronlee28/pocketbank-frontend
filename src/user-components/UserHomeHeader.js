import '../css/Form.css';
import '../css/Main.css';
import { useEffect, useState } from 'react';
import UnauthorizedErrorModal from '../common/UnauthorizedErrorModal';
import bluepp from '../photo/bluepp.png';

export default function UserHomeHeader(props) {
  const {
    isError,
    showFailed,
    setShowFailed,
    userData,
    errorMessage,
  } = props;

  const [image, setImage] = useState('');

  useEffect(() => {
    if (isError == null) {
      return;
    }
    const SetProfilePicture = () => {
      if (userData.profilePicture === '') {
        setImage(bluepp);
      } else {
        const profilePic = `data:image/png;base64,${userData.profilePicture}`;
        setImage(profilePic);
      }
    };
    const CheckSubmitStatus = () => {
      if (isError) {
        setShowFailed(true);
      }
    };
    CheckSubmitStatus();
    SetProfilePicture();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData]);
  return (
    <div className="container formContainer">
      <div className="row">
        <div className="col-2 image-col">
          <img className="profilePicture" src={image} alt="" />
        </div>
        <div className="col-10 user-name-col">
          <h1 className="userName">{userData.name}</h1>
          <h1 className="userAccountNumber">
            Account Number:&nbsp;
            {userData.accountNumber}
          </h1>
          <h1 className="userAccountNumber">
            Referral Code:&nbsp;
            {userData.referralNumber}
          </h1>
        </div>
      </div>

      <UnauthorizedErrorModal
        showFailed={showFailed}
        errorMessage={errorMessage}
        closeError={() => setShowFailed(false)}
      />
    </div>
  );
}
