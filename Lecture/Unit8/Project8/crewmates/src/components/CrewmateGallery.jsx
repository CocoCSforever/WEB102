import React from 'react';
import Crewmate from './Crewmate';
import { useEffect, useState } from 'react';
import { supabase } from '../client.js';

const CrewmateGallery = () => {
    const [crewmates, setCrewmates] = useState([])
    useEffect(() => {
        const getCrewmates = async () => {
            const { data, error } = await supabase
                .from('Crewmates')
                .select('*')
                .order('created_at', { ascending: false });
            if (error) {
                console.error("Error fetching data:", error);
                return;
            }
            console.log("Data fetched:", data);
            setCrewmates(data);
        }
        getCrewmates();
    }, [])

    return (
        <div className="crewmate-gallery">
            {crewmates && crewmates.length > 0 ?
            crewmates.map((crewmate, index) => (
                <Crewmate key={index} crewmate={crewmate} />
            )):
            <h2>{'No Crewmates Yet 😞'}</h2>
            }
        </div>
    )
}
export default CrewmateGallery;