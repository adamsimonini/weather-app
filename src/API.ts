const weatherAPIKey = import.meta.env.VITE_WEATHER_API_KEY;

interface coordinates {
	lat: number;
	lon: number;
}

// gets the weather for a given latitue and longitude
export const getWeatherForLatLon = async ({ lat, lon }: coordinates) => {
	try {
		const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${weatherAPIKey}`);
		const jsonData = await response.json();
		return jsonData;
	} catch (error) {
		console.log(error);
		return null;
	}
};

// gets city data for a city name
export const getCityLatLon = async (city: string): Promise<any> => {
	try {
		const response = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${weatherAPIKey}`);
		const jsonData = await response.json();
		return jsonData;
	} catch (error) {
		console.log(error);
		return null;
	}
};
