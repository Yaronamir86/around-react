import { useState } from "react";
import "../App.css";
import Footer from "./Footer";
import Header from "./Header";
import Main from "./Main";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";

function App() {
  const [isEditProfileOpen, setEditProfileOpen] = useState(false);
  const [isAddPlaceOpen, setAddPlaceOpen] = useState(false);
  const [isEditAvatarOpen, setEditAvatarOpen] = useState(false);
  const [isPreviewImageOpen, setpreviewImageopen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({
    name: "",
    link: "",
  });

  const handleEditProfileClick = () => {
    setEditProfileOpen(true);
  };
  const handleAddPlaceClick = () => {
    setAddPlaceOpen(true);
  };
  const handleEditAvatarClick = () => {
    setEditAvatarOpen(true);
  };
  const handleCardClick = (card) => {
    setpreviewImageopen(true);
    setSelectedCard({
      name: card.name,
      link: card.link,
    });
  };

  const closeAllModals = () => {
    setEditProfileOpen(false);
    setAddPlaceOpen(false);
    setEditAvatarOpen(false);
    setSelectedCard(false);
    setpreviewImageopen(false);
  };

  return (
    <div className="App">
      <div className="page">
        <Header />
        <Main
          onEditProfileClick={handleEditProfileClick}
          onAddPlaceClick={handleAddPlaceClick}
          onEditAvatarClick={handleEditAvatarClick}
          onCardClick={handleCardClick}
        />
        <Footer />

        <PopupWithForm
          title="Edit-profile"
          name="edit-profile"
          isOpen={isEditProfileOpen}
          buttonText="save"
          onClose={closeAllModals}
        >
          <fieldset className="form__fieldset form__fieldset_type_profile">
            <input
              id="name-input"
              type="text"
              name="user"
              placeholder="name"
              className="form__input form__input_type_name"
              minLength="2"
              maxLength="40"
              required
            />
            <span className="form__input-error name-input-error"></span>
            <input
              id="about-me-input"
              type="text"
              name="about"
              placeholder="about me"
              className="form__input form__input_type_about-me"
              minLength="2"
              maxLength="200"
              required
            />
            <span className="form__input-error about-me-input-error"></span>
          </fieldset>
        </PopupWithForm>
        <PopupWithForm
          title="New place"
          name="place"
          isOpen={isAddPlaceOpen}
          buttonText="save"
          onClose={closeAllModals}
        >
          <fieldset className="form__fieldset form__fieldset_type_place">
            <input
              id="title-input"
              type="text"
              name="Title"
              placeholder="Title"
              className="form__input form__input_type_title"
              minLength="1"
              maxLength="30"
              required
            />
            <span className="form__input-error title-input-error"></span>
            <input
              id="url-input"
              type="url"
              name="Image link"
              placeholder="Image link"
              className="form__input form__input_type_image-link"
              required
            />
            <span className="form__input-error url-input-error"></span>
          </fieldset>
        </PopupWithForm>
        <PopupWithForm
          title="Change profile picture"
          name="avatar"
          isOpen={isEditAvatarOpen}
          buttonText="save"
          onClose={closeAllModals}
        >
          <fieldset className="form__fieldset form__fieldset_type_avatar">
            <input
              id="avatar-input"
              type="url"
              name="Image link"
              placeholder="Image link"
              className="form__input form__input_type_image-link"
              required
            />
            <span className="form__input-error avatar-input-error"></span>
          </fieldset>
        </PopupWithForm>
        <ImagePopup
          card={selectedCard}
          isOpen={isPreviewImageOpen}
          onClose={closeAllModals}
        ></ImagePopup>
      </div>
    </div>
  );
}

export default App;
