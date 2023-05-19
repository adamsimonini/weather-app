import React, { useState, useEffect } from "react";
import * as API from "./API";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
import "./App.css";
import Button from "@mui/material/Button";
import CitySelect from "./components/CitySelect";

interface coordinates {
	lat: number;
	lon: number;
}

export default function App() {
	const [cityCoordinates, setCityCoordinates] = useState({});

	const captureCoordinates = (coordinates: coordinates) => {
		setCityCoordinates(coordinates);
	};

	useEffect(() => {
		// ensure that cityCoordinates has a lat property before attempting API call
		if (cityCoordinates.lat) API.getWeatherForLatLon(cityCoordinates);
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
