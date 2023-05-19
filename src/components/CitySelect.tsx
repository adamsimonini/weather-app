import React, { useState, useRef } from "react";
import * as API from "../API";
import { Button, TextField, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Box } from "@mui/material";
import GlobeIcon from "@mui/icons-material/Public";

export default function CitySelector(props: any) {
	const [cityInput, setCityInput] = useState("");
	const [cityList, setCityList] = useState([]);
	const [selectedCity, setSelectedCity] = React.useState();
	const ref = useRef(null);

	const findCity = async () => {
		try {
			const list = await API.getCityLatLon(cityInput.trim());
			setCityList(list);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<section style={styles.container}>
			<h3>Find city</h3>
			<Box gap={3} style={styles.searchField}>
				<TextField id="city" label="Enter city name" variant="standard" onChange={event => setCityInput(event.target.value.toLowerCase())} />
				<Button onClick={() => findCity()} variant="contained" disabled={!cityInput}>
					Search for city <GlobeIcon />
				</Button>
			</Box>
			{!!cityList && cityList.length > 0 && (
				<List>
					{cityList.map((city, i) => {
						return (
							<ListItem disablePadding key={`${i}-${city.lat}`}>
								<ListItemButton
									color="success"
									selected={selectedCity === i}
									onClick={() => {
										setSelectedCity(i); // add css styling to denote selected city
										ref.current?.scrollIntoView({ behavior: "smooth" }); // scroll weather component into view
										props.captureCoordinates({
											// pass coordinates up to parent
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
			<div ref={ref}></div>
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
	citySearch: {
		marginright: 10
	}
};
