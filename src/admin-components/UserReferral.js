import { useEffect, useState } from 'react';
import Cookies from 'universal-cookie';
import { Link, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleArrowLeft } from '@fortawesome/free-solid-svg-icons';
import useAxiosGet from '../hooks/useAxiosGet';
import api from '../user-pages/api';

export default function UserReferral() {
  const [referralData, setReferralData] = useState([]);
  const [isError, setIsError] = useState(null);
  const cookies = new Cookies();

  const params = useParams();
  const authCookies = `Bearer ${cookies.get('idToken')}`;

  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: authCookies,
    },
  };

  const urlReferral = api(`userreferraldetails/${params.id}`);
  const [data1] = useAxiosGet(urlReferral, config, setIsError);

  useEffect(() => {
    setReferralData(data1);
  }, [data1, isError]);

  return (
    <div className="container">
      <div className="back">
        <Link to="/adminhome">
          <FontAwesomeIcon className="transIcon" icon={faCircleArrowLeft} style={{ fontSize: '1.5rem', color: '#083eab', marginTop: '5rem' }} />
        </Link>
      </div>

      <div className="card admin-main-card">
        <div className="card-body admin-card">
          <div className="row info-card" key={Math.random()}>
            <h1 className="user-title">Used Count</h1>
            <div className="container">
              <h1>{referralData.count}</h1>
            </div>
          </div>
        </div>
      </div>

      <div className="card admin-main-card">
        <div className="card-body admin-card bottom-card">
          <div className="row info-card" key={Math.random()}>
            <h1 className="user-title">User ID of users</h1>
            <div className="container">
              {referralData.listOfUsers?.map((data) => (
                <div>
                  {data}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>

  );
}
