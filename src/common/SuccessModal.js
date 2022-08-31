import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import '../css/Modal.css';
import { Link } from 'react-router-dom';

export default function SuccessModal(props) {
  const {
    showSuccess,
    onClose,
  } = props;

  if (!showSuccess) {
    return null;
  }
  return (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-header">
          <div className="row">
            <div className="col-12 check-logo">
              <FontAwesomeIcon icon={faCircleCheck} />
            </div>
            <div className="col-12">
              <h4 className="modal-title">Successful</h4>
            </div>
          </div>
        </div>
        <div className="modal-body" />
        <div className="modal-footer">
          <Link to="/">
            <button className="modalButtonSuccess" type="button" onClick={onClose}>Close</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
