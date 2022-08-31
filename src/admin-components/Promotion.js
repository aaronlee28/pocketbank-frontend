import { useEffect, useState } from 'react';
import Cookies from 'universal-cookie';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleArrowLeft } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import useAxiosGet from '../hooks/useAxiosGet';
import PromotionPatch from './PromotionPatch';
import '../css/Admin.css';
import api from '../user-pages/api';

export default function Promotion() {
  const [getPromotion, setGetPromotion] = useState([]);
  const [isError, setIsError] = useState(null);
  const [formTitle, setFormTitle] = useState('');
  const [formId, setFormId] = useState('');
  const [formPhoto, setFormPhoto] = useState('');
  const [addTitle, setAddTitle] = useState('');
  const [addPhoto, setAddPhoto] = useState(null);

  const cookies = new Cookies();

  const authCookies = `Bearer ${cookies.get('idToken')}`;

  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: authCookies,
    },
  };

  const urlPromotion = api('promotion');
  const [data1] = useAxiosGet(urlPromotion, config, setIsError);

  useEffect(() => {
    setGetPromotion(data1);
  }, [data1, isError]);

  const DeletePromo = (url, data) => {
    axios.patch(url, data, config)
      .then((response) => response.data);
  };
  const empty = '';
  const DeleteSubmitHandler = (event) => {
    const urlDeletePromotion = api(`promotion/${event.target.value}`);
    DeletePromo(urlDeletePromotion, empty);
    window.location.reload();
  };

  const changeTitle = (event) => {
    setFormTitle(event.target.value);
  };
  const changeId = (event) => {
    setFormId(event.target.value);
  };
  const changePromotion = (event) => {
    event.preventDefault();
    let baseURL = '';
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        baseURL = reader.result;
        const b64data = baseURL.split(',');
        resolve(setFormPhoto(b64data[1]));
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };
  const changePatchData = () => {
    const formData = new FormData();
    formData.append('title', formTitle);
    formData.append('id', formId);
    formData.append('photo', formPhoto);
    return (formData);
  };
  const patchPromotion = (url, data) => {
    axios.patch(url, data, config)
      .then((response) => response.data);
  };
  const PatchSubmitHandler = (event) => {
    event.preventDefault();
    changeId(event);
    const patchUrl = api(`updatepromotion/${event.target.value}`);
    patchPromotion(patchUrl, changePatchData());
    window.location.reload();
  };

  const changeAddTitle = (event) => {
    setAddTitle(event.target.value);
  };

  const changeAddPhoto = (event) => {
    event.preventDefault();
    let baseURL = '';
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        baseURL = reader.result;
        const b64data = baseURL.split(',');
        resolve(setAddPhoto(b64data[1]));
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };
  const changePostData = () => {
    const formData = new FormData();
    formData.append('title', addTitle);
    formData.append('photo', addPhoto);
    return (formData);
  };
  const postPromotion = (data) => {
    axios.post(api('promotion'), data, config)
      .then((response) => response.data);
  };
  const postSubmitHandler = (event) => {
    event.preventDefault();
    postPromotion(changePostData());
    window.location.reload();
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
            <h1 className="user-title">Promotions:</h1>
            <div className="container">
              {getPromotion.map((promo) => (
                <div className="container promo-cont" key={Math.random()}>
                  <div className="promo-title">
                    <h1 className="generic-text">{promo.title}</h1>
                  </div>
                  <div className="banner-cont">
                    <img src={`data:image/png;base64,${promo.photo}`} alt="" className="promo-banner" />
                  </div>
                  <button className="delete-promo" value={promo.id} type="button" onClick={DeleteSubmitHandler}>Delete</button>
                  <PromotionPatch
                    promo={promo}
                    PatchSubmitHandler={PatchSubmitHandler}
                    formTitle={formTitle}
                    changeTitle={changeTitle}
                    changeId={changeId}
                    changePromotion={changePromotion}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="card transactions-card">
        <div className="card-body">
          <div className=" transactiontitle">
            <h1 className="transactiontoptext">Add Promotion</h1>
          </div>
          <div className="container">
            <form onSubmit={postSubmitHandler}>
              <div className="container">
                <h5 className="form-title generic-text">Title</h5>
                <input className=" nameInput" type="text" value={addTitle} onChange={changeAddTitle} />
                <input className=" form-input-patch contactInput promo-input" type="file" onChange={changeAddPhoto} />
                <input className="submit-patch" type="submit" value="Submit" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

  );
}
