import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleArrowLeft } from '@fortawesome/free-solid-svg-icons';
import api from '../user-pages/api';
import ErrorModal from '../common/ErrorModal';
import SuccessModal from '../common/SuccessModal';

export default function ResetPassword() {
  const [userEmail, setUserEmail] = useState('');
  const [code, setCode] = useState(0);
  const [data1, setData1] = useState('');
  const [isError, setIsError] = useState(null);
  const [showFailed, setShowFailed] = useState(false);

  const [resetEmail, setResetEmail] = useState('');
  const [resetPassword, setResetPassword] = useState('');
  const [resetCode, setResetCode] = useState('');
  const [isError2, setIsError2] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);

  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const changeGetCode = () => ({
    email: userEmail,
  });
  const changeEmail = (event) => {
    setUserEmail(event.target.value);
  };
  const fetchSuccess = () => {
    setIsError(false);
  };
  const fetchFailed = () => {
    setIsError(true);
  };
  const getGetCode = (data) => {
    axios.post(api('getcode'), data, config)
      .then((response) => response.data)
      .then((response) => {
        if (response.statusCode === 400) {
          fetchFailed();
        } else {
          fetchSuccess();
          setData1(response.data);
        }
      })
      .catch(() => {
        fetchFailed();
      });
  };
  useEffect(() => {
    if (isError == null) {
      return;
    }
    const CheckSubmitStatus1 = () => {
      if (isError) {
        setShowFailed(true);
      }
    };
    CheckSubmitStatus1();
  }, [isError]);

  useEffect(() => {
    setCode(data1);
  }, [data1]);
  const getCodeSubmitHandler = (event) => {
    event.preventDefault();
    getGetCode(changeGetCode());
  };

  const changePatchPassword = () => ({
    email: resetEmail,
    newPassword: resetPassword,
    code: Number(resetCode),
  });
  const changeResetEmail = (event) => {
    setResetEmail(event.target.value);
  };
  const changeResetPassword = (event) => {
    setResetPassword(event.target.value);
  };
  const changeResetCode = (event) => {
    setResetCode(event.target.value);
  };
  const fetchSuccess2 = () => {
    setIsError2(false);
  };
  const fetchFailed2 = () => {
    setIsError2(true);
  };
  const patchResetPassword = (data) => {
    axios.patch(api('changepassword'), data, config)
      .then((response) => response.data)
      .then((response) => {
        if (response.statusCode === 400) {
          fetchFailed2();
        } else {
          fetchSuccess2();
        }
      })
      .catch(() => {
        fetchFailed2();
      });
  };
  useEffect(() => {
    if (isError2 == null) {
      return;
    }
    const checkSubmitStatus2 = () => {
      if (isError2) {
        setShowFailed(true);
      }
      if (!isError2) setShowSuccess(true);
    };

    checkSubmitStatus2();
  }, [isError2]);
  const patchChangePasswordHandler = (event) => {
    event.preventDefault();
    patchResetPassword(changePatchPassword());
  };
  return (

    <div className="container">
      <div className="back">
        <Link to="/">
          <FontAwesomeIcon className="transIcon" icon={faCircleArrowLeft} style={{ fontSize: '1.5rem', color: '#083eab', marginTop: '5rem' }} />
        </Link>
      </div>
      <div className="card transactions-card">
        <div className="card-body">
          <div className=" transactiontitle">
            <h1 className="transactiontoptext">Get Code</h1>
          </div>
          <div>
            <form className="formClass" onSubmit={getCodeSubmitHandler}>
              <h5>Email</h5>
              <input className="formInputlogreg loginInput" type="email" value={userEmail} onChange={changeEmail} />
              <input className="sendButton1" type="submit" value="Get Code" />
            </form>
            <div className="code-container">
              <h1 className="code">{code.code}</h1>

            </div>

          </div>

        </div>
      </div>
      <div className="card transactions-card form-reset">
        <div className="card-body">
          <div className=" transactiontitle">
            <h1 className="transactiontoptext">Reset Password</h1>
          </div>
          <div>
            <form className="formClass" onSubmit={patchChangePasswordHandler}>
              <h5>Email</h5>
              <input className="formInputlogreg loginInput" type="email" value={resetEmail} onChange={changeResetEmail} />
              <h5>New Password</h5>
              <input className="formInputlogreg loginInput" type="text" value={resetPassword} onChange={changeResetPassword} />
              <h5>Code</h5>
              <input className="formInputlogreg loginInput" type="number" value={resetCode} onChange={changeResetCode} />
              <input className="sendButton1" type="submit" value="Get Code" />
            </form>
            <div className="code-container" />

          </div>

        </div>
      </div>
      <SuccessModal
        showSuccess={showSuccess}
        onClose={() => setShowSuccess(false)}
      />
      <ErrorModal
        showFailed={showFailed}
        closeError={() => setShowFailed(false)}
      />
    </div>
  );
}
