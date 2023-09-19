// Your application goes here

const API_URL = "https://mocki.io/v1/84954ef5-462f-462a-b692-6531e75c220d";

import FormData from './api/getFormData.js';

const formElements = await FormData(API_URL);

console.log(formElements);

// get the data from API
	// create a class/file/function to handle that

// set the json response as param to the function/class that will render component based on the response