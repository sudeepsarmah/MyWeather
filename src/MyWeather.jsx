import React, { useState, useRef, useEffect } from "react";
import windSpeed_icon from './assets/wind.png'
import humidity_icon from './assets/humidity.png'


export default function MyWeather() {

    const [cityName, setCityName] = useState("")
    const [weatherData, setWeatherData] = useState(null)
    const inputRef = useRef()
    const [isActive, setIsActive] = useState(false)

    useEffect((() =>
        inputRef.current.focus()
    ), [])

    const allIcons = {
        "01d": "https://openweathermap.org/img/wn/01d@2x.png",
        "01n": "https://openweathermap.org/img/wn/01n@2x.png",
        "02d": "https://openweathermap.org/img/wn/02d@2x.png",
        "02n": "https://openweathermap.org/img/wn/02n@2x.png",
        "03d": "https://openweathermap.org/img/wn/03d@2x.png",
        "03n": "https://openweathermap.org/img/wn/03n@2x.png",
        "04d": "https://openweathermap.org/img/wn/04d@2x.png",
        "04n": "https://openweathermap.org/img/wn/04n@2x.png",
        "09d": "https://openweathermap.org/img/wn/09d@2x.png",
        "09n": "https://openweathermap.org/img/wn/09n@2x.png",
        "10d": "https://openweathermap.org/img/wn/10d@2x.png",
        "10n": "https://openweathermap.org/img/wn/10n@2x.png",
        "11d": "https://openweathermap.org/img/wn/11d@2x.png",
        "11n": "https://openweathermap.org/img/wn/11n@2x.png",
        "13d": "https://openweathermap.org/img/wn/13d@2x.png",
        "13n": "https://openweathermap.org/img/wn/13n@2x.png",
        "50d": "https://openweathermap.org/img/wn/50d@2x.png",
        "50n": "https://openweathermap.org/img/wn/50n@2x.png"
    }

    const search = async (cityName) => {
        if (cityName === "") {
            alert("Please enter city name")
            return
        }
        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${import.meta.env.VITE_APP_ID}`
            const response = await fetch(url)
            const data = await response.json()
            if (!response.ok) {
                alert(data.message)
                setWeatherData(null)
                return
            }

            const weatherIcon = data.weather && data.weather.length > 0 && data.weather[0].icon
                ? allIcons[data.weather[0].icon] || "https://openweathermap.org/img/wn/01d@2x.png"
                : "https://openweathermap.org/img/wn/01d@2x.png";
            setWeatherData({
                humidity: data.main.humidity,
                windSpeed: data.wind.speed,
                temp: Math.floor(data.main.temp),
                name: data.name,
                weatherIcon: weatherIcon
            })
            setIsActive(true)

        } catch (error) {
            setWeatherData(null)
            alert("Error in fetching data, API issues, please try some time later")
        }


    }
    const locationChange = (e) => {
        setCityName(e.target.value)
    }

    return (
        <main className="card-container">
            <header>
                <h1>MyWeather</h1>
                <p><strong>Search for any location</strong></p>
            </header>
            <section className="search">
                <input ref={inputRef} value={cityName} type="text" placeholder="Enter location" onChange={locationChange} />
                <button className="search-btn btn" onClick={() => search(cityName)}><i className='bx bx-search-alt bx-tada-hover  bx-sm' ></i></button>
            </section>
            {weatherData ? <>
                <section className={isActive ? "weatherInfo" : "weatherInfo inActive"}>
                    <img className="weather-icon" src={weatherData.weatherIcon} alt="" />
                    <h2>{weatherData.temp}°C</h2>
                    <h4>{weatherData.name}</h4>
                </section>
                <section className="windAndHumidity">
                    <div className="windSpeed">
                        <img className="wind-icon" src={windSpeed_icon} alt="" />
                        <p>{weatherData.windSpeed} Km/hr</p>
                        <p>Wind Speed</p>
                    </div>
                    <div className="humidity">
                        <img className="humidity-icon" src={humidity_icon} alt="" />
                        <p>{weatherData.humidity} %</p>
                        <p>Humidity</p>
                    </div>
                </section>
            </> : <></>}
            <footer>MyWeather©2025</footer>
        </main>
    )
}