import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Header = () => {
  const { user, logout } = useAuth();

  return (
    <header>
      <h1>Books</h1>
      <nav>
        <ul>
          <li>
            <NavLink to="/">Hem</NavLink>
          </li>
          <li>
            <NavLink to="/profile">Mina sidor</NavLink>
          </li>
          <li>
            {!user ? (
              <NavLink to="/login">
                <button className="login-btn">Logga in</button>
              </NavLink>
            ) : (
              <button onClick={logout} className="login-btn">
                Logga ut
              </button>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
