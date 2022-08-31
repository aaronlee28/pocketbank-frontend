import { Link } from 'react-router-dom';
import '../css/Home.css';

export default function Home() {
  return (
    <div className="container-button">
      <div className="pocketbank">
        <h1 className="hometext" href="/">PocketBank</h1>
      </div>
      <div className="buttons">
        <Link to="/register">
          <button className="registerbutton" type="button">Register</button>
        </Link>
        <Link to="/signin">
          <button className="signinbutton" type="button">Sign In</button>
        </Link>
      </div>
    </div>

  );
}
