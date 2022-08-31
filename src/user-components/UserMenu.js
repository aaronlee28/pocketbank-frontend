import '../css/Main.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoneyBillTransfer, faMoneyBill, faMoneyBillTrendUp } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

export default function UserMenu() {
  return (
    <div className="container menuContainer">
      <div className="card menuCard">
        <div className="card-body">
          <div className="container">
            <div className="row">
              <div className="col-4">
                <div className="menutitle">
                  <Link to="/payment">

                    <FontAwesomeIcon className="menuIcon" icon={faMoneyBillTransfer} style={{ color: '#083eab' }} />
                  </Link>

                </div>
                <h5 className="menutitle">Payment</h5>
              </div>
              <div className="col-4">
                <div className="menutitle">
                  <Link to="/deposit">

                    <FontAwesomeIcon className="menuIcon" icon={faMoneyBill} style={{ color: '#083eab' }} />
                  </Link>

                </div>

                <h5 className="menutitle">Deposit</h5>
              </div>
              <div className="col-4">
                <div className="menutitle">
                  <Link to="/topupsavings">

                    <FontAwesomeIcon className="menuIcon" icon={faMoneyBillTrendUp} style={{ color: '#083eab' }} />
                  </Link>

                </div>

                <h5 className="menutitle">Top Up</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
