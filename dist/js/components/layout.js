export default function buildLayout(elementData){

	const htmlLayoutElement = elementData.map((element) => {

		const type = element?.type;
		const name = element?.name;
		const id = element?.id;
		const required = element.required;
		const label = element?.label;
		const pattern = element?.pattern;

		let requiredElement = '';

		if (required === 1) {
			requiredElement = '<span style="color: red;">*</span>'
		}

		if (type === 'radio') {
			const options = element?.options;

			let optionsHtml = '';
 
			options.forEach(function(option){
			    optionsHtml += `
			    	<input 
			    		type="radio" 
			    		name="${name}" 
			    		id="${option?.id}" 
			    		value="${option?.value}" 
			    		required="${required}"
			    		/>
			    	<label for="${option?.id}">${option?.label}</label>
				`
			});

			if (optionsHtml !== undefined) {
				return `<div class="element-wrapper radio-element">
					<label for="${id}">${element?.legend} ${requiredElement}</label>
					${optionsHtml}
				</div>`
			}
			
		}

		let finalElement = `<div class="element-wrapper text-element">
					<label for="${id}">${label} ${requiredElement}</label>
					<input 
						type="${type}" 
						name="${name}" 
						id="${id}" 
						required="${required}"`;

		if (pattern !== undefined) {
			finalElement += `pattern="${pattern}"}/>
				</div>`
		} else {
			finalElement += '/></div>';
		}

		return finalElement;
		
						
	});

	return htmlLayoutElement.join('<br>') + '<button type="submit" id="submit">Submit</button>';
  
}

