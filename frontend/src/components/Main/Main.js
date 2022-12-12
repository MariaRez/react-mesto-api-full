import React from "react";
import "./Main.css";
import Card from "../Card/Card";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main>
      <section className="profile">
        <div className="profile__avatar" onClick={props.onEditAvatar}>
          <img
            className="profile__avatar-image"
            src={currentUser.avatar}
            alt="Аватарка"
          />
        </div>
        <div className="profile__profile-info">
          <div className="profile__name-button">
            <h1 className="profile__name">{currentUser.name}</h1>
            <button
              onClick={props.onEditProfile}
              aria-label="Edit Profile"
              className="profile__edit-button"
              type="button"
            ></button>
          </div>
          <p className="profile__description">{currentUser.about}</p>
        </div>
        <button
          onClick={props.onAddPlace}
          aria-label="Add card"
          className="profile__add-button"
          type="button"
        ></button>
      </section>
      <section className="elements">
        {Array.isArray(props.cards)
          ? props.cards.map((element) => {
              return (<Card
                card={element}
                onCardClick={props.onCardClick}
                onCardLike={props.onCardLike}
                onCardDelete={props.onCardDelete}
                key={element._id}
              />
              )
            })
          : null}
      </section>
    </main>
  );
}

export default Main;
