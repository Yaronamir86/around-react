import React from "react";
import { useRef } from "react";
import PopupWithForm from "./PopupWithForm";

const EditAvatarPopup = ({ isOpen, onClose, onUpdateAvatar, isLoading }) => {
  const url = useRef();

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar(url.current.value);
  }

  return (
    <PopupWithForm
      title="Change profile picture"
      name="avatar"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText={`${isLoading ? "Saving..." : "Save"}`}
    >
      <fieldset className="form__fieldset form__fieldset_type_avatar">
        <input
          id="avatar-input"
          type="url"
          name="Image link"
          placeholder="Image link"
          className="form__input form__input_type_image-link"
          required
          ref={url}
        />
        <span className="form__input-error avatar-input-error"></span>
      </fieldset>
    </PopupWithForm>
  );
};

export default EditAvatarPopup;
