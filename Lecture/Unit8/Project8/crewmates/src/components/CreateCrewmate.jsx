import React, { useState } from "react";
import { supabase } from '../client';

const CreateCrewmate = () => {
    const [name, setName] = useState("");
    const [speed, setSpeed] = useState("");
    const [color, setColor] = useState("");

    const createCrewmate = async (event) => {
        event.preventDefault();
        if (!name || !speed || isNaN(speed) ||!color) {
            alert("Please fill in all fields");
            return;
        }
        const {data, error} = await supabase
            .from('Crewmates')
            .insert([
                {name, speed, color, img_url: "/assets/3.png"}
            ])
            .select();
        if (error) {
            console.error("Error inserting data:", error);
        }
        console.log("Data inserted:", data);
        // setCrewmates((prev) => {
        //     return [...prev, newCrewmate];
        // });
        setName("");
        setSpeed("");
        setColor("");
        // window.location = "/";
    }

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     if (!name || !speed || !color) {
    //         alert("Please fill in all fields");
    //         return;
    //     }
    //     const newCrewmate = {
    //         name,
    //         speed,
    //         color,
    //         image: "/assets/3.png",
    //     };
    //     console.log(newCrewmate);
    //     setCrewmates((prev) => {
    //         return [...prev, newCrewmate];
    //     });
    //     setName("");
    //     setSpeed("");
    //     setColor("");
    // }

    return (
        <div className="create-crewmate">
        <h2>Create a New Crewmate</h2>
        <img src="/assets/1.png" alt="crewmate" />
        <form className="form-container">
            <div className="mini-container">
                <label htmlFor="name"><h2>Name:</h2></label>
                <input type="text" name="name" placeholder="Enter crewmate's name" value={name} onChange={(e)=>setName(e.target.value)}/>
            </div>
            <div className="mini-container">
                <label htmlFor="speed"><h2>Speed(mph):</h2></label>
                <input type="text" name="speed" placeholder="Enter speed in mph" value={speed} onChange={(e)=>setSpeed(parseFloat(e.target.value))}/>
            </div>
            <div className="mini-container">
                <label htmlFor="color"><h2>Color:</h2></label>
                <div>
                    {["Red", "Green", "Blue", "Purple", "Yellow", "Orange", "Pink", "Rainbow"].map((colorOption) => (
                        <label key={colorOption}>
                            <input
                                id={colorOption}
                                type="radio"
                                name="color" // Group all radio buttons under the same name
                                value={colorOption}
                                checked={color === colorOption}
                                onChange={(e) => setColor(e.target.value)}
                            />
                            {colorOption}
                        </label>
                    ))}
                </div>
            </div>
        </form>
        <button type="submit" onClick={createCrewmate}>Create Crewmate</button>
        </div>
    );
}
export default CreateCrewmate;