import React from 'react'
import { useState } from 'react'

const SearchComponent = () => {
    const[city,setCity]=useState(null)
  return (
    <div className='w-full h-full rounded-xl outline-none'>
      <input className='w-full h-full px-6 py-4 bg-[#232b3b] outline-none focus:bg-slate-700 rounded-lg text-white' type="text" placeholder='Search for cities'/>
    </div>
  )
}

export default SearchComponent
