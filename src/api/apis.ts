import axios from 'axios';
import { API_KEY } from './ApiKey';
export const fetchNews = async () => {
	try {
		const url = 'https://newsapi.org/v2/everything?q=Apple&from=2024-12-01&sortBy=popularity&apiKey=9ba814f6c3104716909cde52e8c35a7a';
		const response = await axios.get(url);
        console.log(response)
		return response;
	} catch (error) {
		console.error('Error fetching news:', error.message);
	}
};
