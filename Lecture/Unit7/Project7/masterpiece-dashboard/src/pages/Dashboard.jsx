import { useState, useMemo } from "react";
import { Bar, Pie } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, ArcElement, Tooltip, Legend } from "chart.js";
// const ACCESS_TOKEN = import.meta.env.ACCESS_TOKEN;
import { Link } from "react-router-dom";

ChartJS.register(BarElement, CategoryScale, LinearScale, ArcElement, Tooltip, Legend);

const Dashboard = ({objectsOnDisplay, filteredObjects, setFilteredObjects}) => {
    // const [objectsOnDisplay, setObjectsOnDisplay] = useState([]);
    const [yearRange, setYearRange] = useState([1800, 2025]);
    const [searchInput, setSearchInput] = useState("");
    // const [filteredObjects, setFilteredObjects] = useState([]);

    // useEffect(() => {
    //     const fetchObjectsOnDisplay = async () => {
    //         console.log(ACCESS_TOKEN);
    //         const response = await fetch(`https://api.collection.cooperhewitt.org/rest/?method=cooperhewitt.objects.getOnDisplay&access_token=${ACCESS_TOKEN}`);
    //         let data = await response.json();
    //         // console.log(data.objects);
    //         data = Object.values(data.objects).slice(0, 20)

    //         const objectsWithImages = await Promise.all(
    //             data.map(async (object) => {
    //                 const imageResponse = await fetch(
    //                     `https://api.collection.cooperhewitt.org/rest/?method=cooperhewitt.objects.getImages&access_token=${ACCESS_TOKEN}&object_id=${object.id}`
    //                 );
    //                 const imageData = await imageResponse.json();
    //                 console.log(Object.values(Object.values(imageData.images)[0])[0]?.url);
    //                 return {
    //                     ...object,
    //                     image: Object.values(Object.values(imageData.images)[0])[0]?.url,
    //                 };
    //             })
    //         );
    //         // console.log(objectsWithImages);
    //         setObjectsOnDisplay(objectsWithImages);
    //         setFilteredObjects(objectsWithImages);
    //     };

    //     fetchObjectsOnDisplay().catch(console.error);
    // }
    // , []);

    const handleSearch = () => {
        const res = objectsOnDisplay.filter((object) => {
            const year = parseInt(object.year_start || object.year_end || "1800", 10);
            const matchesYear = year >= yearRange[0] && year <= yearRange[1];
            const matchesSearch = object.title_raw?.toLowerCase().includes(searchInput.toLowerCase());
            return matchesYear && matchesSearch;
        });
        setFilteredObjects(res);
    };

    // Chart Data: Distribution of Objects by Year
    const yearDistributionData = useMemo(() => {
        const yearCounts = {};
        objectsOnDisplay.forEach((object) => {
          const year = parseInt(object.year_start || object.year_end || "1800", 10);
          if (year >= 1800 && year <= 2025) {
            yearCounts[year] = (yearCounts[year] || 0) + 1;
          }
        });
        return {
          labels: Object.keys(yearCounts),
          datasets: [
            {
              label: "Objects by Year",
              data: Object.values(yearCounts),
              backgroundColor: "rgba(75, 192, 192, 0.6)",
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 1,
            },
          ],
        };
    }, [objectsOnDisplay]);
    
    // Chart Data: Distribution of Objects by Medium
    const mediumDistributionData = useMemo(() => {
        const mediumCounts = {};
        objectsOnDisplay.forEach((object) => {
        const medium = object.medium || "Unknown";
        mediumCounts[medium] = (mediumCounts[medium] || 0) + 1;
        });
        return {
        labels: Object.keys(mediumCounts),
        datasets: [
            {
            label: "Objects by Medium",
            data: Object.values(mediumCounts),
            backgroundColor: [
                "#FF6384",
                "#36A2EB",
                "#FFCE56",
                "#4BC0C0",
                "#9966FF",
                "#FF9F40",
            ],
            },
        ],
        };
    }, [objectsOnDisplay]);

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
                    <p style={{ fontSize: "24px", fontWeight: "bold" }}>{filteredObjects && filteredObjects.length}</p>
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
            {/* Charts Section */}
            <div className="charts-container" style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
                <div style={{ flex: 1 }}>
                <h3>Distribution of Objects by Year</h3>
                <Bar data={yearDistributionData} />
                </div>
                <div style={{ flex: 1 }}>
                <h3>Distribution of Objects by Medium</h3>
                <Pie data={mediumDistributionData} />
                </div>
            </div>
            
            {filteredObjects && filteredObjects.length > 0 ? (
                <ul className="object-list">
                    {filteredObjects.map((object) => (
                        <li key={object.id} className="object-item">
                            <Link to={`/object/${object.id}`} style={{ textDecoration: "none", color: "inherit" }}>
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
                            </Link>
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