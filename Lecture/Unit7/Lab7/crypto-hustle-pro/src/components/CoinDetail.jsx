import React, { Component, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CoinChart from "./CoinChart";
const API_KEY = import.meta.env.VITE_APP_API_KEY;

const CoinDetail = () => {
    let params = useParams();
    const [fullDetails, setFullDetails] = useState({});

    useEffect(() => {
        const fetchInfo = async () => {
            const response = await fetch(`https://min-api.cryptocompare.com/data/all/coinlist?fsym=${params.symbol}&api_key=${API_KEY}`, {
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${API_KEY}`
                }
            })
            const data = await response.json()
            setFullDetails((prevDetails) => ({
                ...prevDetails,
                ...data.Data[params.symbol],
            }))
            console.log(data.Data[params.symbol])
        }
        const fetchData = async () => {
            const response = await fetch(`https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${params.symbol}&tsyms=USD&api_key=${API_KEY}`, {
                headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${API_KEY}`
                }
            })
            const data = await response.json()
            setFullDetails((prevDetails) => ({
                ...prevDetails,
                ...data.DISPLAY[params.symbol].USD,
            }))
            console.log(data.DISPLAY[params.symbol].USD)
        }
        fetchInfo().catch(console.error);
        fetchData().catch(console.error);
    }, [params.symbol])

    return (
        fullDetails?(
        <div className="coin-detail">
            <h1>{fullDetails.FullName}</h1>
            <CoinChart
                symbol={params.symbol}
                market={"USD"}
            />
            <img
                className="images"
                src={`https://www.cryptocompare.com${
                    fullDetails.IMAGEURL
                }`}
                alt={`Small icon for ${params.symbol} crypto coin`}
            />
            <div> {fullDetails.Description}</div>
            <br></br>
            <div>
                This coin was built with the algorithm{" "}
                {fullDetails.Algorithm}{" "}
            </div>
            <table className="coin-table">
            <tbody>
                    <tr>
                        <th>Launch Date</th>
                        <td>{fullDetails.AssetLaunchDate || "Unknown"}</td>
                    </tr>
                    <tr>
                        <th>Website</th>
                        <td>
                            <a
                                href={fullDetails.Url}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {fullDetails.Url || "N/A"}
                            </a>
                        </td>
                    </tr>
                    <tr>
                        <th>Whitepaper</th>
                        <td>
                            <a
                                href={fullDetails.Whitepaper?.Url}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {fullDetails.Whitepaper?.Url || "N/A"}
                            </a>
                        </td>
                    </tr>
                    <tr>
                        <th>Market</th>
                        <td>{fullDetails.MARKET || "N/A"}</td>
                    </tr>
                    <tr>
                        <th>Last Transaction</th>
                        <td>{fullDetails.LASTUPDATE || "N/A"}</td>
                    </tr>
                    <tr>
                        <th>Last Transaction Value</th>
                        <td>{fullDetails.LASTVOLUMETO || "N/A"}</td>
                    </tr>
                    <tr>
                        <th>Volume</th>
                        <td>{fullDetails.VOLUME24HOURTO || "N/A"}</td>
                    </tr>
                    <tr>
                        <th>Today's Open Price</th>
                        <td>{fullDetails.OPENDAY || "N/A"}</td>
                    </tr>
                    <tr>
                        <th>Highest Price</th>
                        <td>{fullDetails.HIGHDAY || "N/A"}</td>
                    </tr>
                    <tr>
                        <th>Lowest Price</th>
                        <td>{fullDetails.LOWDAY || "N/A"}</td>
                    </tr>
                    <tr>
                        <th>Change (24h)</th>
                        <td>{fullDetails.CHANGEPCT24HOUR || "N/A"}%</td>
                    </tr>
                    <tr>
                        <th>Market Cap</th>
                        <td>{fullDetails.MKTCAP || "N/A"}</td>
                    </tr>
                </tbody>
            </table>
        </div>):
        (
            <p>Loading...</p>
        )
    )
}
export default CoinDetail;