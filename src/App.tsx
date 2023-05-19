import React, { useState, useEffect } from "react";
import SunIcon from "@mui/icons-material/WbSunny";
import * as API from "./API";
import "./App.css";
import CitySelect from "./components/CitySelect";
import DisplayWeather from "./components/DisplayWeather";

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
			<h1>
				Weather App <SunIcon />
			</h1>
			<CitySelect captureCoordinates={captureCoordinates} />
			<DisplayWeather coordinates={cityCoordinates} />
		</>
	);
}
