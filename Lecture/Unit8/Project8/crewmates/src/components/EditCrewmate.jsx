import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "../client.js";

const EditCrewmate = () => {
    const prams = useParams();
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [speed, setSpeed] = useState("");
    const [color, setColor] = useState("");
    const [crewmate, setCrewmate] = useState({});

    useEffect(() => {
        const getCrewmate = async () => {
            const {data, error} = await supabase
                .from('Crewmates')
                .select('*')
                .eq('id', prams.id);
            if (error) {
                console.error("Error fetching data:", error);
                return;
            }
            console.log("Data fetched:", data);
            setCrewmate((prev) => {
                return {...prev, ...data[0]};
            });
        }
        getCrewmate();
    }, [prams.id]);

    const updateCrewmate = async (event) => {
        event.preventDefault();
        if (!name || !speed || isNaN(speed) ||!color) {
            alert("Please fill in all fields");
            return;
        }
        const {data, error} = await supabase
            .from('Crewmates')
            .update([
                {name, speed, color, img_url: "/assets/3.png"}
            ])
            .eq('id', crewmate.id);
        if (error) {
            console.error("Error updating data:", error);
            return;
        }
        console.log("Data updated:", data);
        setCrewmate((prev) => {
            return {...prev, name, speed, color};
        });
        setName("");
        setSpeed("");
        setColor("");
        // window.location = "/";
    }

    const deleteCrewmate = async (e) => {
        e.preventDefault();
        const {data, error} = await supabase
            .from('Crewmates')
            .delete()
            .eq('id', crewmate.id);
        if (error) {
            console.error("Error deleting data:", error);
            return;
        }
        console.log("Data deleted:", data);
        navigate("/crewmategallery")
    }

    return (
        <div className="create-crewmate">
            <h1>Update Your Crewmate</h1>
            <img src="/assets/3.png" alt="crewmate" />
            <h2>Current Crewmate Info:</h2>
            <h3>Name: {crewmate.name}, Speed: {crewmate.speed}, Color: {crewmate.color}</h3>
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
            <button type="submit" onClick={updateCrewmate}>Update Crewmate</button>
            <button type="submit" onClick={deleteCrewmate}>Delete Crewmate</button>
        </div>
    );
}
export default EditCrewmate;