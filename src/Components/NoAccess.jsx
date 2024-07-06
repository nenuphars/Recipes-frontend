import { Link } from "react-router-dom";
import "./NoAccess.css";

function NoAccess() {
  return (
    <div className="base-wrapper">
      <div id="no-access-wrapper">
        <h2>You need to be logged in to view this page</h2>
        <p>
          Click <Link to="/login">here</Link> to go to the login page
        </p>
        <p>
          Don&apos;t have an account yet? Sign up <Link to="/signup">here</Link>
        </p>
      </div>
    </div>
  );
}

export default NoAccess;
