import "./Header.css";
import logo from "../../images/Vector.svg";
import { Link, Route } from "react-router-dom";

function Header(props) {
  return (
    <header className="header">
      <img className="logo" src={logo} alt="Логотоп Место Россия" />
      <Route exact path="/">
        <div className="links">
          <p className="links__text">{props.email}</p>
          <p>
            <Link to="/sign-in" className="links__item" onClick={props.handleExit}>
              Выйти
            </Link>
          </p>
        </div>
      </Route>
      <Route path="/sign-up">
        <Link to="/sign-in" className="links__item">
          Войти
        </Link>
      </Route>
      <Route path="/sign-in">
        <Link to="/sign-up" className="links__item">
          Регистрация
        </Link>
      </Route>
    </header>
  );
}

export default Header;