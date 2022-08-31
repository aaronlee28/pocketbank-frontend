import '../css/Form.css';
import '../css/Main.css';
import AddDot from '../common/AddDot';

export default function UserHomeAccountCard(props) {
  const {
    userSavings,
    userDeposit,
  } = props;

  let totalDeposit = 0;
  for (let i = 0; i < userDeposit?.length; i += 1) {
    totalDeposit += userDeposit[i].balance;
  }

  const totalAccount = totalDeposit + userSavings.balance;
  return (
    <div className="container sdContainer">
      <div className="card balancecard">
        <div className="card-body">
          <div className="card-top-part">
            <h1 className="totalBalance">Total Balance</h1>
            <h5 className="currency">Rp.</h5>
            <h5 className="balancedigit balance">{AddDot(totalAccount)}</h5>
          </div>
          <div className="card-middle-part">
            <h1 className="totalBalance">Savings Balance</h1>
            <div className="container">
              <div className="row">
                <div className="col-6">
                  <h5 className="rates">
                    {userSavings.interest * 100}
                    % per year
                  </h5>

                </div>
                <div className="col-6 showbalance">
                  <h5 className="subbalance">
                    Rp.
                    {AddDot(userSavings.balance)}
                  </h5>
                </div>
              </div>
            </div>

          </div>

          <div className="card-bottom-part">
            <h1 className="totalBalance">Deposit Balance</h1>
            <div className="container">
              <div className="row">
                <div className="col-6">
                  <h5 className="rates">
                    6 or 8% per year
                  </h5>

                </div>
                <div className="col-6 showbalance">
                  <h5 className="subbalance">
                    Rp.
                    {AddDot(totalDeposit)}
                  </h5>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
