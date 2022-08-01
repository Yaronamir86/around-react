import { useEffect, useState } from "react";
import Footer from "./Footer";
import Header from "./Header";
import Main from "./Main";
/*import PopupWithForm from "./PopupWithForm";*/
import DeleteCardPopup from "./DeleteCardPopup";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import api from "../utils/api";
import { CurrentUserContext } from "../context/CurrentUserContext";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";

function App() {
  /*----------setting all pop ups to be close----------*/
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

  const [isLoading, setIsLoading] = useState(false);

  /*-----OPEN/CLOSE--HANDLERS-----------------*/
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

  /*------------SETTING INFO USING API-------------*/

  useEffect(() => {
    api.getUserInfo().then((user) => {
      setCurrentUser(user);
    })
    .catch(console.log);
  }, []);

  useEffect(() => {
    api.getInitialCards().then((res) => {
      setCards(res);
    })
    .catch(console.log);
  }, []);

  /*--------------------API-EDIT-HANDLERS----------------------*/

  const handleUpdateUser = ({ name, about }) => {
    setIsLoading(true);
    api
      .editProfile({ name, about })
      .then((res) => {
        setIsLoading(false);
        setCurrentUser(res);
        closeAllModals();
      })
      .catch(console.log);
  };

  const handleUpdateAvatar = (url) => {
    api.editAvatar(url).then((res) => {
      setCurrentUser(res);
      closeAllModals();
    })
    .catch(console.log);
  };

  const handleCardLike = (card) => {
    const isLiked = card.likes.some((user) => user._id === currentUser._id);
    api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
      setCards((state) =>
        state.map((currentCard) =>
          currentCard._id === card._id ? newCard : currentCard
        )
      );
    })
    .catch(console.log);
  };

  const handleCardDelete = (e) => {
    e.preventDefault();
    setIsLoading(true);
    api
      .deleteCards(selectedCard._id)
      .then((res) => {
        setIsLoading(false);
        const newCards = cards.filter(
          (currentCard) => currentCard._id !== selectedCard._id
        );
        setCards(newCards);
        closeAllModals();
      })
      .catch(console.log);
  };

  const handleAddPlaceSubmit = (card) => {
    setIsLoading(true);
    api.createCards(card).then((card) => {
      setIsLoading(false);
      setCards([card, ...cards]);
      closeAllModals();
    });
  };

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

          <ImagePopup
            card={selectedCard}
            isOpen={isPreviewImageOpen}
            onClose={closeAllModals}
          />
          <EditProfilePopup
            isLoading={isLoading}
            isOpen={isEditProfileOpen}
            onClose={closeAllModals}
            onUpdateUser={handleUpdateUser}
          />
          <EditAvatarPopup
            isLoading={isLoading}
            isOpen={isEditAvatarOpen}
            onUpdateAvatar={handleUpdateAvatar}
            onClose={closeAllModals}
          />
          <DeleteCardPopup
            isOpen={isDeletePopupOpen}
            isLoading={isLoading}
            onClose={closeAllModals}
            onSubmit={handleCardDelete}
          />
          <AddPlacePopup
            isOpen={isAddPlaceOpen}
            onClose={closeAllModals}
            onAddPlaceSubmit={handleAddPlaceSubmit}
          />
        </CurrentUserContext.Provider>
      </div>
    </div>
  );
}

export default App;
