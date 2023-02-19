import question from "../assets/question.png";
import { Card } from "../types/Card";
import "./SingleCard.css";

type CardProps = {
  card: Card;
  handleChoice: (card: Card) => void;
  flipped: boolean;
  disabled: boolean;
};

const SingleCard = ({ card, handleChoice, flipped, disabled }: CardProps) => {
  const handleClick = () => {
    if (!disabled) {
      handleChoice(card);
    }
  };

  return (
    <div className="card">
      <div className={flipped ? "flipped" : ""}>
        <img className="front" src={card.src} alt="card front" />
        <img
          className="back"
          src={question}
          alt="card back"
          onClick={handleClick}
        />
      </div>
    </div>
  );
};

export default SingleCard;
