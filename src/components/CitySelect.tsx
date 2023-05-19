import React, { useState, useEffect } from "react";
import * as API from "../API";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
import { Button, TextField, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";

export default function CitySelector(props: any) {
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
		<section style={styles.container}>
			<h3>Find city</h3>
			<div style={styles.searchField}>
				<TextField id="city" label="Enter city name" variant="standard" onChange={event => setCityInput(event.target.value.toLowerCase())} />
				<Button style={styles.button} onClick={() => findCity()} variant="contained" disabled={!cityInput}>
					Get Results
				</Button>
			</div>
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
		</section>
	);
}
const styles = {
	container: {
		flex: 1,
		backgroundColor: "#fff",
		padding: 20
	},
	searchField: {
		display: "flex",
		alignItems: "flex-end"
	},
	button: {
		marginleft: 10
	}
};
