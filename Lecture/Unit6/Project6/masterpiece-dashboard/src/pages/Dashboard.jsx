import { useEffect, useState } from "react";
const ACCESS_TOKEN = import.meta.env.ACCESS_TOKEN;

const Dashboard = () => {
    const [objectsOnDisplay, setObjectsOnDisplay] = useState([]);
    const [yearRange, setYearRange] = useState([1800, 2025]);
    const [searchInput, setSearchInput] = useState("");
    const [filteredObjects, setFilteredObjects] = useState([]);

    useEffect(() => {
        const fetchObjectsOnDisplay = async () => {
            const response = await fetch(`https://api.collection.cooperhewitt.org/rest/?method=cooperhewitt.objects.getOnDisplay&access_token=${ACCESS_TOKEN}`);
            let data = await response.json();
            // console.log(data.objects);
            data = Object.values(data.objects).slice(0, 20)

            const objectsWithImages = await Promise.all(
                data.map(async (object) => {
                    const imageResponse = await fetch(
                        `https://api.collection.cooperhewitt.org/rest/?method=cooperhewitt.objects.getImages&access_token=${ACCESS_TOKEN}&object_id=${object.id}`
                    );
                    const imageData = await imageResponse.json();
                    console.log(Object.values(Object.values(imageData.images)[0])[0]?.url);
                    return {
                        ...object,
                        image: Object.values(Object.values(imageData.images)[0])[0]?.url,
                    };
                })
            );
            // console.log(objectsWithImages);
            setObjectsOnDisplay(objectsWithImages);
            setFilteredObjects(objectsWithImages);
        };

        fetchObjectsOnDisplay().catch(console.error);
    }
    , []);

    const handleSearch = () => {
        const res = objectsOnDisplay.filter((object) => {
            const year = parseInt(object.year_start || object.year_end || "1800", 10);
            const matchesYear = year >= yearRange[0] && year <= yearRange[1];
            const matchesSearch = object.title_raw?.toLowerCase().includes(searchInput.toLowerCase());
            return matchesYear && matchesSearch;
        });
        setFilteredObjects(res);
    };

    return (
        <div className="dashboard">
            <p>Welcome to the MasterPiece Dashboard!</p>
            <p>Use the navigation to explore different sections.</p>
            <div className="statistics-container" style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
                <div className="stat-block" style={{ flex: 1, padding: "20px", background: "#f0f0f0", borderRadius: "8px", textAlign: "center" }}>
                    <h3>Total Objects</h3>
                    <p style={{ fontSize: "24px", fontWeight: "bold" }}>{objectsOnDisplay.length}</p>
                </div>
                <div className="stat-block" style={{ flex: 1, padding: "20px", background: "#f0f0f0", borderRadius: "8px", textAlign: "center" }}>
                    <h3>Filtered Objects</h3>
                    <p style={{ fontSize: "24px", fontWeight: "bold" }}>{filteredObjects.length}</p>
                </div>
                <div className="stat-block" style={{ flex: 1, padding: "20px", background: "#f0f0f0", borderRadius: "8px", textAlign: "center" }}>
                    <h3>Year Range</h3>
                    <p style={{ fontSize: "24px", fontWeight: "bold" }}>{yearRange[0]} - {yearRange[1]}</p>
                </div>
            </div>

            <div className="search-bar" style={{ marginBottom: "20px", display: "flex", gap: "10px" }}>
                <input
                    type="text"
                    placeholder="Search by title..."
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    style={{ padding: "10px", borderRadius: "4px", border: "1px solid #ccc" }}
                />
                <input
                    type="range"
                    min="1500"
                    max="2025"
                    value={yearRange[1]}
                    onChange={(e) => setYearRange([yearRange[0], parseInt(e.target.value)])}
                />
                <button
                    onClick={handleSearch}
                    style={{ padding: "10px 20px", borderRadius: "4px", background: "#007bff", color: "white", border: "none", cursor: "pointer" }}
                >
                    Search
                </button>
            </div>

            {/* <div className="year-filter">
                <label>
                    Year Range: {yearRange[0]} - {yearRange[1]}
                </label>
                <input
                    type="range"
                    min="1500"
                    max="2025"
                    value={yearRange[1]}
                    onChange={(e) => setYearRange([yearRange[0], parseInt(e.target.value)])}
                />
            </div> */}
            
            {filteredObjects.length > 0 ? (
                <ul className="object-list">
                    {filteredObjects.map((object) => (
                        <li key={object.id} className="object-item">
                            <img
                                src={object.image}
                                alt={object.title_raw}
                                className="object-image"
                            />
                            <div className="object-info">
                                <h3 className="object-title">{object.title_raw}</h3>
                                {/* <p className="object-label">{object.label_text}</p> */}
                                <p className="object-medium">{object.medium}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Loading objects...</p>
            )}
        </div>
    );
}
export default Dashboard;