export default function buildLayout(elementData){

	const htmlLayoutElement = elementData.map((element) => {

		const type = element.type;
		const name = element.name;
		const id = element.id;
		const required = element.required;
		const label = element.label;

		if (type === 'radio') {
			const options = element.options;

			let optionsHtml = '';
 
			options.forEach(function(option){
			    optionsHtml += `
			    	<input type="radio" name="${name}" id="${option.id}" value="${option.value}">
			    	<label for="${option.id}">${option.label}</label>
				`
			});

			if (optionsHtml !== undefined) {
				return `<div class="element-wrapper">
					<label for="${id}">${element.legend}</label>
					${optionsHtml}
				</div>`
			}
			
		}

		return `<div class="element-wrapper">
					<label for="${id}">${label}</label>
					<input type="${type}" name="${type}" id="${id}" required="${required}">
				</div>`
	});

	return htmlLayoutElement.join('<br>') + '<button type="submit">Submit</button>';
  
}