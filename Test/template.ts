var say = "a bird in hand > two in the bush";
var html = htmlEscape`<div> I would just like to say : ${say}</div>`;

// a sample tag function
function htmlEscape(literals: TemplateStringsArray, ...placeholders: string[]) {
	let result = "";

	// interleave the literals with the placeholders
	for (let i = 0; i < placeholders.length; i++) {
		result += literals[i];
		result += placeholders[i]
			.replace(/&/g, "&amp;")
			.replace(/"/g, "&quot;")
			.replace(/'/g, "&#39;")
			.replace(/</g, "&lt;")
			.replace(/>/g, "&gt;");
	}

	// add the last literal
	result += literals[literals.length - 1];
	return result;
}

console.log(html);
