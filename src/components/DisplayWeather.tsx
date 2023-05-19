import { useState, useEffect } from "react";
import * as API from "../API";

export default function CitySelector(props: any) {
	const [data, setData] = useState(null);

	useEffect(() => {
		if (props.coordinates.lat) {
			const fetchData = async () => {
				try {
					const weatherData = await API.getWeatherForLatLon(props.coordinates);
					setData(weatherData);
					console.log(weatherData);
				} catch (error) {
					console.log("Error:", error);
				}
			};
			fetchData();
		}
	}, [props.coordinates]);

	return (
		<section style={styles.container}>
			{!!data && (
				<div style={styles.weather}>
					<img src={`https://openweathermap.org/img/wn/${(data as any).weather?.[0]?.icon}@2x.png`} alt="Logo" />
					<div>
						<b>Temperature</b>: {(data as any).main?.temp || "No temperature information available"} °C
					</div>
					<div>
						<b>Feels like</b>: {(data as any).main?.feels_like || "No temperature information available"} °C
					</div>
					<div>
						<b>Sky</b>: {(data as any).weather?.[0]?.main || "No sky information available"}
					</div>
				</div>
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
	citySearch: {
		marginright: 10
	},
	weather: {
		fontSize: 25
	}
};
