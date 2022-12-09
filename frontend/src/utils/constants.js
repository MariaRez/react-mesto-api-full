export const validationSettings = {
  formElement: ".form",
  inputElement: ".popup__field",
  buttonElement: ".popup__button",
  buttonElementDisabled: "popup__button_disabled",
  inputErrorClass: ".popup__field_type_error",
  errorElementActive: "error_active",
};

export const popupAvatarButtonEdit = document.querySelector(".profile__avatar");
export const popupProfileButtonEdit = document.querySelector(
  ".profile__edit-button"
);
export const popupCardButtonAdd = document.querySelector(
  ".profile__add-button"
);

export const formProfile = document.querySelector(".form_place_profile");
export const formCard = document.querySelector(".form_place_card");
export const formAvatar = document.querySelector(".form_place_avatar");
export const profileNewAvatar = document.querySelector(
  ".popup__field_type_avatarlink"
);
export const profileNewName = document.querySelector(".popup__field_type_name");
export const profileNewDescription = document.querySelector(
  ".popup__field_type_description"
);