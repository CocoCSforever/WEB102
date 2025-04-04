import React, { useEffect, useState } from "react";
const API_KEY = import.meta.env.VITE_APP_API_KEY;

const CoinInfo = ({ image, value, name, symbol }) => {
    const [price, setPrice] = useState(null);
    useEffect(() => {
        console.log(value)
        const getCoinPrice = async () => {
            const response = await fetch(
                `https://min-api.cryptocompare.com/data/price?fsym=${symbol}&tsyms=USD&api_key=${API_KEY}`
            );
            const data = await response.json();
            console.log(name + "'s price" + data.USD);
            setPrice(data.USD);
        }

        getCoinPrice().catch(console.error);
    }, [symbol]);

    return (
        price?(
            <li className="main-list" key={symbol}>
                <div className="coin-info">
                    <img className="icons" 
                        src={`https://www.cryptocompare.com${image}`} 
                        alt={`Small icon for ${name} crypto coin`} />
                </div>
                <div>
                    {name} <span className="tab"></span>  $ {price} USD
                </div>
            </li>
        ):null
    );
    
}
export default CoinInfo;