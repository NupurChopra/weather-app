import React, { useState } from 'react'

const CurrTemp = () => {
    const[currdata,setCurrdata]=useState({
        city:"Ambala",
        rainChance:"72",
        currTemp:"31",
        image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJcWvU6z4ZGxSmJUEysCLUdYR4jSZzcilONQ&s"
    })
  return (
    <div className='flex text-white w-full h-48 gap-4 border '>
      <div className='flex-1 '>
        <h1 className='px-6 pt-6  font-semibold text-3xl'>{currdata.city}</h1>
        <h3 className='text-gray-500 px-6 pt-2 '>Chances of Rain : {currdata.rainChance}%</h3>
        <h1 className='text-white font-semibold px-6 pt-8 text-4xl'>{currdata.currTemp}°</h1>
      </div>
      <div className='flex-1'> 
      <img className=" w-3/4 translate-x-1/4 h-full bg-center" src={currdata.image}></img>
      </div>
    </div>
  )
}

export default CurrTemp
