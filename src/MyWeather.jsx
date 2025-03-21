import React, { useState, useEffect } from "react";
import clear_icon from './assets/clear.png'
import cloud_icon from './assets/cloud.png'
import drizzle_icon from './assets/drizzle.png'
import humidity_icon from './assets/humidity.png'
import rain_icon from './assets/rain.png'
import snow_icon from './assets/snow.png'
import wind_icon from './assets/wind.png'

export default function MyWeather() {

    const [cityName, setCityName] = useState("")
    const [weatherIcon, setWeatherIcon] = useState(null)
    const [windIcon, setWindIcon] = useState(null)
    const [humidityIcon, setHumidityIcon] = useState(null)
    const [searchedCityTemp, setSearchedCityTemp] = useState(null)
    const [searchedCity, setSearchedCity] = useState("")
    const [windSpeed, setWindSpeed] = useState(12)
    const [humidity, setHumidity] = useState(32)

    const locationChange = (e) => {
        setCityName(e.target.value)
    }

    const searchLocation = () => {

    }

    return (
        <main className="card-container">
            <header>
                <h1>MyWeather</h1>
                <p><strong>Search for any location</strong></p>
            </header>
            <section className="search">
                <input value={cityName} type="text" placeholder="Enter location" onChange={locationChange} />
                <button className="search-btn btn" onClick={searchLocation}><i className='bx bx-search-alt bx-tada-hover  bx-sm' ></i></button>
            </section>
            <section className="weatherInfo">
                <img className="weather-icon" src={clear_icon} alt="" />
                <h2>{searchedCityTemp}24 °C</h2>
                <h4>{searchedCity}London</h4>
            </section>
            <section className="windAndHumidity">
                <div className="windSpeed">
                    <img className="wind-icon" src={wind_icon} alt="" />
                    <p>{windSpeed} Km/hr</p>
                    <p>Wind Speed</p>
                </div>
                <div className="humidity">
                    <img className="humidity-icon" src={humidity_icon} alt="" />
                    <p>{humidity} %</p>
                    <p>Humidity</p>
                </div>
            </section>
            <footer>MyWeather©2025</footer>
        </main>
    )
}