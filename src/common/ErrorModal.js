import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import '../css/Modal.css';
import { Link } from 'react-router-dom';

export default function ErrorModal(props) {
  const { showFailed, closeError, errorMessage } = props;

  if (!showFailed) {
    return null;
  }
  return (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-header">
          <div className="row">
            <div className="col-12 check-logo">
              <FontAwesomeIcon icon={faCircleXmark} />
            </div>
            <div className="col-12">
              <h4 className="modal-title modalTitleFailed">{errorMessage}</h4>
            </div>
          </div>
        </div>
        <div className="modal-body" />
        <div className="modal-footer">
          <Link to="/">
            <button className="modalButton" type="button" onClick={closeError}>Close</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
