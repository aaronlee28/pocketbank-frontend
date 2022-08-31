import { useState } from 'react';
import Cookies from 'universal-cookie';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleArrowLeft } from '@fortawesome/free-solid-svg-icons';
import api from '../user-pages/api';

export default function GlobalInterestRate() {
  const navigate = useNavigate();
  const [globalInterestRate, setGlobalInterest] = useState([]);

  const ChangeGlobalInterest = (event) => {
    setGlobalInterest(event.target.value);
  };

  const ChangePatchData = () => ({
    interestRate: Number(globalInterestRate),
  });

  const cookies = new Cookies();

  const authCookies = `Bearer ${cookies.get('idToken')}`;

  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: authCookies,
    },
  };

  const urlReferral = api('usersrate');
  const PatchUserStatus = (data) => {
    axios.patch(urlReferral, data, config)
      .then((response) => response.data);
  };

  const PatchSubmitHandler = (event) => {
    event.preventDefault();
    PatchUserStatus(ChangePatchData());
    navigate('/adminhome');
  };

  return (
    <div className="container">
      <div className="back">
        <Link to="/adminhome">
          <FontAwesomeIcon className="transIcon" icon={faCircleArrowLeft} style={{ fontSize: '1.5rem', color: '#083eab', marginTop: '5rem' }} />
        </Link>
      </div>

      <div className="container">
        <div className="card transactions-card">
          <div className="card-body">
            <div className=" transactiontitle">
              <h1 className="transactiontoptext">User Deposit Detail</h1>
            </div>
            <div>
              <form className="formClass" onSubmit={PatchSubmitHandler}>

                <h5>Interest Rate</h5>
                <input className="formInputlogreg passwordInput" type="text" value={globalInterestRate} onChange={ChangeGlobalInterest} />
                <input className="sendButton1" type="submit" value="Submit" />

              </form>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
