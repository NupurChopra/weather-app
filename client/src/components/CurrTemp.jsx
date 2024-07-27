import React, { useState, useEffect } from "react";
import day from "../../public/assets/img/01d.png";
import { FaThermometerHalf } from "react-icons/fa";
import { FaWind } from "react-icons/fa";
import { FaDroplet } from "react-icons/fa6";
import { FaSun } from "react-icons/fa";
import { MdWindPower } from "react-icons/md";


const CurrTemp = ({ element }) => {
  const [unit, setUnit] = useState("K");
  const [temp, setTemp] = useState({
    temp: element.main?.temp,
    maxTemp: element.main?.temp_max,
    minTemp: element.main?.temp_min,
    currTime: new Date().getHours() % 12 + " : " + new Date().getMinutes(),
    feelslike: element.main?.feels_like,
    wind: element.wind.speed
  });

  useEffect(() => {
    setTemp({
      temp: element.main?.temp,
      maxTemp: element.main?.temp_max,
      minTemp: element.main?.temp_min,
      currTime: new Date().getHours() % 12 + " : " + new Date().getMinutes(),
      feelslike: element.main?.feels_like,
      wind: element.wind.speed
    });
  }, [element]);

  const kelvinToCelsius = () => {
    setTemp((prevTemp) => ({
      ...prevTemp,
      temp: (element.main.temp - 273.15).toFixed(2),
      maxTemp: (element.main.temp_max - 273.15).toFixed(2),
      minTemp: (element.main.temp_min - 273.15).toFixed(2),
      feelslike: (element.main.feels_like - 273.15).toFixed(2)
    }));
    setUnit("C");
  };

  const kelvinToFahrenheit = () => {
    setTemp((prevTemp) => ({
      ...prevTemp,
      temp: ((element.main.temp - 273.15) * 9 / 5 + 32).toFixed(2),
      maxTemp: ((element.main.temp_max - 273.15) * 9 / 5 + 32).toFixed(2),
      minTemp: ((element.main.temp_min - 273.15) * 9 / 5 + 32).toFixed(2),
      feelslike: ((element.main.feels_like - 273.15) * 9 / 5 + 32).toFixed(2)
    }));
    setUnit("F");
  };

  const convertToDefault = () => {
    setTemp({
      temp: element.main.temp,
      maxTemp: element.main.temp_max,
      minTemp: element.main.temp_min,
      feelslike: element.main.feels_like,
      wind: element.wind.speed,
      currTime: new Date().getHours() % 12 + " : " + new Date().getMinutes()
    });
    setUnit("K");
  };

  return (
    <div className="text-white">
      <div className="flex bg-slate-800 rounded-xl text-white justify-between w-full h-48 gap-4">
        <div className="flex-1">
          <h1 className="px-6 pt-6 font-semibold text-3xl">
            {element.name || "...."}
          </h1>
          <h3 className="text-gray-500 font-semibold px-6 pt-2">
            Updated at : {temp.currTime}
          </h3>
          <div>
            <h1 className="text-white font-semibold px-6 pt-8 text-4xl">
              {temp.temp || "...."}°{unit}
            </h1>
            <div className="flex mt-4 px-6 gap-5">
              <button
                className="bg-slate-700 px-2 rounded-lg"
                onClick={kelvinToFahrenheit}
              >
                °F
              </button>
              <button
                className="bg-slate-700 px-2 rounded-lg"
                onClick={convertToDefault}
              >
                °K
              </button>
              <button
                className="bg-slate-700 px-2 rounded-lg"
                onClick={kelvinToCelsius}
              >
                °C
              </button>
            </div>
          </div>
        </div>
        <div>
          <img
            className="w-[200px] h-[200px] p-3 mr-10 bg-center"
            src={
              element.weather?.[0]?.icon
                ? `/assets/img/${element.weather[0].icon}.png`
                : day
            }
            alt="Weather Icon"
          />
        </div>
      </div>
      <div className="flex px-6 mt-10 mb-6 justify-between">
        <p>
          <span className="text-slate-400 font-semibold">Max Temperature:</span>{" "}
          {temp.maxTemp} °{unit}
        </p>
        <p>
          <span className="text-slate-400 font-semibold">Min Temperature:</span>{" "}
          {temp.minTemp} °{unit}
        </p>
        <p>
          <span className="text-slate-400 font-semibold">Avg Temperature: </span>
          {((Number(temp.maxTemp) + Number(temp.minTemp)) / 2).toFixed(2)} °{unit}
        </p>
      </div>
      <p className="px-6">
        <span className="text-slate-400 font-semibold">Dormant weather condition :</span>{" "}
        {element.weather[0]?.description}
      </p>

      <div className="w-full bg-slate-800 h-30 mt-8 px-6 pb-4 rounded-xl">
        <h1 className="p-2 text-slate-400 text-lg font-semibold">Air Conditions</h1>
        <div className="grid grid-cols-2 gap-4">
          <div className="px-5 pt-2">
            <h3 className="text-slate-400 flex items-baseline gap-2 text-base font-semibold">
              <span className="text-xl">
                <FaThermometerHalf />
              </span>
              Real Feel
            </h3>
            <h1 className="text-2xl px-6 font-bold">{temp.feelslike} °{unit}</h1>
          </div>
          <div className="px-5 pt-2">
            <h3 className="text-slate-400 flex items-baseline gap-2 text-base font-semibold">
              <span className="text-xl">
                <FaWind />
              </span>
              Wind
            </h3>
            <h1 className="text-2xl px-6 font-bold">{temp.wind} km/h</h1>
          </div>
          <div className="px-5 pt-2">
            <h3 className="text-slate-400 flex items-baseline gap-2 text-base font-semibold">
              <span className="text-xl">
                <FaDroplet />
              </span>
              Humidity
            </h3>
            <h1 className="text-2xl px-6 font-bold">{element.main.humidity}</h1>
          </div>
          <div className="px-5 pt-2">
            <h3 className="text-slate-400 flex items-baseline gap-2 text-base font-semibold">
              <span className="text-xl">
                <MdWindPower />
              </span>
              Air Pressure
            </h3>
            <h1 className="text-2xl px-6 font-bold">{element.main.pressure}</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrTemp;