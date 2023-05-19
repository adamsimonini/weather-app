const weatherAPIKey = import.meta.env.VITE_WEATHER_API_KEY;

interface coordinates {
	lat: number;
	lon: number;
}

export const getWeatherForLatLon = async ({ lat, lon }: coordinates): Promise<any> => {
	try {
		console.log(lat);
		console.log(lon);
		const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${weatherAPIKey}`);
		const jsonData = await response.json();
		return jsonData;
	} catch (error) {
		console.log(error);
	}
};

export const getCityLatLon = async (city: string): Promise<any> => {
	try {
		const response = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${weatherAPIKey}`);
		const jsonData = await response.json();
		return jsonData;
	} catch (error) {
		console.log(error);
	}
};
