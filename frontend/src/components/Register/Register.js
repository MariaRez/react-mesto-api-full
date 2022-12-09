import React from "react";
import "./Register.css";
import { Link } from "react-router-dom";

function Register({ handleRegister, title, buttonText }) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  function handleRegisterEmail(evt) {
    setEmail(evt.target.value);
  }

  function handleRegisterPassword(evt) {
    setPassword(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    handleRegister(email, password);
  }

  return (
    <div className="register">
      <h3 className="register__title">{title}</h3>
      <form
        name="register"
        className="form form_place_register"
        onSubmit={handleSubmit}
      >
        <input
          className="form__field"
          type="email"
          placeholder="Email"
          name="email"
          id="email"
          required
          minLength="2"
          maxLength="40"
          value={email}
          onChange={handleRegisterEmail}
        />
        <input
          className="form__field"
          type="password"
          placeholder="Пароль"
          name="password"
          id="password"
          required
          minLength="2"
          maxLength="40"
          value={password}
          onChange={handleRegisterPassword}
        />
        <button className="form__button" type="submit">
          {buttonText}
        </button>
      </form>
      <div className="register__signin">
        <p className="">Уже зарегистрированы?</p>
        <Link to="/sign-in" className="signin__link">
          Войти
        </Link>
      </div>
    </div>
  );
}

export default Register;