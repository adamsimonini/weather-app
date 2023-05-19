import React, { useState, useEffect } from "react";
import * as API from "../API";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
import { Button, TextField, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";

function CitySelector(props: any) {
	const [cityInput, setCityInput] = useState("");
	const [cityList, setCityList] = useState([]);

	const findCity = async () => {
		try {
			const list = await API.getCityLatLon(cityInput);
			setCityList(list);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<>
			<h3>Find city</h3>
			<TextField id="city" label="Enter city name" variant="standard" onChange={event => setCityInput(event.target.value.toLowerCase())} />
			<Button onClick={() => findCity()} variant="contained" disabled={!cityInput}>
				Get Results
			</Button>
			{!!cityList && cityList.length > 0 && (
				<List>
					{cityList.map((city, i) => {
						return (
							<ListItem disablePadding key={`${i}-${city.lat}`}>
								<ListItemButton
									onClick={() => {
										props.captureCoordinates({
											lat: city.lat,
											lon: city.lon
										});
									}}
								>
									<ListItemIcon></ListItemIcon>
									<ListItemText primary={`${city.name} - ${city.state} - ${city.country}`} />
								</ListItemButton>
							</ListItem>
						);
					})}
				</List>
			)}
		</>
	);
}

export default CitySelector;
