import axios from 'axios';
import { API_KEY } from './ApiKey';
export const fetchNews = async () => {
	try {
		const url = `https://newsapi.org/v2/everything?q=Apple&from=2024-12-01&sortBy=popularity&apiKey=${API_KEY}`;
		const response = await axios.get(url);
		return response;
	} catch (error) {
		console.error('Error fetching news:', error.message);
	}
};
