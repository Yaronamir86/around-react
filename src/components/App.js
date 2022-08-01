import { useEffect, useState } from "react";
import Footer from "./Footer";
import Header from "./Header";
import Main from "./Main";
import PopupWithForm from "./PopupWithForm";
import PopupWithConfirmation from "./PopupWithConfirmation";
import ImagePopup from "./ImagePopup";
import EditProfileModal from "./EditProfileModal";
import api  from "../utils/api";
import { CurrentUserContext } from "../context/CurrentUserContext";

function App() {
  const [isEditProfileOpen, setEditProfileOpen] = useState(false);
  const [isAddPlaceOpen, setAddPlaceOpen] = useState(false);
  const [isEditAvatarOpen, setEditAvatarOpen] = useState(false);
  const [isPreviewImageOpen, setPreviewImageOpen] = useState(false);
  const [isDeletePopupOpen, setDeletePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({
    name: "",
    link: "",
  });
  const [cards, setCards] = useState([]);

  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    api.getUserInfo().then((user) => {
      setCurrentUser(user);
    });
  }, []);

  const handleEditProfileClick = () => {
    setEditProfileOpen(true);
  };
  const handleAddPlaceClick = () => {
    setAddPlaceOpen(true);
  };
  const handleEditAvatarClick = () => {
    setEditAvatarOpen(true);
  };
  const handleDeleteCardClick = (card) => {
    setDeletePopupOpen(true);
    setSelectedCard(card);
  };
  const handleCardClick = (card) => {
    setPreviewImageOpen(true);
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
    setPreviewImageOpen(false);
    setDeletePopupOpen(false);
  };

  const handleUpdateUser = ({ name, about }) => {
    api
      .editProfile({ name, about })
      .then((res) => {
        setCurrentUser(res);
        closeAllModals();
      })
      .catch(console.log);
  };

  function handleCardLike(card) {
    const isLiked = card.likes.some((user) => user._id === currentUser._id);
    api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
      setCards((state) =>
        state.map((currentCard) =>
          currentCard._id === card._id ? newCard : currentCard
        )
      );
    });
  }

  function handleCardDelete(e) {
    e.preventDefault();
    api
      .deleteCards(selectedCard._id)
      .then((res) => {
        console.log("is deleted");
        const newCards = cards.filter(
          (currentCard) => currentCard._id !== selectedCard._id
        );
        setCards(newCards);
        closeAllModals();
      })
      .catch(console.log);
  }

  useEffect(() => {
    api.getInitialCards().then((res) => {
      setCards(res);
    });
  }, []);

  return (
    <div className="App">
      <div className="page">
        <CurrentUserContext.Provider value={currentUser}>
          <Header />
          <Main
            onEditProfileClick={handleEditProfileClick}
            onAddPlaceClick={handleAddPlaceClick}
            onEditAvatarClick={handleEditAvatarClick}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            onCardDelete={handleDeleteCardClick}
            cards={cards}
          />
          <Footer />

          <EditProfileModal
            isOpen={isEditProfileOpen}
            onClose={closeAllModals}
            onUpdateUser={handleUpdateUser}
          />
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
          <PopupWithConfirmation
            title="are you sure?"
            name="delete"
            isOpen={isDeletePopupOpen}
            buttonText="yes"
            onClose={closeAllModals}
            onSubmit={handleCardDelete}
          ></PopupWithConfirmation>
          <ImagePopup
            card={selectedCard}
            isOpen={isPreviewImageOpen}
            onClose={closeAllModals}
          ></ImagePopup>
        </CurrentUserContext.Provider>
      </div>
    </div>
  );
}

export default App;
