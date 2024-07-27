# WeatherApp

## Introduction

*WeatherApp* is a simple and intuitive application designed to provide users with accurate and up-to-date weather information. Whether you want to know the current weather conditions, the forecast for the next few days, or detailed information such as humidity and wind speed, WeatherApp has you covered.

## Tech Stack 
- React js .

## Features

- *Current Weather*: Get the latest weather updates for your location.
- *Detailed Weather Data*: Access information on temperature, humidity, wind speed, and more.
- *Location Search*: Search for weather information in different cities and countries.
- *User-friendly Interface*: Easy to navigate and use.
- * Recieve Alerts*: Recieve alerts on the desired locations.

## Installation

To install and run WeatherApp, follow these steps:

### Prerequisites

- Node js 
- Email js account
### Getting Started
1. clone the repository 
    bash 
    git clone https://github.com/NupurChopra/weather-app.git

2. navigate to the project directory 
    bash 
    cd client

3. create a .env file in the client directory  and copy the required credentials
    -  VITE_APIKEY=""  (This is where the openweater api key is to be added) 
    - VITE_EMAILJS_PUBLIC_KEY="" ( This is where the EMILJS public key is to be added to send alerts key is to be added)
    - VITE_EMAILJS_SERVICE_ID= "" (This is where the EMILJS service key  is to be added to send alerts key is to be added )
    - VITE_EMAILJS_TEMPLATE_ID=""   ( This is where the EMILJS emial template  id   is to be added to send alerts key is to be added )


4. run the npm install command
    bash 
    npm install 

5. start the app 
    bash 
    npm run dev
6. visit the app on https://localhost:5173