import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <h1>Books</h1>
      <nav>
        <ul>
          <li>
            <NavLink to="/">Hem</NavLink>
          </li>
          <li>
            <NavLink to="/books">Böcker</NavLink>
          </li>
          <li>
            <NavLink to="/profile">Mina sidor</NavLink>
          </li>
          <li>
            <NavLink to="/login">Logga in</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
