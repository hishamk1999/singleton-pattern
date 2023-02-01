import singletonCounter from "./counter.js";

// Target Elements in the DOM
const redBtn = document.querySelector(".redBtn"),
	blueBtn = document.querySelector(".blueBtn"),
	count = document.querySelector(".count");


redBtn.addEventListener("click", () => {
	singletonCounter.increment();
	count.textContent = singletonCounter.getCount();
});

blueBtn.addEventListener("click", () => {
	singletonCounter.increment();
	count.textContent = singletonCounter.getCount();
});
