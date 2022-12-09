import React from "react";
import PopupWithForm from "../PopupWithForm/PopupWithForm";

function AddPlacePopup(props) {
  const [name, setName] = React.useState("");
  const [link, setLink] = React.useState("");

  function handleAddName(evt) {
    setName(evt.target.value);
  }

  function handleAddLink(evt) {
    setLink(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onAddPlace({
      name: name,
      link: link,
    });
  }

  React.useEffect(() => {
    setName("");
    setLink("");
  }, [props.isOpen]);

  return (
    <PopupWithForm
      name="card"
      title="Новое место"
      buttonText="Создать"
      onClose={props.onClose}
      isOpen={props.isOpen}
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        placeholder="Название"
        className="popup__field popup__field_type_placename form__input"
        name="name"
        id="name-card"
        required
        minLength="2"
        maxLength="30"
        value={name}
        onChange={handleAddName}
      />
      <span id="name-card-error" className="error form__input-error"></span>
      <input
        type="url"
        placeholder="Ссылка на картинку"
        className="popup__field popup__field_type_placelink form__input"
        name="link"
        id="link"
        required
        value={link}
        onChange={handleAddLink}
      />
      <span id="link-error" className="error form__input-error"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;