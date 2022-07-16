import logo from "../images/logo.svg";

function Header() {
  return (
    <header className="Header">
      <img className="header__logo" src={logo} alt="around the u.s logo" />
    </header>
  );
}

export default Header;
