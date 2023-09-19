// Your application goes here

const API_URL = "https://mocki.io/v1/84954ef5-462f-462a-b692-6531e75c220d";
const POST_API_URL = 'https://0211560d-577a-407d-94ab-dc0383c943e0.mock.pstmn.io/submitform';

import FormData from './api/getFormData.js';
import PostData from './api/postFormData.js';

import buildLayout from './components/layout.js';

// get the data from API
const formElements = await FormData(API_URL);

// Render component based on the response
const layout = buildLayout(formElements);

document.getElementById("user-form").innerHTML = layout;

// Collect data from the form and post it
document.addEventListener("click", function(e){
	const target = e.target.closest("#submit"); // Or any other selector.

	let error = false;
	let errorMessage = '';

	if(target){
		e.preventDefault();

		if (document.getElementById("message")) {
			document.getElementById("message").remove();
		}

		let formData = [];

		let params = {};
		const form = document.user_data;
		for( let i=0; i < form.elements.length; i++ ){

			if (form.elements[i].type !== 'submit') {

				let fieldName = form.elements[i].name;
				let fieldValue = form.elements[i].value;

				if (form.elements[i].type === 'radio' && !form.elements[i].checked){
					continue;
				}

				if (form.elements[i].type === 'radio' && fieldValue.length === 0) {
					error = true;
					errorMessage = 'Please check one of the options!';
					break;
				}

				
				if (form.elements[i].required === true) {
					if (fieldValue === null || fieldValue === '') {
						error = true;
						errorMessage = 'Please fill required fields!';
						break;
					}
				}

				if (form.elements[i].type === 'tel'){
					let regex = `^${form.elements[i].pattern}$`;

					var re = new RegExp(regex);

					if (!re.test(fieldValue)) {
						error = true;
						errorMessage = 'Wrong phone format!';
						break;
					}
					
				}

				if (form.elements[i].type === 'email'){
					const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

					if (!re.test(fieldValue)) {
						error = true;
						errorMessage = 'Wrong email format!';
						break;
					}
					
				}

				params["name"] = fieldName
				params["value"] = fieldValue

				formData.push(params);

				params = {};
			}
		}

		const node = document.createElement("p");
		node.id = 'message';
		let textnode;

		if (!error) {
			const postResponse = PostData(POST_API_URL, formData);

			postResponse.then((result) => {

				if (result === 'good') {
					textnode = document.createTextNode("Form submitted successfully")
					node.style.color = 'green';
				} else {
					node.style.color = 'red';
					textnode = document.createTextNode("An error occurred!")
				}

				node.appendChild(textnode);
				document.getElementById("main").appendChild(node);
	        });
		} else {
			node.style.color = 'red';
			textnode = document.createTextNode(errorMessage)
			node.appendChild(textnode);
			document.getElementById("main").appendChild(node);
		}

	}
});

