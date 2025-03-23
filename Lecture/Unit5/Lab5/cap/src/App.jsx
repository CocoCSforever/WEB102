import { useState } from 'react'
import './App.css'
import APIForm from './components/APIForm';
const ACCESS_KEY = import.meta.env.VITE_APP_ACCESS_KEY;
import Gallery from './components/Gallery';

function App() {
  const [currentScreenshot, setCurrentScreenshot] = useState(null)
  const [screenshotHistory, setScreenshotHistory] = useState([])
  const [quota, setQuota] = useState(null)
  const [inputs, setInputs] = useState({
    url: "",
    format: "png",
    no_ads: "true",
    no_cookie_banners: "true",
    width: "500",
    height: "500",
  });
  const submitForm = () => {
    let defaultValues = {
      format: "jpeg",
      no_ads: "true",
      no_cookie_banners: "true",
      width: "1920",
      height: "1080",
    }

    if (inputs.url === "" || inputs.url === " ") {
      alert("Please input a URL")
      return
    }else{
      for(const [key, value] of Object.entries(inputs)){
        if(value === "" || value === " "){
          inputs[key] = defaultValues[key]
        }
      }
    }
    callAPI()
  }

  const makeQuery = () => {
    let url_starter = "https://"
    let wait_until = "network_idle"
    let response_type = "json"
    let fail_on_status = "400%2C404%2C500-511"
    let query = `https://api.apiflash.com/v1/urltoimage?access_key=${ACCESS_KEY}&url=${url_starter}${inputs.url}&format=${inputs.format}&no_ads=${inputs.no_ads}&no_cookie_banners=${inputs.no_cookie_banners}&width=${inputs.width}&height=${inputs.height}&wait_until=${wait_until}&response_type=${response_type}&fail_on_status=${fail_on_status}`
    return query
  }

  const callAPI = async () => {
    let query = makeQuery()
    let response = await fetch(query)
    let data = await response.json()
    if(data.url === null){
      alert(data.error)
      return
    }
    setCurrentScreenshot(data.url)
    setScreenshotHistory((prevState) => [...prevState, data.url])
    resetInputs()
    getQuota()
  }

  const resetInputs = () => {
    setInputs({
      url: "",
      format: "png",
      no_ads: "true",
      no_cookie_banners: "true",
      width: "500",
      height: "500",
    })
  }

  const getQuota = async () => {
    let query = `https://api.apiflash.com/v1/quota?access_key=${ACCESS_KEY}`
    let response = await fetch(query)
    let data = await response.json()
    setQuota(data)
  }

  return (
    <div className="whole-page">
      {quota? (
        <p>Remaining API calls: {quota.remaining} out of {quota.limit}</p>
      ):(
        <p>Remaining API calls: Loading...</p>
      )}
      <h1>Build Your Own Screenshot! 📸</h1>
      
      <APIForm
        inputs={inputs}
        handleChange={(e) =>
          setInputs((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value.trim(),
          }))
        }
        onSubmit={submitForm}
      />
      <br></br>
      {currentScreenshot && (
        <div>
          <h2>Your Screenshot:</h2>
          <img className="screenshot" src={currentScreenshot} alt="Screenshot returned" />
        </div>
      )}
      <div className="container">
        <h3> Current Query Status: </h3>
        <p>
          https://api.apiflash.com/v1/urltoimage?access_key=ACCESS_KEY    
          <br></br>
          &url={inputs.url} <br></br>
          &format={inputs.format} <br></br>
          &width={inputs.width}
          <br></br>
          &height={inputs.height}
          <br></br>
          &no_cookie_banners={inputs.no_cookie_banners}
          <br></br>
          &no_ads={inputs.no_ads}
          <br></br>
        </p>
      </div>

      <br></br>
      <div className="container">
        <Gallery images={screenshotHistory} />
      </div>
    </div>
  );
}

export default App
