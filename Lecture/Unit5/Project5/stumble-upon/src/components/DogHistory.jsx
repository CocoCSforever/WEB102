const DogHistory = ({dogHistory}) => {
    return (
        <div>
            <h1>Who have we seen so far</h1>
            <div className ="dog-historys">
                {dogHistory && dogHistory.length>0 ? dogHistory.map((dog, index) => (
                    <li className="dog-history-container" key={index}>
                        <p>{dog.breed_for}</p>
                        <img className="image" src={dog.image} alt="Undefiened image" width="500" />
                    </li>
                )):(
                    <div>
                        <h3>You haven't seen any dogs yet!</h3>
                    </div>
                )}
            </div>
        </div>
    );
}

export default DogHistory;