import React from 'react';
import { useNavigate } from 'react-router-dom';

const TarotCard = ({ card }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/${card.id}`);
    };

    return (
        <div className="tarot-card" onClick={handleClick}>
            <img src={card.image} alt={card.name} />
            <div className="tarot-card-content">
                <h2 className="tarot-card-title">{card.name}</h2>
                <p className="tarot-card-description">{card.meaning}</p>
            </div>
        </div>
    );
};

export default TarotCard;