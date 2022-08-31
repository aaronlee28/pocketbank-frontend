import { useEffect, useState } from 'react';
import Cookies from 'universal-cookie';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleArrowLeft } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import useAxiosGet from '../hooks/useAxiosGet';
import api from '../user-pages/api';

export default function MerchandiseSettings() {
  const [eligibleUser, setEligibleUser] = useState([]);
  const [merchStock, setMerchStock] = useState([]);
  const [isError, setIsError] = useState(null);
  const [formName, setFormName] = useState('pen');
  const [formQuantity, setFormQuantity] = useState('50');
  const cookies = new Cookies();

  const changeName = (event) => {
    setFormName(event.target.value);
  };
  const changeQuantityItem = (event) => {
    setFormQuantity(event.target.value);
  };

  const ChangePostData = () => ({
    name: formName,
    stock: Number(formQuantity),
  });

  const authCookies = `Bearer ${cookies.get('idToken')}`;

  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: authCookies,
    },
  };

  const urlReferral = api('eligiblemerchandiselist');
  const [data1] = useAxiosGet(urlReferral, config, setIsError);
  const urlStock = api('getmerchstock');
  const [data2] = useAxiosGet(urlStock, config, setIsError);

  useEffect(() => {
    setEligibleUser(data1);
  }, [data1, isError]);

  useEffect(() => {
    setMerchStock(data2);
  }, [data2]);

  const urlPatchStock = api('updatemerchstocks');

  const PatchUpdateMerch = (data) => {
    axios.patch(urlPatchStock, data, config)
      .then((response) => response.data);
  };
  const PatchSubmitHandler = () => {
    PatchUpdateMerch(ChangePostData());
  };

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
            <h1 className="user-title">Eligible User</h1>
            <div className="container">
              {eligibleUser?.map((user) => (
                <div key={Math.random()}>
                  <h1>
                    User ID:
                    {user.userID}
                  </h1>
                  <table>
                    <tbody>
                      <tr>
                        <td>Pen</td>
                        {user.pen === true ? (
                          <td>
                            Eligible. Status:
                            {user.sendPen}
                          </td>
                        ) : (
                          <td>Not Eligible</td>
                        )}
                      </tr>
                      <tr>
                        <td>Umbrella</td>
                        {user.umbrella === true ? (
                          <td>
                            Eligible. Status:
                            {user.sendUmbrella}
                          </td>
                        ) : (
                          <td>Not Eligible</td>
                        )}
                      </tr>
                      <tr>
                        <td>Card Holder</td>
                        {user.cardHolder === true ? (
                          <td>
                            Eligible. Status:
                            {user.sendCardHolder}
                          </td>
                        ) : (
                          <td>Not Eligible</td>
                        )}
                      </tr>
                    </tbody>
                  </table>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="card-body admin-card">
          <div className="row info-card" key={Math.random()}>
            <h1 className="user-title">Eligible User</h1>
            <div className="container">
              <h1>
                Stock Count:
              </h1>
              <div className="row">
                <div className="col-6">
                  <h1 className="generic-css-body-2">Name</h1>
                </div>
                <div className="col-6">
                  <h1 className="generic-css-body-2">Stock Quantity</h1>
                </div>
              </div>
              {merchStock?.map((merch) => (
                <div key={Math.random()}>
                  <div className="row generic-css-body">
                    <div className="col-6 ">
                      <h1 className="">{merch.name}</h1>
                    </div>
                    <div className="col-6">
                      <h1 className="">{merch.stockCount}</h1>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="card-body admin-card bottom-card">
          <div className="row info-card" key={Math.random()}>
            <h1 className="user-title">Manage Stock</h1>
            <div className="container">
              <form className="formClass" onSubmit={PatchSubmitHandler}>

                <h5>Product</h5>
                <select className="merch-form" name="deposit-merch-form" id="deposit-merch-form" onChange={changeName}>
                  <option value="pen">Pen</option>
                  <option value="umbrella">Umbrella</option>
                  <option value="card_holder">Card Holder</option>
                </select>
                <h5>Quantity</h5>
                <input className="merch-form" type="number" value={formQuantity} placeholder="50" onChange={changeQuantityItem} />
                <input className="sendButton" type="submit" value="Send" />

              </form>

            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
