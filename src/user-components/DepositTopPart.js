import '../css/Deposit.css';
import AddDot from '../common/AddDot';

export default function DepositTopPart(props) {
  const {
    userDeposit,
  } = props;

  let totalDeposit = 0;
  for (let i = 0; i < userDeposit?.length; i += 1) {
    /* eslint no-unsafe-optional-chaining: "error" */
    totalDeposit += userDeposit[i]?.balance;
  }

  return (

    <div>
      {userDeposit === null ? (
        <div className="deposit-page-container">
          <div className="container">
            <div className="container top-page-container">
              <h1 className="deposit-back">
                <a href="/userhome" style={{ color: 'white' }}>
                  &lt;&nbsp;&nbsp;
                </a>
              </h1>
              <h1 className="deposit-back-text"><a href="/userhome" style={{ color: 'white' }}>Deposit</a></h1>

            </div>
          </div>

        </div>

      ) : (
        <div className="deposit-page-container">
          <div className="container">
            <div className="container top-page-container">
              <h1 className="deposit-back">
                <a href="/userhome" style={{ color: 'white' }}>
                  &lt;&nbsp;&nbsp;
                </a>
              </h1>
              <h1 className="deposit-back-text"><a href="/userhome" style={{ color: 'white' }}>Deposit</a></h1>

              <h1 className="total-deposit-text" style={{ color: 'white' }}>Total Deposit</h1>
              <h1 className="rupiah-text" style={{ color: 'white' }}>Rp&nbsp;</h1>
              <h5 className="deposit-balance">
                {AddDot(totalDeposit)}
              </h5>
            </div>
          </div>

        </div>

      )}
    </div>
  );
}
