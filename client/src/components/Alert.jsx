import React, { useRef, useState, useEffect } from 'react';

export const Alert = ({sendEmail}) => {
  const form = useRef();

  // Initialize state with localStorage data if available
  const [credentials, setCredentials] = useState({
    name: '',
    email: '',
    city: '',
    temp: '',
    unit: 'K'
  });

  useEffect(() => {
    const previousData = JSON.parse(localStorage.getItem("Credentials")) || {};
    setCredentials({
      name: previousData.name || '',
      email: previousData.email || '',
      city: previousData.city || '',
      temp: previousData.temp || '',
      unit: previousData.unit || 'K'
    });
  }, []);

  const saveCredentials = (e) => {
    e.preventDefault();
    const tempInKelvin = convertToKelvin(credentials.temp, credentials.unit);
    const dataToSave = {
      ...credentials,
      temp: tempInKelvin,
      unit: 'K' // Storing the temperature in Kelvin
    };
    localStorage.setItem("Credentials", JSON.stringify(dataToSave));
    alert('Credentials saved successfully');
    sendEmail()
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({
      ...credentials,
      [name]: value
    });
  };

  return (
    <form ref={form} onSubmit={saveCredentials} className='bg-slate-800 text-white flex flex-col px-4 py-2'>
      <label>Name</label>
      <input
        type="text"
        name="name"
        value={credentials.name}
        onChange={handleChange}
        className='my-2 py-1 px-2 text-black'
      />
      <label>Email</label>
      <input
        type="email"
        name="email"
        value={credentials.email}
        onChange={handleChange}
        className='my-2 py-1 px-2 text-black'
      />
      <label>City</label>
      <input
        type="text"
        name="city"
        value={credentials.city}
        onChange={handleChange}
        className='my-2 py-1 px-2 text-black'
      />
      <label>Threshold Temperature</label>
      <input
        type="number"
        name="temp"
        value={credentials.temp}
        onChange={handleChange}
        className='my-2 py-1 px-2 text-black'
      />
      <select
        name="unit"
        value={credentials.unit}
        onChange={handleChange}
        className='my-2 py-1 px-2 text-black'
      >
        <option value="C">Celsius</option>
        <option value="F">Fahrenheit</option>
        <option value="K">Kelvin</option>
      </select>
      <input type="submit" value="Create Alert" className='py-2 my-4 bg-blue-700 rounded-lg text-xl' />
    </form>
  );
};