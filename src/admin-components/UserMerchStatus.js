import { useEffect, useState } from 'react';
import Cookies from 'universal-cookie';
import { Link, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleArrowLeft } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import useAxiosGet from '../hooks/useAxiosGet';
import api from '../user-pages/api';
import SuccessModalStay from '../common/SuccessModalStay';

export default function UserMerchStatus() {
  const params = useParams();
  const cookies = new Cookies();
  const userid = params.id;
  const [merchStatus, setMerchStatus] = useState([]);
  const [isError, setIsError] = useState(null);
  const [isError2, setIsError2] = useState(null);
  const [formUserId, setFormUserId] = useState(params.id);
  const [formMerchToSend, setFormMerchToSend] = useState('pen');
  const [formStatus, setSFormtatus] = useState('On process');
  const [showSuccess, setShowSuccess] = useState(false);

  const changeUserId = (event) => {
    setFormUserId(event.target.value);
  };
  const changeMerchToSend = (event) => {
    setFormMerchToSend(event.target.value);
  };
  const changeStatus = (event) => {
    setSFormtatus(event.target.value);
  };

  const ChangePostData = () => ({
    userID: Number(formUserId),
    merchToSend: formMerchToSend,
    status: formStatus,
  });

  const authCookies = `Bearer ${cookies.get('idToken')}`;
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: authCookies,
    },
  };
  const urlReferral = api(`merchandise/${params.id}`);
  const [data1] = useAxiosGet(urlReferral, config, setIsError);

  useEffect(() => {
    setMerchStatus(data1);
  }, [data1, isError]);

  useEffect(() => {
    if (isError2 == null) {
      return;
    }
    const checkSubmitStatus2 = () => {
      if (!isError2) setShowSuccess(true);
    };

    checkSubmitStatus2();
  }, [isError2]);

  const fetchSuccess2 = () => {
    setIsError2(false);
  };
  const fetchFailed2 = () => {
    setIsError2(true);
  };
  const urlMerch = api('merchandisestatus');

  const PostSendMerch = (data) => {
    axios.post(urlMerch, data, config)
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
  const PostSubmitHandler = (event) => {
    event.preventDefault();
    PostSendMerch(ChangePostData());
  };

  return (
    <div className="container">
      <div className="back">
        <Link to="/adminhome">
          <FontAwesomeIcon className="transIcon" icon={faCircleArrowLeft} style={{ fontSize: '1.5rem', color: '#083eab', marginTop: '5rem' }} />
        </Link>
      </div>
      <div className="card transactions-card">
        <div className="card-body">
          <div className=" transactiontitle">
            <h1 className="transactiontoptext">
              Users:&nbsp;
              {params.id}
            </h1>
          </div>
          <div>
            {merchStatus.pen === false ? (
              <h1 className="generic-css-body">Not eligibible for pen</h1>
            ) : (
              <div>
                <h1 className="generic-css-body">Eligible for pen</h1>
              </div>

            )}
          </div>
          <div>
            {merchStatus.umbrella === false ? (
              <h1 className="generic-css-body">Not eligibible for umbrella</h1>
            ) : (
              <h1 className="generic-css-body">Eligible for umbrella</h1>
            )}
          </div>
          <div>
            {merchStatus.cardHolder === false ? (
              <h1 className="generic-css-body">Not eligibible for card holder</h1>
            ) : (
              <h1 className="generic-css-body">Eligible for card holder</h1>
            )}
          </div>
          <form className="formClass" onSubmit={PostSubmitHandler}>
            <div className="hidethis">
              <input className="merch-input hide" type="text" value={userid} onChange={changeUserId} />

            </div>
            <h5>Item</h5>
            <select className="merch-input" name="merch-input" id="merch-input" onChange={changeMerchToSend}>
              <option value="pen">Pen</option>
              <option value="umbrella">Umbrella</option>
              <option value="card holder">Card Holder</option>
            </select>
            <h5>Status</h5>
            <select className="merch-input" name="merch-input" id="merch-input" onChange={changeStatus}>
              <option value="On process">On Process</option>
              <option value="On delivery">On Delivery</option>
              <option value="Success">Success</option>
            </select>
            <input className="generic-button" type="submit" value="Submit" />
          </form>
        </div>
      </div>
      <SuccessModalStay
        showSuccess={showSuccess}
        onClose={() => setShowSuccess(false)}
      />
    </div>
  );
}
