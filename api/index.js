import axios from 'axios';
import { filterInvalidElements } from '../utils';
import { LOCALHOST } from './constants';

export const sendLoginRequest = async ({ email, password }) => {
	const url = `${LOCALHOST}/login`;
	const body = { email, password };

	try {
		const response = await axios.post(url, body, {
			headers: {
				'Content-Type': 'application/json'
			}
		});
		return response.data;
	} catch (error) {
		return error.response.data;
	}
};

export const getListOfSites = async () => {
	const url = 'https://6389df1b4eccb986e89cf319.mockapi.io/give-some-data/websites';
	try {
		const response = await axios.get(url, {
			headers: {
				'Content-Type': 'application/json'
			}
		});
		const data = response.data;
		return filterInvalidElements(data);
	} catch (error) {
		console.error('Request failed:', error);
	}
};

export const fetchParseCopyrights = async (siteUrl) => {
	const fetchUrl = `${LOCALHOST}/parse-copyright`;
	const body = { siteUrl };
	try {
		const response = await axios.post(fetchUrl, body, {
			headers: {
				'Content-Type': 'application/json'
			}
		});
		const data = response.data;
		console.log(data, "response.data;");
		return data
	} catch (error) {
		console.error('Request failed:', error);
	}
};