import React, { Component, useEffect, useState } from "react";

const RecipeChoices = ({handleChange, label, choices, currentVal, checked }) => {
    return (
      <div className="radio-buttons">
        <input
            type="text"
            name={label}
            value={currentVal}
            placeholder="Guess the ingredient..."
            onChange={handleChange}
            className = "textbox"
        />
        {choices && choices.map((choice) => (
            <li key={choice}>
                {/* <input type="radio" id={choice} name={label} value={choice} onChange={handleChange} checked={checked === choice}/> */}
                {choice}
            </li>
        ))}
      </div>
    );
};

export default RecipeChoices;