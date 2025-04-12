import { useEffect, useState } from "react";
import { useParams, useNavigate} from "react-router-dom";
const ACCESS_TOKEN = import.meta.env.ACCESS_TOKEN;

const ObjectDetail = () => {
    const { id } = useParams(); // Get the object ID from the URL
    const navigate = useNavigate();
    const [objectDetail, setObjectDetail] = useState(null);

    useEffect(() => {
        const fetchObjectDetail = async () => {
            const response = await fetch(
                `https://api.collection.cooperhewitt.org/rest/?method=cooperhewitt.objects.getInfo&access_token=${ACCESS_TOKEN}&object_id=${id}`
            );
            const data = await response.json();
            setObjectDetail(data.object);
        };

        fetchObjectDetail().catch(console.error);
    }, [id]);

    if (!objectDetail) {
        return <p>Loading object details...</p>;
    }

    return (
        <div className="object-detail">
            <button
                onClick={() => navigate("/")} // Navigate back to the dashboard
                style={{
                    padding: "10px 20px",
                    marginBottom: "20px",
                    borderRadius: "4px",
                    background: "#007bff",
                    color: "white",
                    border: "none",
                    cursor: "pointer",
                }}
            >Back</button>
            <h2>{objectDetail.title_raw}</h2>
            <img
                src={objectDetail.images?.[0]?.b?.url || ""}
                alt={objectDetail.title_raw}
                className="object-image"
            />
            <p><strong>Medium:</strong> {objectDetail.medium}</p>
            <p><strong>Date:</strong> {objectDetail.date}</p>
            <p><strong>Description:</strong> {objectDetail.description}</p>
            <p><strong>Credit Line:</strong> {objectDetail.creditline}</p>
        </div>
    );
};

export default ObjectDetail;