import { NavLink } from 'react-router-dom';
import './header.css';

export default function Header() {
  return (
    <header className="header">
      <NavLink className="link" to="/forms-uncontrolled">
        Forms uncontrolled
      </NavLink>
      <NavLink className="link" to="/">
        Home
      </NavLink>
      <NavLink className="link" to="/forms-controlled">
        Forms controlled
      </NavLink>
    </header>
  );
}
