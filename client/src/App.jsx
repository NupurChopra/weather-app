import { useEffect, useState } from 'react'
import './App.css'
import {ToastContainer} from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import{Routes,Route} from "react-router-dom"
import Signin from './pages/Signin'
import Signup from './pages/Signup'
import SearchComponent from './components/SearchComponent'
import CurrTemp from './components/CurrTemp'
import { useRecoilState } from 'recoil'
import { currentLocation } from './store/atoms/location'
import Weakly from "./components/Weakly"

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <Routes>
          <Route path="/" element={<Home/>}></Route>
          <Route path="/signin" element={<Signin/>}></Route>
          <Route path="/signup" element={<Signup/>}></Route>
        </Routes>
      </div>
      <ToastContainer></ToastContainer>
    </>
  )
}
function Home() {
  const [data, setData] = useState(null);
  const [location, setLocation] = useRecoilState(currentLocation);
  const [loading, setLoading] = useState(false);
  const [tempunit,settempunit] = useState("k")
  const [weakly,setweakly] = useState(null)

  // const getweaklydetails=async (lat,long)=>{
  //   try{
      
  //     // const response =await fetch(`https://api.openweathermap.org/data/2.5/forecast/daily?lat=${lat}&lon=${long}&appid=${import.meta.env.VITE_APIKEY}`)
  //     const response =await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&appid=${import.meta.env.VITE_APIKEY}`);
  //     const data = await response.json();
  //     // console.log(response.json());
  //     setweakly(data)
  //   }
  //   catch (error) {
  //     console.error('Error fetching weather details:', error.message);
  //   }
  // }

  const getWeatherDetails = async (lat, long) => {
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${import.meta.env.VITE_APIKEY}`);
      const data = await response.json();
      // console.log(data);
      setData(data);
    } catch (error) {
      console.error('Error fetching weather details:', error);
    }
  };

  useEffect(() => {
    setLoading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const currLatitude = pos.coords.latitude;
          const currLongitude = pos.coords.longitude;
          setLocation({
            lat: currLatitude,
            long: currLongitude
          });
          if (currLatitude && currLongitude) {
            getWeatherDetails(currLatitude, currLongitude);
            // getweaklydetails(currLatitude,currLongitude);
          }
          setLoading(false);
        },
        (e) => {
          console.error(e.message);
          setLoading(false);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
      setLoading(false);
    }
  }, [setLocation]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className='w-full min-h-screen bg-[#0d121d] py-5 px-6'>
      <div className='w-[1080px] mx-auto'>
        <div className='flex justify-between items-center gap-4 h-10'>
          <SearchComponent className="border border-black" />
          <div className='w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-3xl text-black'>
            A
          </div>
        </div>
        <div className='w-full h-full flex gap-4 py-6'>
          <div className='w-2/3'>
            {data ? <CurrTemp element={data} /> : <div>No data available</div>}
            {/* More components can go here */}

          </div>
          <div className='w-1/3 border'>
          {weakly ? <Weakly data={weakly}/> : <div>No weakly data</div>}
            {/* Additional content or components */}
          </div>
        </div>
      </div>
    </div>
  );
}

// export default Home;
export default App
