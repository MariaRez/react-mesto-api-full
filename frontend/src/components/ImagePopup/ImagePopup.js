function ImagePopup(props) {
  return (
    <div
      className={
        `popup popup_place_image` +
        (Object.keys(props.card).length ? " popup_opened" : "")
      }
    >
      <div className="popup__image-container">
        <img
          className="popup__image"
          src={props.card.link}
          alt={props.card.name}
        />
        <h4 className="popup__text">{props.card.name}</h4>
        <button
          aria-label="Close"
          className="popup__close-button popup__close-button_place_image"
          type="button"
          onClick={props.onClose}
        ></button>
      </div>
    </div>
  );
}

export default ImagePopup;