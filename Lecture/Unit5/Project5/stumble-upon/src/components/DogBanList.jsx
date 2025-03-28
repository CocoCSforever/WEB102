const DogBanList = ({ banTags, unbanTag }) => {
    return (
        <div>
            <h1>Dog Ban List</h1>
            <ul className="tag-container">
                {banTags && banTags.length > 0 ? banTags.map((tag, index) => (
                    <li key={index} className="tag" onClick={() => unbanTag(tag)}>
                        <p>{tag}</p>
                    </li>
                )) : (
                    <div>
                        <h3>Empty banList!</h3>
                    </div>
                )}
            </ul>
        </div>
    );
}
export default DogBanList;