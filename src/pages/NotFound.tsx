import { Link } from "react-router-dom";
import "./NotFound.css";

const NotFound = () => {
  return (
    <div className="notfound-section">
      <p className="notfound-code">404</p>
      <h1>Page not found</h1>
      <p className="notfound-text">
        The page you're looking for doesn't exist or has moved.
      </p>
      <Link to="/" className="notfound-link">
        Back to home →
      </Link>
    </div>
  );
};

export default NotFound;
