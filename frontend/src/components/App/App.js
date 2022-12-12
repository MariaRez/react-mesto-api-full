import React, { useState } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import { api } from "../../utils/Api";
import { auth } from "../../utils/auth";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import Header from "../Header/Header";
import Login from "../Login/Login";
import Register from "../Register/Register";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ImagePopup from "../ImagePopup/ImagePopup";
import PopupWithForm from "../PopupWithForm/PopupWithForm";
import EditProfilePopup from "../EditProfilePopup/EditProfilePopup";
import EditAvatarPopup from "../EditAvatarPopup/EditAvatarPopup";
import AddPlacePopup from "../AddPlacePopup/AddPlacePopup";
import InfoTooltip from "../InfoTooltip/InfoTooltip";

import success from "../../images/yes.svg";
import wrong from "../../images/no.svg";

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);

  const [isTooltipPopupOpen, setIsTooltipPopupOpen] = useState(false);
  const [imageForTooltipPopup, setImageForTooltipPopup] = useState("");
  const [textForTooltipPopup, setTextForTooltipPopup] = useState("");

  const history = useHistory();
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState("");

  const [selectedCard, setSelectedCard] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [currentUser, setCurrentUser] = useState({
    name: "",
    about: "",
    avatar: "",
  });

  React.useEffect(() => {
    if (loggedIn) { Promise.all([api.getInitialCards(), api.getUserInfo()])
      .then(([initialCards, userInfo]) => {
        setCards(initialCards.data);
        setCurrentUser(userInfo.data);
      })
      .catch((err) => {
        console.log(err);
      });
    }
  }, [loggedIn]);

  React.useEffect(() => {
    checkToken();
  }, []);

  function checkToken() {
    const token = localStorage.getItem("token");
    if (token) {
      auth
        .checkToken(token)
        .then((res) => {
          const { _id, email } = res.data;
          setLoggedIn(true);
          setEmail(email);
          history.push("/");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  function handleUpdateAvatar(avatar) {
    api
      .editAvatar(avatar)
      .then((userAvatar) => {
        setCurrentUser(userAvatar.data);
        setIsEditAvatarPopupOpen(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateUser(data) {
    api
      .editProfile(data)
      .then((userData) => {
        setCurrentUser(userData.data);
        setIsEditProfilePopupOpen(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleAddPlace(data) {
    api
      .addNewCard(data)
      .then((newCard) => {
        setCards([newCard.data, ...cards]);
        setIsAddPlacePopupOpen(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleEditAvatarClick() {
    console.log("Открыли попап для изменения аватара");
    setIsEditAvatarPopupOpen(true);
  }
  function handleEditProfileClick() {
    console.log("Открыли попап для изменения профиля");
    setIsEditProfilePopupOpen(true);
  }
  function handleAddPlaceClick() {
    console.log("Открыли попап для добавления новой карточки");
    setIsAddPlacePopupOpen(true);
  }
  function handleCardClick(card) {
    console.log("Открыли попап большой картинки");
    setSelectedCard(card);
  }
  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsTooltipPopupOpen(false);
    setSelectedCard({});
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    api
      .toggleLike(card._id, isLiked)
      .then((newCard) => {
        setCards((prevValue) => {
          return prevValue.map((c) => (c._id === card._id ? newCard : c));
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((prevValue) => prevValue.filter((c) => c._id !== card._id));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleLoginSubmit(email, password) {
    auth
      .authorize(email, password)
      .then((res) => {
        localStorage.setItem("token", res.token);
        setEmail(email);
        setLoggedIn(true);
        history.push("/");
      })
      .catch(() => {
        setImageForTooltipPopup(wrong);
        setTextForTooltipPopup("Что-то пошло не так! Попробуйте еще раз.");
        setIsTooltipPopupOpen(true);
      });
  }

  function handleRegisterSubmit(email, password) {
    auth
      .register(email, password)
      .then(() => {
        setIsTooltipPopupOpen(true);
        setImageForTooltipPopup(success);
        setTextForTooltipPopup("Вы успешно зарегистрировались!");
        setTimeout(() => {
          setIsTooltipPopupOpen(false);
          history.push("/sign-in");
        }, 1500);
      })
      .catch(() => {
        setImageForTooltipPopup(wrong);
        setTextForTooltipPopup("Что-то пошло не так! Попробуйте еще раз.");
        setIsTooltipPopupOpen(true);
      });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="body">
        <div className="page">
          <Header email={email} />
          <Switch>
            <Route path="/sign-in">
              <Login
                title="Вход"
                buttonText="Войти"
                handleLogin={handleLoginSubmit}
              />
            </Route>
            <Route path="/sign-up">
              <Register
                title="Регистация"
                buttonText="Зарегистироваться"
                handleRegister={handleRegisterSubmit}
              />
            </Route>
            <ProtectedRoute
              exact
              path="/"
              loggedIn={loggedIn}
              onEditAvatar={handleEditAvatarClick}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onCardClick={handleCardClick}
              cards={cards}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
              component={Main}
            />
          </Switch>
          <Footer />
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          />
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlace}
          />
          <PopupWithForm
            name="delete"
            title="Вы уверены?"
            buttonText="Да"
          ></PopupWithForm>
          <ImagePopup onClose={closeAllPopups} card={selectedCard} />
          <InfoTooltip
            isOpen={isTooltipPopupOpen}
            onClose={closeAllPopups}
            image={imageForTooltipPopup}
            text={textForTooltipPopup}
          />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;