import React from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import PopupWithForm from "../PopupWithForm/PopupWithForm";

function EditProfilePopup(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen]);

  function handleNameEdit(evt) {
    setName(evt.target.value);
  }

  function handleDescriptionEdit(evt) {
    setDescription(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onUpdateUser({
      name: name,
      about: description,
    });
  }
  return (
    <PopupWithForm
      name="profile"
      title="Редактировать профиль"
      buttonText="Сохранить"
      onClose={props.onClose}
      isOpen={props.isOpen}
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        placeholder="Имя"
        className="popup__field popup__field_type_name form__input"
        name="name"
        id="name"
        required
        minLength="2"
        maxLength="40"
        value={name}
        onChange={handleNameEdit}
      />
      <span id="name-error" className="error form__input-error"></span>
      <input
        type="text"
        placeholder="О себе"
        className="popup__field popup__field_type_description form__input"
        name="about"
        id="about"
        required
        minLength="2"
        maxLength="200"
        value={description}
        onChange={handleDescriptionEdit}
      />
      <span id="about-error" className="error form__input-error"></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;