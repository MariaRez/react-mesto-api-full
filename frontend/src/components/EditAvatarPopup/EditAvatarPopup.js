import React from "react";
import PopupWithForm from "../PopupWithForm/PopupWithForm";

function EditAvatarPopup(props) {
  const avatarRef = React.useRef("");

  React.useEffect(() => {
    avatarRef.current.value = "";
  }, [props.isOpen]);

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }
  return (
    <PopupWithForm
      name="avatar"
      title="Обновить аватар"
      buttonText="Сохранить"
      onClose={props.onClose}
      isOpen={props.isOpen}
      onSubmit={handleSubmit}
    >
      <input
        type="url"
        placeholder="Ссылка на картинку"
        className="popup__field popup__field_type_avatarlink form__input"
        name="avatar"
        id="avatar"
        required
        ref={avatarRef}
      />
      <span id="avatar-error" className="error form__input-error"></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;