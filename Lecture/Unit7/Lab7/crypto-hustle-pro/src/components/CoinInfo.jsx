import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const API_KEY = import.meta.env.VITE_APP_API_KEY;

const CoinInfo = ({ image, value, name, symbol }) => {
    const [price, setPrice] = useState(null);
    useEffect(() => {
        const controller = new AbortController();
        console.log(value)
        const getCoinPrice = async () => {
            try{
                const response = await fetch(
                    `https://min-api.cryptocompare.com/data/price?fsym=${symbol}&tsyms=USD&api_key=${API_KEY}`,
                    {signal: controller.signal}
                );
                const data = await response.json();
                console.log(name + "'s price" + data.USD);
                setPrice(data.USD);
            }catch(error){
                if(error.name === 'AbortError'){
                    console.log('Fetch aborted');
                }else{
                    console.error('Fetch error: ', error);
                }
            };
        }

        getCoinPrice();
        return () => controller.abort();
    }, [symbol]);

    return (
        price?(
            <li className="main-list">
                <div className="coin-info">
                    <img className="icons" 
                        src={`https://www.cryptocompare.com${image}`} 
                        alt={`Small icon for ${name} crypto coin`} />
                </div>
                <Link
                    style={{ color: "White" }}
                    to={`/coinDetail/${symbol}`}
                    key={symbol}
                >
                    {name} <span className="tab"></span> ${price} USD
                </Link>
            </li>
        ):null
    );
    
}
export default CoinInfo;