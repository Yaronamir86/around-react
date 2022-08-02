import { useEffect, useState } from "react";
import Footer from "./Footer";
import Header from "./Header";
import Main from "./Main";
/*import PopupWithForm from "./PopupWithForm";*/
import DeleteCardPopup from "./DeleteCardPopup";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import api from "../utils/api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
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
        setCurrentUser(res);
        closeAllModals();
      })
      .catch(console.log)
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleUpdateAvatar = (url) => {
    setIsLoading(true);
    api.editAvatar(url).then((res) => {
      setCurrentUser(res);
      closeAllModals();
    })
    .catch(console.log)
    .finally(() => {
      setIsLoading(false);
    });
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
        const newCards = cards.filter(
          (currentCard) => currentCard._id !== selectedCard._id
        );
        setCards(newCards);
        closeAllModals();
      })
      .catch(console.log)
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleAddPlace = (card) => {
    setIsLoading(true);
    api.createCards(card).then((card) => {
      setCards([card, ...cards]);
      closeAllModals();
    })
    .catch(console.log)
      .finally(() => {
        setIsLoading(false);
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
            onAddPlaceSubmit={handleAddPlace}
          />
        </CurrentUserContext.Provider>
      </div>
    </div>
  );
}

export default App;
