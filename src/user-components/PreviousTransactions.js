import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';
import Cookies from 'universal-cookie';
import axios from 'axios';
import useAxiosGet from '../hooks/useAxiosGet';
import api from '../user-pages/api';

export default function PreviousTransactions(props) {
  const {
    transaction,
    userData,

  } = props;
  const [favoriteContactList, setFavoriteContactList] = useState('');
  const [isError, setIsError] = useState(null);
  const [addFavoriteContact, setAddFavoriteContact] = useState('');
  const userAccNumber = userData?.accountNumber;
  const keypair = {};
  const contactList = [];
  for (let right = 0; right < transaction?.length; right += 1) {
    if (transaction[right]?.receiverName !== userData.name) {
      const nameRight = transaction[right]?.receiverName;

      if (!(nameRight in keypair) && transaction[right].status !== 'Failed') {
        if (transaction[right].to === userAccNumber) {
          keypair[nameRight] = transaction[right].from;
        } else {
          keypair[nameRight] = transaction[right].to;
        }
      }
    }
  }
  const keys = Object.keys(keypair);
  keys.forEach((key) => {
    contactList.push({
      name: key,
      accountNumber: keypair[key],
      favorite: false,
    });
  });
  const filtered = contactList.filter((value, index, self) => index === self
    .findIndex((t) => t.accountNumber === value.accountNumber));
  const changeAddFavoriteContact = (event) => {
    setAddFavoriteContact(event.target.value);
  };
  const cookies = new Cookies();
  const authCookies = `Bearer ${cookies.get('idToken')}`;

  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: authCookies,
    },
  };

  const urlContact = api('favoritecontactlist');
  const [data1] = useAxiosGet(urlContact, config, setIsError);

  useEffect(() => {
    setFavoriteContactList(data1);
  }, [data1, isError]);

  const ChangePostData = () => ({
    favoriteAccountNumber: Number(addFavoriteContact),
  });

  const postFavorite = (data) => {
    axios.post(api('favoritecontact'), data, config)
      .then((response) => response.data)
      .then((response) => {
        if (response.statusCode !== 400) {
          window.location.reload();
        }
      });
  };
  const PostSubmitHandler = (event) => {
    changeAddFavoriteContact(event);
    postFavorite(ChangePostData());
  };
  return (
    <div className="container">
      <div className="container previous-transaction-cont">
        <div className="card card-prev">
          <div className="card-body prev-body">
            <div className="card-title title-prev">
              <h1 className="prev-title">Previous transactions</h1>
              <div className="prev-entries">
                {filtered?.map((contact) => (
                  <div className="contact-entry" key={Math.random()}>
                    <h1 className="contact-name">{contact.name}</h1>
                    <h1 className="contact-number">
                      Account Number: &nbsp;
                      {contact?.accountNumber}
                    </h1>
                    <div className="container favorite-cont">
                      <button className="add-favorite" value={contact?.accountNumber} type="button" onClick={PostSubmitHandler}>Favorite</button>
                      {favoriteContactList?.map((fave) => (
                        <div key={Math.random()} className="star-cont">
                          {fave?.favoriteAccountNumber === contact.accountNumber
                        && fave?.favorite === true ? (
                          <div>
                            <FontAwesomeIcon className="star" icon={faStar} />
                          </div>
                            ) : (
                              <div />
                            )}
                        </div>
                      ))}
                    </div>
                  </div>

                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>

  );
}
