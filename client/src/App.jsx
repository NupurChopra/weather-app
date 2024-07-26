import { useEffect, useState } from 'react';
import './App.css';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Routes, Route } from "react-router-dom";
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import SearchComponent from './components/SearchComponent';
import CurrTemp from './components/CurrTemp';
import { useRecoilState } from 'recoil';
import { currentLocation } from './store/atoms/location';
import Weekly from "./components/Weakly"; 
import { Alert } from './components/Alert';
import emailjs from '@emailjs/browser';

function App() {
  return (
    <>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>
      <ToastContainer />
    </>
  );
}

function Home() {
  const [data, setData] = useState(null);
  const [location, setLocation] = useRecoilState(currentLocation);
  const [loading, setLoading] = useState(false);
  const [tempUnit, setTempUnit] = useState("K");
  const [weekly, setWeekly] = useState(null);

  // const getWeeklyDetails = async (lat, long) => {
  //   try {
  //     const response = await fetch(https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=current,minutely,hourly,alerts&appid=${import.meta.env.VITE_APIKEY});
  //     const data = await response.json();
  //     setWeekly(data.daily);
  //     sendEmail();
  //   } catch (error) {
  //     console.error('Error fetching weekly weather details:', error.message);
  //   }
  // };

  const getWeatherDetails = async (lat, long) => {
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${import.meta.env.VITE_APIKEY}`);
      const data = await response.json();
      setData(data);
      sendEmail();
    } catch (error) {
      console.error('Error fetching weather details:', error.message);
    }
  };

  const convertToKelvin = (temp, unit) => {
    const temperature = parseFloat(temp);
    if (isNaN(temperature)) return '';
    switch (unit) {
      case 'C':
        return (temperature + 273.15).toFixed(2);
      case 'F':
        return ((temperature - 32) * 5 / 9 + 273.15).toFixed(2);
      case 'K':
        return temperature.toFixed(2);
      default:
        return '';
    }
  };
useEffect(()=>{
  sendEmail(data)
  // console.log(data);
}, [data])
  const sendEmail = async () => {
    const previousData = JSON.parse(localStorage.getItem("Credentials")) || {};
    if (!data || !data.name || !data.main || !data.main.temp) {
      console.log("Weather data not available yet");
      return;
    }
    // console.log(previousData.city === data.name);
    console.log(previousData.name);
    if (previousData && previousData.temp && parseFloat(previousData.temp) < data.main.temp && previousData.city === data.name) {
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
      try {
        alert(`Temperature of ${previousData.city} exceeded the threshold by ${(data.main.temp - parseFloat(previousData.temp))}K`)
        await emailjs.send(serviceId, templateId, {
          to_name: previousData.name,
          recipient: previousData.email,
          city: previousData.city,
          temp: (data.main.temp - parseFloat(previousData.temp)).toFixed(2),
        });
      } catch (e) {
        console.log("Error in sending email", e.message);
      }
    }
    else {
      console.log("No data found or conditions not met for sending email");
    }
  };
  useEffect(() => {
    setLoading(true);
    const fetchData = () => {
      emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY);
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
              // getWeeklyDetails(currLatitude, currLongitude);
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
    };

    fetchData();
    const intervalId = setInterval(fetchData, 300000); // 300000 ms = 5 minutes

    return () => clearInterval(intervalId); // Clear interval on component unmount
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className='w-full min-h-screen bg-[#0d121d] py-5 px-6'>
      <div className='w-[1080px] mx-auto'>
        <div className='flex justify-between items-center gap-4 h-10'>
          <SearchComponent className="border border-black" data={data} setData={setData} sendEmail={sendEmail}/>
        </div>
        <div className='w-full h-full flex gap-4 py-6'>
          <div className='w-2/3'>
            {data ? <CurrTemp element={data} /> : <div>No data available</div>}
          </div>
          <div className='w-1/3 border'>
            <Alert sendEmail={sendEmail} />
            {weekly ? <Weekly data={weekly} /> : <div>No weekly data</div>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;