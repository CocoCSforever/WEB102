import React, { useEffect, useState } from 'react';

const CryptoScam = () => {
    const [scamList, setScamList] = useState(null);

    useEffect(() => {
        const fetchScams = async () => {
            var requestOptions = {
                method: "GET",
                redirect: "follow",
            };
            const response = await fetch('https://api.cryptoscamdb.org/v1/scams', requestOptions);
            const data = await response.json();
            setScamList(data);
        };

        fetchScams().catch(console.error);
    }, []);

    return (
        <div className="scam-list">
            <h2>Crypto Scams</h2>
            <ul>
                {scamList && scamList.map((scam) => (
                    <li key={scam.name}>
                        {scam.name} - {scam.description}
                    </li>
                ))}
            </ul>
        </div>
    )
}
export default CryptoScam;