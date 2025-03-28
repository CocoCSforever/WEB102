const DogFinder = ({dog, onClick, banTags, banTag}) => {
    return (
        <div className="dog-finder">
            <h1>Trippin' on Dogs</h1>
            <p>Discover dogs from your wildest dreams</p>
            <p> </p>
            <p> </p>
            {dog.name && <div className="dog-container">
                <h2 className="dog-name">{dog.name}</h2>
                <div className="tag-container">
                    {dog.breed_group && <p className={`tag ${banTags.has(dog.breed_group) ? 'banned' : ''}`} onClick={() => banTag(dog.breed_group)}>Breed: {dog.breed_group}</p>}
                    {dog.breed_for && <p className={`tag ${banTags.has(dog.breed_for) ? 'banned' : ''}`} onClick={() => banTag(dog.breed_for)}>{dog.breed_for}</p>}
                    <p className={`tag ${banTags.has(dog.lifespan) ? 'banned' : ''}`} onClick={() => banTag(dog.lifespan)}>{dog.lifespan}</p>
                    <p className={`tag ${banTags.has(dog.weight) ? 'banned' : ''}`} onClick={() => banTag(dog.weight)}>{dog.weight}</p>
                    <p className={`tag ${banTags.has(dog.height) ? 'banned' : ''}`} onClick={() => banTag(dog.height)}>{dog.height}</p> 
                    {dog.temperament && <p className={`tag ${banTags.has(dog.temperament) ? 'banned' : ''}`} onClick={() => banTag(dog.temperament)}>{dog.temperament}</p>}
                    {dog.country_code && <p className={`tag ${banTags.has(dog.country_code) ? 'banned' : ''}`} onClick={() => banTag(dog.country_code)}>{dog.country_code}</p>}
                </div>
                <img className="image" src={dog.image} alt="Undefiened image" width="500" />
            </div>}
            <button className="button" onClick={onClick}>Find a new dog</button>
        </div>
    );
}
export default DogFinder;