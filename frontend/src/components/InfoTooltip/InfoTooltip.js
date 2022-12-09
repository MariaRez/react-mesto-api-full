import React from "react";
import "./InfoTooltip.css";

function InfoTooltip({ isOpen, onClose, image, text }) {
  return (
    <div className={`popup` + (isOpen ? " popup_opened" : "")}>
      <div className="popup__status-container">
        <img className="popup__status-image" src={image} alt={text} />
        <h3 className="popup__status-title">{text}</h3>
        <button
          aria-label="Close"
          className="popup__close-button popup__close-button_place_image"
          type="button"
          onClick={onClose}
        ></button>
      </div>
    </div>
  );
}

export default InfoTooltip;