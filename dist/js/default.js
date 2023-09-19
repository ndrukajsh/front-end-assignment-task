// Your application goes here

const API_URL = "https://mocki.io/v1/84954ef5-462f-462a-b692-6531e75c220d";
const POST_API_URL = '';

import FormData from './api/getFormData.js';
import buildLayout from './components/layout.js';

// get the data from API

const formElements = await FormData(API_URL);

// Render component based on the response
const layout = buildLayout(formElements);

document.getElementById("user-form").innerHTML = layout;
