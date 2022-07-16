import trashIcon from "../images/Trash.svg";
import likeSign from "../images/like-sign.svg";

function Card(props) {
  function handleClick() {
    props.onCardClick(props.card);
  }
  return (
    <li className="element__list-item">
      <button
        className="element__trash-btn"
        type="button"
        aria-label="trash"
        onClick={props.on}
      >
        <img className="element__trash-icon" src={trashIcon} alt="trash-icon" />
      </button>
      <img
        className="element__photo"
        src={props.card.link}
        alt={`a great place in ${props.card.name}`}
        onClick={handleClick}
      />
      <div className="element__caption">
        <h2 className="element__title">{props.card.name}</h2>
        <div className="element__like-container">
          <button className="element__like-btn" type="button" aria-label="like">
            <img
              className="element__like-sign"
              src={likeSign}
              alt="like sign"
            />
          </button>
          <span className="element__like-count"></span>
        </div>
      </div>
    </li>
  );
}

export default Card;
