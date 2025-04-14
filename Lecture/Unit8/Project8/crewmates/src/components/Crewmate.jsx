import React from 'react';
import { Link } from 'react-router-dom';

const Crewmate = ({ crewmate }) => {
    return (
        <div className="crewmate-card" id ={crewmate.color}>
            <img src={crewmate.img_url} alt={`Crewmate ${crewmate.key + 1}`} />
            <h2>Name of Crewmate: <span>{crewmate.name}</span></h2>
            <h2>Speed of Crewmate: <span>{crewmate.speed} mph</span></h2>
            <h2>Color of Crewmate:  <span>{crewmate.color}</span></h2>
            <Link to={'/editcrewmate/'+ crewmate.id} className="button-link">Edit Crewmate</Link>
        </div>
    )
}
export default Crewmate;
