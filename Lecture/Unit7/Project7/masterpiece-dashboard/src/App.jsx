import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useEffect, useState } from "react";
import './App.css'
import ObjectDetail from './components/ObjectDetail'
// import SideNav from './components/SideNav'
import SidebarLayout from './pages/SidebarLayout'
import Dashboard from './pages/Dashboard'
const ACCESS_TOKEN = import.meta.env.ACCESS_TOKEN;

function App() {
  const [objectsOnDisplay, setObjectsOnDisplay] = useState([]);
  const [filteredObjects, setFilteredObjects] = useState([]);

  useEffect(() => {
    const fetchObjectsOnDisplay = async () => {
      console.log(ACCESS_TOKEN);
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


  return (
    <Router>
      {/* <SideNav activeSection={activeSection} setActiveSection={setActiveSection} /> */}
      <Routes>
        <Route path="/" element={<SidebarLayout />}>
          <Route index element={<Dashboard objectsOnDisplay={objectsOnDisplay} filteredObjects={filteredObjects} setFilteredObjects={setFilteredObjects}/>} />
          <Route path="object/:id" element={<ObjectDetail />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
