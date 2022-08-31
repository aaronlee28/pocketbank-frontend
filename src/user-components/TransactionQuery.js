import { useEffect, useState } from 'react';
import Cookies from 'universal-cookie';
import axios from 'axios';
import CsvDownload from 'react-json-to-csv';
import UnauthorizedErrorModal from '../common/UnauthorizedErrorModal';
import TransactionsTable from './TransactionsTable';
import '../css/Transactions.css';
import useAxiosGet from '../hooks/useAxiosGet';
import api from '../user-pages/api';

export default function TransactionQuery() {
  const [isError, setIsError] = useState(null);
  const [showFailed, setShowFailed] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [userData, setUserData] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [periodFilter, setPeriodFilter] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [search, setSearch] = useState('');
  const [minAmount, setMinAmount] = useState('');
  const [maxAmount, setMaxAmount] = useState('');
  const cookies = new Cookies();

  const authCookies = `Bearer ${cookies.get('idToken')}`;

  let urlTransaction;
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: authCookies,
    },
  };

  const urlUserDetails = api('userdetails');
  const [data1, error1] = useAxiosGet(urlUserDetails, config, setIsError);
  useEffect(() => {
    setUserData(data1);
  }, [data1]);
  useEffect(() => {
    setErrorMessage(error1);
  }, [error1]);
  useEffect(() => {
    if (isError == null) {
      return;
    }
    const CheckSubmitStatus = () => {
      if (isError) {
        setShowFailed(true);
      }
    };
    CheckSubmitStatus();
  }, [isError]);
  const setPFilter = (event) => {
    setPeriodFilter(event.target.value);
  };
  const setSort = (event) => {
    setSortBy(event.target.value);
  };
  const setSearchValue = (event) => {
    setSearch(event.target.value);
  };
  const setMinAmountValue = (event) => {
    setMinAmount(event.target.value);
  };
  const setMaxAmountValue = (event) => {
    setMaxAmount(event.target.value);
  };
  useEffect(() => {
    urlTransaction = api(`transactionhistory?search=${search}&${periodFilter}${sortBy}minAmount=${minAmount}&maxAmount=${maxAmount}`);
    const GetTransaction = (u, con, setiserror) => {
      axios.get(u, con)
        .then((response) => response.data)
        .then((response) => {
          if (response.statusCode === 400) {
            setiserror(true);
          } else {
            setiserror(false);
            setTransactions(response.data);
          }
        })
        .catch((event) => {
          setiserror(true);
          const errMessage = event.response.data.error;
          setErrorMessage(errMessage);
        });
    };
    GetTransaction(urlTransaction, config, setIsError);
  }, [periodFilter, sortBy, minAmount, maxAmount, search]);

  return (
    <div className="container page-container">
      <div className="transtitle page-header">
        <h1 className="page-title">Transactions History</h1>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-6 filter-period">
            <select className="filterPeriod" name="selectPeriod" id="selectPeriod" onChange={setPFilter}>
              <option value="">Filter By:</option>
              <option value="filterTime=7&">Last 7 Days</option>
              <option value="filterTime=30&">Last 30 days</option>
              <option value="filterTime=90&">Last 3 Months</option>
            </select>
          </div>
          <div className="col-6 sortby">
            <select className="filterPeriod" name="selectPeriod" id="selectPeriod" onChange={setSort}>
              <option value="">Sort By:</option>
              <option value="sortBy=created_at&">Date</option>
              <option value="sortBy=amount&">Amount</option>
            </select>
          </div>
        </div>
        <form className="formClass">
          <input className="searchbar" type="text" placeholder="Search" onChange={setSearchValue} value={search} />
          <div className="row">
            <div className="col-6 min-amount">
              <input className="min-amount searchbar" type="text" placeholder="Minimum Amount" onChange={setMinAmountValue} value={minAmount} />
            </div>
            <div className="col-6 min-amount">
              <input className="min-amount searchbar" type="text" placeholder="Maximum Amount" onChange={setMaxAmountValue} value={maxAmount} />
            </div>
          </div>
        </form>
        <div className="download-container">
          <CsvDownload className="download-button" data={transactions} />
        </div>

      </div>

      <UnauthorizedErrorModal
        showFailed={showFailed}
        errorMessage={errorMessage}
        closeError={() => setShowFailed(false)}
      />
      <TransactionsTable
        transactions={transactions}
        userData={userData}

      />
    </div>

  );
}
