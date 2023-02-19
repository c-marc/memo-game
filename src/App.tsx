import { useEffect, useState } from "react";
import "./App.css";
import antelope from "./assets/antelope.png";
import cow from "./assets/cow.png";
import fox from "./assets/fox.png";
import hedgehog from "./assets/hedgehog.png";
import horse from "./assets/horse.png";
import pig from "./assets/pig.png";
import question from "./assets/question.png";
import SingleCard from "./components/SingleCard";
import { Card } from "./types/Card";

const cardImages = [
  { src: antelope },
  { src: cow },
  { src: fox },
  { src: hedgehog },
  { src: horse },
  { src: pig },
];

function App() {
  const [cards, setCards] = useState<Array<Card>>([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState<Card | null>(null);
  const [choiceTwo, setChoiceTwo] = useState<Card | null>(null);
  const [disabled, setDisabled] = useState(false);

  // shuffle
  const shuffleCards = () => {
    const shuffleCards = [...cardImages, ...cardImages]
      // shuffle
      .sort(() => Math.random() - 0.5)
      // increment id and default match
      .map((card, i) => ({ ...card, id: i, matched: false }));

    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffleCards);
    setTurns(0);
  };

  // handle a choice
  const handleChoice = (card: Card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  // compare 2 selected cards
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);

      if (choiceOne.src === choiceTwo.src) {
        setCards((prevCards) => {
          return prevCards.map((card) => {
            return card.src === choiceOne.src
              ? { ...card, matched: true }
              : card;
          });
        });
        resetTurn();
      } else {
        setTimeout(() => resetTurn(), 1000);
      }
    }
  }, [choiceOne, choiceTwo]);

  // resetTurn
  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prevTurns) => prevTurns + 1);
    setDisabled(false);
  };

  // start a new game automatically
  useEffect(() => {
    shuffleCards();
  }, []);

  // restart hack: flip back before shuffling
  const restart = () => {
    setCards([...cards].map((card) => ({ ...card, matched: false })));
    setTimeout(() => shuffleCards(), 500);
  };

  return (
    <div className="App">
      <h1>Memory Game</h1>

      <main>
        <button onClick={restart}>New Game</button>

        <div className="card-grid">
          {cards.map((card) => (
            <SingleCard
              key={card.id}
              card={card}
              handleChoice={handleChoice}
              flipped={card === choiceOne || card == choiceTwo || card.matched}
              disabled={disabled}
            />
          ))}
        </div>

        <p>Turns: {turns}</p>
      </main>
    </div>
  );
}

export default App;
