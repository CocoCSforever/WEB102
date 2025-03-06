import React from 'react';
import { useState } from 'react';

const FlashCards = ({ tarotCards }) => {
    const [currentCard, setCurrentCard] = useState(tarotCards[0]);
    const [history, setHistory] = useState([]);
    
    const prevCard = () => {
        if (history.length > 0) {
            const newHistory = [...history];
            setCurrentCard(newHistory.pop());
            setHistory(newHistory);
        }
    }

    const nextCard = () => {
        const randomIndex = Math.floor(Math.random() * tarotCards.length);
        setHistory([...history, currentCard]);
        setCurrentCard(tarotCards[randomIndex]);
    }

    return (
        <div className="flash-cards">
            <h2>Number of cards: {tarotCards.length}</h2>
            <div className="flash-card-buttons">
                {history.length? <button className="button" onClick={prevCard}>Prev Card</button> : null}
                <button className="button" onClick={nextCard}>Next Card</button>
            </div>
            <div className="flip-card">
                <div className="flip-card-inner">
                    <div className="flip-card-front">
                        <img src={currentCard.image} alt={currentCard.name} />
                        <div className="tarot-card-content">
                            <h2 className="tarot-card-title">{currentCard.name}</h2>
                        </div>
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
        </div>
    );
};

export default FlashCards;