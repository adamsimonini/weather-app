import React, { useState, useEffect } from "react";
import * as API from "./API";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
import "./App.css";
import Button from "@mui/material/Button";
import CitySelect from "./components/CitySelect";

function App() {
	const [cityCoordinates, setCityCoordinates] = useState({});

	const getWeather = async (city: string) => {
		// API.getWeatherForLatLon(lat, lon);
	};

	const captureCoordinates = (coordinates: { lat: number; lon: number }) => {
		setCityCoordinates(coordinates);
	};

	useEffect(() => {
		API.getWeatherForLatLon(cityCoordinates);
	}, [cityCoordinates]);

	return (
		<>
			<h1>Weather App</h1>
			<div className="card"></div>
			<CitySelect captureCoordinates={captureCoordinates} />
			<Button onClick={() => false} variant="contained">
				False
			</Button>
		</>
	);
}

export default App;
