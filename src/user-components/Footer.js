import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouseUser, faArrowRightArrowLeft, faUser } from '@fortawesome/free-solid-svg-icons';

import '../css/Footer.css';

export default function Footer() {
  const { pathname } = useLocation();
  let homeIcon;
  let transferIcon;
  let userIcon;
  if (pathname === '/') return null;

  if (pathname === '/register') return null;

  if (pathname === '/signin') return null;

  if (pathname === '/userhome') {
    homeIcon = (
      <div className="col-4 footeritem" style={{ color: '#083eab' }}>
        <FontAwesomeIcon icon={faHouseUser} />
        <h5 className="footer-text">Home</h5>
      </div>
    );
  } else {
    homeIcon = (

      <div className="col-4 footeritem" style={{ color: '#181716' }}>
        <Link to="/userhome">
          <FontAwesomeIcon icon={faHouseUser} style={{ color: '#181716' }} />
        </Link>
        <h5 className="footer-text">Home</h5>
      </div>
    );
  }

  if (pathname === '/payment') {
    transferIcon = (
      <div className="col-4 footeritem" style={{ color: '#083eab' }}>
        <FontAwesomeIcon icon={faArrowRightArrowLeft} />
        <h5 className="footer-text">Payment</h5>
      </div>
    );
  } else {
    transferIcon = (

      <div className="col-4 footeritem" style={{ color: '#181716' }}>
        <Link to="/payment">

          <FontAwesomeIcon icon={faArrowRightArrowLeft} style={{ color: '#181716' }} />
        </Link>
        <h5 className="footer-text">Payment</h5>
      </div>
    );
  }

  if (pathname === '/userprofile') {
    userIcon = (
      <div className="col-4 footeritem" style={{ color: '#083eab' }}>
        <FontAwesomeIcon icon={faUser} />
        <h5 className="footer-text">User</h5>
      </div>
    );
  } else {
    userIcon = (
      <div className="col-4 footeritem" style={{ color: '#181716' }}>
        <Link to="/userprofile">

          <FontAwesomeIcon icon={faUser} style={{ color: '#181716' }} />
        </Link>

        <h5 className="footer-text">User</h5>
      </div>
    );
  }

  return (
    <div className="App">
      <div className="footer-container">
        <div className="row footer-row">
          {homeIcon}
          {transferIcon}
          {userIcon}
        </div>
      </div>

    </div>

  );
}
