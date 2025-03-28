import { useState } from 'react'
import './App.css'
import DogHistory from './components/DogHistory';
import DogFinder from './components/DogFinder';
import DogBanList from './components/DogBanList';

function App() {
  const url_starter = `https://api.thedogapi.com/v1/images/search`;
  const api_key = "live_R681zZ7j6GVgUTp8p0GfeZFEYtKQ5gSho4cx21yAsKa2q3Glm35qrIwB8tdD2uvW"
  const [dogInfo, setDogInfo] = useState({
    name: "",
    breed_for: "",
    image: "",
    temperament: "",
    country: "",
    lifespan: "",
    weight: "",
    height: "",
  })
  const [dogHistory, setDogHistory] = useState([])
  const [banTags, setBanTags] = useState(new Set())


  const onClick = () => {
    const url = `${url_starter}?size=med&mime_types=jpg&format=json&has_breeds=true&order=RANDOM&page=0&limit=1`;
    fetch(url, {
      method: 'GET',
      headers: {
        'x-api-key': api_key
      }
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      data = data[0];
      const breed = data.breeds[0];
      const image = data.url;
      // setDogInfo({
      //   name: breed.name,
      //   breed_for: breed.bred_for,
      //   country: breed.country_code,
      //   image: image,
      //   lifespan: breed.life_span,
      //   temperament: breed.temperament,
      //   weight: breed.weight["imperial"],
      //   height: breed.height["imperial"],
      // })
      const newDog = {
        name: breed.name,
        breed_for: breed.bred_for,
        country: breed.country_code,
        image: image,
        lifespan: breed.life_span,
        temperament: breed.temperament,
        weight: breed.weight["imperial"] + " lbs",
        height: breed.height["imperial"] + " inches",
      };

      // Check if any of the dog's attributes are in the banned tags
      const attributes = Object.values(newDog);
      const isBanned = attributes.some(attr => banTags.has(attr));

      if (isBanned) {
        console.log(`Dog ${attributes} is banned, fetching a new one...`);
        onClick(); // Re-fetch until a valid dog is found
      } else {
        if (dogInfo.name !== "") {
          setDogHistory((prevState) => [...prevState, dogInfo])
        }
        setDogInfo(newDog); // Set the valid dog info
      }
    })
    .catch(error => console.error('Error:', error));
  }

  const banTag = (tag) => {
    setBanTags((prevState) => new Set(prevState).add(tag)); // Add the tag (automatically prevents duplicates)
    console.log(banTags);
  };
  
  const unbanTag = (tag) => {
    setBanTags((prevState) => {
      const updatedSet = new Set(prevState);
      updatedSet.delete(tag); // Remove the tag
      return updatedSet;
    });
    console.log(banTags);
  };

  return (
    <>
      <div className="container">
        <div className="section section-1">
          <DogHistory dogHistory={dogHistory} />
        </div>
        <div className="section section-2">
          <DogFinder dog={dogInfo} onClick={onClick} banTags={banTags} banTag={banTag} />
        </div>
        <div className="section section-3">
          {/* set doesn't have map() function */}
          <DogBanList banTags={[...banTags]} unbanTag={unbanTag} /> 
        </div>
      </div>
    </>
  )
}

export default App
