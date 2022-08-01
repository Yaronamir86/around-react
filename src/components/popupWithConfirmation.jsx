import closeButton from "../images/Close-Icon.svg";

const PopupWithConfirmation = (props) => {
  return (
    <div
      className={`modal modal_type_${props.name} ${
        props.isOpen ? "modal_opened" : ""
      }`}
    >
      <div className="modal__container">
        <button
          className="modal__close-btn"
          type="button"
          aria-label="close"
          onClick={props.onClose}
        >
          <img
            className="modal__close-icon modal__close-icon_type_delete"
            src={closeButton}
            alt="closing tag"
          />
        </button>
        <div className="modal__content">
          <p className="modal__question">{props.title}</p>
          <form className="form form_type_delete" name={props.name} noValidate>
            <button
              className="modal__button modal__button_type_delete"
              type="submit"
              onSubmit={props.onSubmit}
            >
             {props.buttonText}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default PopupWithConfirmation;
