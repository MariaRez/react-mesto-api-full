function PopupWithForm({isOpen, onClose, name, title, buttonText, children, onSubmit}) {
  return (
    <div
      className={
        `popup popup_place_${name}` + (isOpen && " popup_opened")
      }
    >
      <div className="popup__container">
        <h3 className="popup__title">{title}</h3>
        <form name={`form_${name}}`} className="form" onSubmit={onSubmit}>
          {children}
          <button
            className="popup__button"
            type="submit"
          >
            {buttonText}
          </button>
          <button
            onClick={onClose}
            aria-label="Close"
            className="popup__close-button"
            type="button"
          ></button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;