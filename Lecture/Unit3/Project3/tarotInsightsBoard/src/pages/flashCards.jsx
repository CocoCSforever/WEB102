import React from 'react';
import { useState } from 'react';

const FlashCards = ({ tarotCards }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [currentCard, setCurrentCard] = useState(tarotCards[currentIndex]);
    const [userGuess, setUserGuess] = useState('');
    
    const prevCard = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
            setCurrentCard(tarotCards[currentIndex]);
        }
    }

    const nextCard = () => {
        setCurrentIndex(currentIndex + 1);
        setCurrentCard(tarotCards[currentIndex]);
    }

    const shuffleCards = () => {
        const shuffledCards = tarotCards.sort(() => Math.random() - 0.5);
        setCurrentIndex(0);
        setCurrentCard(shuffledCards[currentIndex]);
    }

    const submitGuess = () => {
        if (currentCard.name.toLowerCase() == userGuess.toLowerCase()) {
            alert('Correct!');
        } else {
            alert(`Incorrect! The correct answer was ${currentCard.name}.`);
        }
    }

    return (
        <div className="flash-cards">
            <h2>Number of cards: {tarotCards.length}</h2>
            <div className="flash-card-buttons">
                <button className="button" onClick={shuffleCards}>Shuffle Cards</button>
                {currentIndex>0 ? <button className="button" onClick={prevCard}>Prev Card</button> : null}
                <button className="button" onClick={nextCard}>Next Card</button>
            </div>
            <div className="flip-card">
                <div className="flip-card-inner">
                    <div className="flip-card-front">
                        <img src={currentCard.image} alt={currentCard.name} />
                        {/* <div className="tarot-card-content">
                            <h2 className="tarot-card-title">{currentCard.name}</h2>
                        </div> */}
                    </div>
                    <div className={`flip-card-back ${currentCard.difficulty.toLowerCase()}`}>
                        <h2>{currentCard.name}</h2>
                        <h3>Detailed Meaning</h3>
                        <p>{currentCard.detailedMeaning}</p>
                        <h3>Use Cases</h3>
                        <ul>
                            {currentCard.useCases.map((useCase, index) => (
                            <li key={index}>{useCase}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
            <p>Guess the answer here: </p>
            <input 
                type="text" 
                placeholder="Enter your answer here" 
                className="textbox"
                value={userGuess}
                onChange={(e) => setUserGuess(e.target.value)} 
            />
            <button className="button" onClick={submitGuess}>Submit Guess</button>
        </div>
    );
};

export default FlashCards;