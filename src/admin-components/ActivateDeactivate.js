import Cookies from 'universal-cookie';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleArrowLeft } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import api from '../user-pages/api';

export default function ActivateDeactivate() {
  const cookies = new Cookies();
  const navigate = useNavigate();

  const params = useParams();
  const authCookies = `Bearer ${cookies.get('idToken')}`;

  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: authCookies,
    },
  };

  const urlReferral = api(`changeuserstatus/${params.id}`);
  const PatchUserStatus = (data) => {
    axios.patch(urlReferral, data, config)
      .then((response) => response.data);
  };
  const empty = '';

  const PatchSubmitHandler = (event) => {
    event.preventDefault();
    PatchUserStatus(empty);
    navigate('/adminhome');
  };

  return (
    <div className="container">
      <div className="back">
        <Link to="/adminhome">
          <FontAwesomeIcon className="transIcon" icon={faCircleArrowLeft} style={{ fontSize: '1.5rem', color: '#083eab', marginTop: '5rem' }} />
        </Link>
      </div>
      <div className="switch-div">
        <a className="switch" href="/adminhome" onClick={PatchSubmitHandler}>Switch</a>
      </div>

    </div>
  );
}
