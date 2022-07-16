import React, { useState, useEffect } from "react";

import editButton from "../images/Edit-Button.svg";
import addButton from "../images/Add-Button.svg";
import { api } from "../utils/api";
import Card from "./Card";

function Main(props) {
  const [userName, setUserName] = useState("");
  const [userDescription, setUserDescription] = useState("");
  const [userAvatar, setUserAvatar] = useState("");
  const [cards, setCards] = useState([]);

  useEffect(() => {
    api.getUserInfo().then((res) => {
      setUserName(res.name);
      setUserDescription(res.about);
      setUserAvatar(res.avatar);
    });
  }, []);

  useEffect(() => {
    api.getInitialCards().then((res) => {
      setCards(res);
    });
  }, []);

  return (
    <main className="Main">
      <section className="profile">
        <div
          className="profile__avatar-container"
          onClick={props.onEditAvatarClick}
        >
          <img
            className="profile__avatar"
            src={userAvatar}
            alt="user's profile "
          />
        </div>
        <div className="profile__info">
          <h1 className="profile__name">{userName}</h1>
          <button
            className="profile__edit-btn"
            type="button"
            aria-label="edit"
            onClick={props.onEditProfileClick}
          >
            <img
              className="profile__edit-img"
              src={editButton}
              alt="edit-btn "
            />
          </button>
          <p className="profile__about">{userDescription}</p>
        </div>

        <button className="profile__add-btn" type="button" aria-label="add">
          <img
            className="profile__add-img"
            src={addButton}
            alt="add-btn "
            onClick={props.onAddPlaceClick}
          />
        </button>
      </section>
      <section className="element">
        <ul className="element__list">
          {cards.map((card) => {
            return (
              <Card
                card={card}
                key={card._id}
                onCardClick={props.onCardClick}
              />
            );
          })}
        </ul>
      </section>
    </main>
  );
}

export default Main;
