import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
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

function Home(){
  // todo usea useeffect to get any alerts for user 
  const[location, setLocaton]= useRecoilState(currentLocation);
  useEffect(()=>{
    if (navigator.geolocation){
      navigator.geolocation.getCurrentPosition((pos)=>{
        const currLatitude=pos.coords.latitude;
        const currLongitude=pos.coords.longitude
        setLocaton({
          lat:currLatitude, 
          long:currLongitude
        })
      }, (e)=>{
        console.error(e.message)
      })
    }
  }, [setLocaton]);
  return (
    <div className='w-full min-h-screen bg-[#0d121d] py-5 px-6'>
      <div className='w-[1080px] mx-auto'>
        <div className='flex justify-between items-center  gap-4 h-10'>
          < SearchComponent className=" border border-black"/>
          <div className='w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-3xl text-black'> 
            A
          </div>
        </div>
        <div className='w-full h-full flex gap-4 py-6'>
          <div className='w-3/4 '>
            <CurrTemp/>
            {/* more compoe */}
          </div>
          <div className='w-1/4 border'>

          </div>
        </div>
      </div>
      <p className='text-white'>{JSON.stringify(location)}</p>
    </div>
  )
}

export default App
