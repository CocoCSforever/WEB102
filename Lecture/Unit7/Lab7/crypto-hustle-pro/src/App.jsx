import { useEffect, useState } from 'react'
import './App.css'
import CoinInfo from './components/CoinInfo'
import SideNav from './components/SideNav'
const API_KEY = import.meta.env.VITE_APP_API_KEY;
const max_num = 10

function App() {
  const [list, setList] = useState(null)
  const [filterResults, setFilterResults] = useState([])
  const [searchInput, setSearchInput] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('https://min-api.cryptocompare.com/data/all/coinlist', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_KEY}`
        }
      })
      const data = await response.json()
      console.log(Object.entries(data.Data).slice(0, max_num))
      setList(data.Data)
    }

    fetchData().catch(console.error);
  }, [])

  const searchItems = (inputString) => {
    console.log(Object.entries(list).slice(0, max_num))
    setSearchInput(inputString)
    console.log(searchInput.length)
    if(inputString !== '') {
      const results = Object.entries(list).filter(([_, value]) => {
        return value.FullName.toLowerCase().includes(inputString.toLowerCase())
      })
      console.log(searchInput)
      setFilterResults(results)
    }else {
      setFilterResults(Object.entries(list))
    }
  }

  return (
    <>
      <div className="whole-page">
        <h1>My Crypto List</h1>
        <SideNav/>
        <input type="text" 
          placeholder="Search for a coin..." 
          className="textbox"
          onChange={(inputString) => searchItems(inputString.target.value)}/>
        <p>{searchInput.length}</p>
        <p>{list? Object.keys(list).length : 0}</p>
        <ul>
          {searchInput.length > 0 ? (
            filterResults.slice(0, max_num).map(([key, value]) => (
              <CoinInfo
                key={key}
                image={value.ImageUrl}
                name={value.FullName}
                symbol={value.Symbol}/>
            ))
          ) : (
            list && Object.entries(list).slice(0, max_num).map(([key, value]) => (
              // value.PlatformType=="blockchain"?(
              //   <CoinInfo
              //     key={key}
              //     image={value.ImageUrl}
              //     name={value.FullName}
              //     symbol={value.Symbol}/>
              // ):null
              <CoinInfo
                key={key}
                value={value}
                image={value.ImageUrl}
                name={value.FullName}
                symbol={value.Symbol}/>
            ))
          )}
        </ul>
      </div>
    </>
  )
}

export default App
