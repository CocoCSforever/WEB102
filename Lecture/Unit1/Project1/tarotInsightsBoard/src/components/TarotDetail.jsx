import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

const TarotDetail = ( {card} ) => {
    console.log(card);
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/`);
    };
    
    return (
        <div className="tarot-detail">
            <button className="button" onClick={handleClick}>Back</button>
            {card ? (
                <>
                <h2>{card.name}</h2>
                <img src={card.image} alt={card.name} />
                <h3>Detailed Meaning</h3>
                <p>{card.detailedMeaning}</p>
                <h3>Use Cases</h3>
                <ul>
                    {card.useCases.map((useCase, index) => (
                    <li key={index}>{useCase}</li>
                    ))}
                </ul>
                </>
            ) : (
                <p>Card not found</p>
            )}
        </div>
    );
};

export default TarotDetail;