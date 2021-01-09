let totalTime = 0;
for (let i = 0; i < 100; i++) {
	let startTime = performance.now();
	// document.getElementById("score");
	// document.querySelector("#score");
	$("#score");
	let endTime = performance.now();
	totalTime += endTime - startTime;
}
console.log(totalTime / 100);
