import React, { useState, useEffect } from 'react';

const SearchComponent = ({data,setData, sendEmail}) => {
  const [city, setCity] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  // Debounce hook logic integrated directly
  const useDebounce = (value, delay) => {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);

      return () => {
        clearTimeout(handler);
      };
    }, [value, delay]);

    return debouncedValue;
  };

  const debouncedCity = useDebounce(city, 2000); // 500ms delay

  useEffect(() => {
    if (debouncedCity) {
      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${import.meta.env.VITE_APIKEY}`)
        .then(response => response.json())
        .then(data => {
          setData(data)
          sendEmail()
        })
        .catch(error => console.error('Error fetching search results:', error));
    } else {
      setSearchResults([]);
    }
  }, [debouncedCity]);

  const handleChange = (event) => {
    setCity(event.target.value);
  };

  return (
    <div className='w-full h-full rounded-xl outline-none'>
      <input
        className='w-full h-full px-6 py-4 bg-[#232b3b] outline-none focus:bg-slate-700 rounded-lg text-white'
        type="text"
        placeholder='Search for cities'
        value={city}
        onChange={handleChange}
      />
    </div>
  );
};

export default SearchComponent;