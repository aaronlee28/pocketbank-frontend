import 'bootstrap/dist/css/bootstrap.min.css';

import {
  Routes,
  Route,

} from 'react-router-dom';
import './App.css';
import Home from './user-pages/Home';
import Register from './user-pages/Register';
import Signin from './user-pages/Signin';
import UserHome from './user-pages/UserHome';
import Transaction from './user-pages/Transaction';
import Deposit from './user-pages/Deposit';
import MoreDeposit from './user-pages/MoreDeposit';
import TopUpDeposit from './user-pages/TopUpDeposit';
import Payment from './user-pages/Payment';
import TopUpSavings from './user-pages/TopUpSavings';
import TopUpQRCode from './user-pages/TopUpQrCode';
import UserProfile from './user-pages/UserProfile';
import ResetPassword from "./user-components/ResetPassword";

import AdminSignIn from './admin-page/AdminSignIn';
import AdminHomePage from './admin-page/AdminHomePage';
import UserTransactions from './admin-components/UserTransactions';
import UserReferral from './admin-components/UserReferral';
import ActivateDeactivate from './admin-components/ActivateDeactivate';
import UserMerchStatus from './admin-components/UserMerchStatus';
import MerchandiseSettings from './admin-components/MerchandiseSettings';
import UserDeposit from './admin-components/UserDeposit';
import ChangeInterestRate from './admin-components/ChangeInterestRate';
import GlobalInterestRate from './admin-components/GlobalInterestRate';
import Promotion from './admin-components/Promotion';

function App() {

  return (
    <Routes>
      <Route path="/">
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/userhome" element={<UserHome />} />
        <Route path="/transaction" element={<Transaction />} />
        <Route path="/deposit" element={<Deposit />} />
        <Route path="/moredeposit" element={<MoreDeposit />} />
        <Route path="/topupdeposit" element={<TopUpDeposit />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/topupsavings" element={<TopUpSavings />} />
        <Route path="/topupqr/:id" element={<TopUpQRCode />} />
        <Route path="/topupqr/:id/:amount" element={<TopUpQRCode />} />
        <Route path="/userprofile" element={<UserProfile />} />
        <Route path="/resetpassword" element={<ResetPassword />} />
        {/* admin */}
        <Route path="/adminsignin" element={<AdminSignIn />} />
        <Route path="/adminhome" element={<AdminHomePage />} />
        <Route path="/usertransactions/:id" element={<UserTransactions />} />
        <Route path="/userreferral/:id" element={<UserReferral />} />
        <Route path="/setuserstatus/:id" element={<ActivateDeactivate />} />
        <Route path="/usermerchstatus/:id" element={<UserMerchStatus />} />
        <Route path="/usermerchstatus" element={<MerchandiseSettings />} />
        <Route path="/userdepositinfo/:id" element={<UserDeposit />} />
        <Route path="/userrate/:id" element={<ChangeInterestRate />} />
        <Route path="/userrate" element={<GlobalInterestRate />} />
        <Route path="/promotion" element={<Promotion />} />
      </Route>
      <Route
        path="*"
        element={
          <h1>404 Not Found!</h1>
        }
      />
    </Routes>

  );
}
export default App;
