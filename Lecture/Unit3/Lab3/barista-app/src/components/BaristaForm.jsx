import React, {Component, useState} from 'react';
import RecipeChoices from './RecipeChoices';
import drinksJson from './drinks.json';

const BaristaForm = () => {
    const [currentDrink, setCurrentDrink] = useState("")
    const [trueRecipe, setTrueRecipe] = useState({})
    const [correct_temp, setCorrectTemp] = useState('')
    const [correct_milk, setCorrectMilk] = useState('')
    const [correct_syrup, setCorrectSyrup] = useState('')
    const [correct_blended, setCorrectBlended] = useState('')

    const [inputs, setInputs] = useState({
        'temperature': '',
        'milk': '',
        'syrup': '',
        'blended': ''
    })

    const ingredients = {
        'temperature' : ['hot', 'lukewarm', 'cold'],
        'syrup': ['mocha', 'vanilla', 'toffee', 'maple', 'caramel', 'other', 'none'],
        'milk': ['cow', 'oat', 'goat', 'almond', 'none'],
        'blended': ['yes', 'turbo', 'no']
    }

    const onCheckAnswer = () => {
        if (!ingredients['temperature'].includes(inputs['temperature'])) {
            alert(`For temperature, ${inputs['temperature']} isn't even an option!`)
        }else if (trueRecipe.temp != inputs['temperature']){
            setCorrectTemp('wrong');
        }
        else {
            setCorrectTemp("correct");
        }

        if (!ingredients['milk'].includes(inputs['milk'])) {
            alert(`For milk, ${inputs['milk']} isn't even an option!`)
        }else if (trueRecipe.milk != inputs['milk']){
            setCorrectMilk('wrong');
        }
        else {
            setCorrectMilk("correct");
        }

        if (!ingredients['syrup'].includes(inputs['syrup'])) {
            alert(`For syrup, ${inputs['syrup']} isn't even an option!`)
        }else if (trueRecipe.syrup != inputs['syrup']){
            setCorrectSyrup('wrong');
        }
        else {
            setCorrectSyrup("correct");
        }
        
        if (!ingredients['blended'].includes(inputs['blended'])) {
            alert(`For blended, ${inputs['blended']} isn't even an option!`)
        }else if (trueRecipe.blended != inputs['blended']){
            setCorrectBlended('wrong');
        }
        else {
            setCorrectBlended("correct");
        }
    }
    
    const onNewDrink = () => {
        setInputs({
            'temperature': '',
            'milk': '',
            'syrup': '',
            'blended': ''
        })
        setCorrectTemp('');
        setCorrectMilk('');
        setCorrectSyrup('');
        setCorrectBlended('');
        getNextDrink()
    }

    const getNextDrink = () => {
        const randomDrink = drinksJson.drinks[Math.floor(Math.random() * drinksJson.drinks.length)]
        setCurrentDrink(randomDrink.name)
        setTrueRecipe(randomDrink.ingredients)
    }

    return (
        <div>
            <h2>Hi, I'd like to order a:</h2>
            <div className="drink-container">
                <h2 className='mini-header'>{currentDrink}</h2>
                <button type="new-drink-button" className='button newdrink' onClick={onNewDrink}>🔄</button>
            </div>
            <form className="container">
                <div className="mini-container">
                    <h3>Temperature</h3>
                    <div className="answer-space" id={correct_temp}>
                        {inputs["temperature"]} 
                    </div>
                    <RecipeChoices
                    handleChange={(e) => setInputs((prevState) => ({
                        ...prevState,
                        [e.target.name]: e.target.value,
                    }))}
                    label="temperature"
                    choices={ingredients["temperature"]}
                    checked={inputs["temperature"]}
                    />
                </div>

                <div className="mini-container">
                <h3>Milk</h3>
                <div className="answer-space" id={correct_milk}>
                    {inputs["milk"]} 
                </div>
                <RecipeChoices
                handleChange={(e) => setInputs((prevState) => ({
                    ...prevState,
                    [e.target.name]: e.target.value,
                }))}
                label="milk"
                choices={ingredients["milk"]}
                checked={inputs["milk"]}
                />
                </div>

                <div className="mini-container">
                <h3>Syrup</h3>
                <div className="answer-space" id={correct_syrup}>
                    {inputs["syrup"]} 
                </div>
                <RecipeChoices
                handleChange={(e) => setInputs((prevState) => ({
                    ...prevState,
                    [e.target.name]: e.target.value,
                }))}
                label="syrup"
                choices={ingredients["syrup"]}
                checked={inputs["syrup"]}
                />
                </div>

                <div className="mini-container">
                <h3>Blended</h3>
                <div className="answer-space" id={correct_blended}>
                    {inputs["blended"]} 
                </div>
                <RecipeChoices
                handleChange={(e) => setInputs((prevState) => ({
                    ...prevState,
                    [e.target.name]: e.target.value,
                }))}
                label="blended"
                choices={ingredients["blended"]}
                checked={inputs["blended"]}
                />
                </div>
            </form>
            <button type="submit" className='button submit' onClick={onCheckAnswer}>Check Answer</button>
        </div>
    )
}

export default BaristaForm;