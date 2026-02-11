// No Small Dots On The Last Slide

function initSlideshow({
	selector = ".slideshow",
	images = [],
	intervalTime = 5000,
	steps = 3, // number of small dots between slides
}) {
	const slideshow = document.querySelector(selector);
	const slidesContainer = slideshow.querySelector(".slides");
	const dotsContainer = slideshow.querySelector(".dots");
	const nextBtn = slideshow.querySelector(".arrow.right");
	const prevBtn = slideshow.querySelector(".arrow.left");

	let currentIndex = 0;
	let startX = 0;
	let timer;
	let stepInterval;
	let stepIndex = 0;
	let dotSequence = [];

	/* ---------- BUILD SLIDES ---------- */
	images.forEach((src) => {
		const slide = document.createElement("div");
		slide.className = "slide";
		slide.innerHTML = `<img src="${src}" alt="">`;
		slidesContainer.appendChild(slide);
	});

	const slides = slidesContainer.querySelectorAll(".slide");
	const total = slides.length;

	/* ---------- BUILD DOT SEQUENCE ---------- */
	images.forEach((_, i) => {
		// Big dot
		const bigDot = document.createElement("div");
		bigDot.className = "dot";
		bigDot.onclick = () => goTo(i);
		dotsContainer.appendChild(bigDot);
		dotSequence.push({ type: "big", element: bigDot, slideIndex: i });

		// Add small dots ONLY if not the last image
		if (i < images.length - 1) {
			for (let s = 0; s < steps; s++) {
				const smallDot = document.createElement("div");
				smallDot.className = "small-dot";
				dotsContainer.appendChild(smallDot);
				dotSequence.push({ type: "small", element: smallDot, slideIndex: i });
			}
		}
	});

	/* ---------- UPDATE SLIDES ---------- */
	function updateSlides() {
		slidesContainer.style.transform = `translateX(${-currentIndex * 100}%)`;

		// Highlight the current big dot
		dotSequence.forEach((dot) => {
			if (dot.type === "big") {
				dot.element.classList.toggle("active", dot.slideIndex === currentIndex);
			}
			if (dot.type === "small") {
				dot.element.style.backgroundColor = "rgba(255,255,255,0.3)";
			}
		});

		resetStepDots();
	}

	/* ---------- NAVIGATION ---------- */
	function goTo(index) {
		currentIndex = (index + total) % total;
		updateSlides();
		resetTimer();
	}

	function next() {
		goTo(currentIndex + 1);
	}

	function prev() {
		goTo(currentIndex - 1);
	}

	/* ---------- FILL SMALL DOTS SEQUENTIALLY ---------- */
	function resetStepDots() {
		clearInterval(stepInterval);
		stepIndex = 0;

		// Small dots for the current slide
		const currentDots = dotSequence.filter(
			(dot) => dot.slideIndex === currentIndex && dot.type === "small",
		);
		const stepTime = intervalTime / (currentDots.length + 1);

		if (currentDots.length === 0) return; // no small dots (last slide)

		stepInterval = setInterval(() => {
			currentDots.forEach((dot, i) => {
				dot.element.style.backgroundColor =
					i === stepIndex ? "#c2a14a" : "rgba(255,255,255,0.3)";
			});
			stepIndex++;
			if (stepIndex >= currentDots.length) stepIndex = 0;
		}, stepTime);
	}

	function resetTimer() {
		clearTimeout(timer);
		resetStepDots();
		timer = setTimeout(next, intervalTime);
	}

	/* ---------- BUTTON EVENTS ---------- */
	nextBtn.onclick = next;
	prevBtn.onclick = prev;

	/* ---------- TOUCH EVENTS ---------- */
	slidesContainer.addEventListener(
		"touchstart",
		(e) => (startX = e.touches[0].clientX),
	);
	slidesContainer.addEventListener("touchend", (e) => {
		const diff = startX - e.changedTouches[0].clientX;
		if (diff > 50) next();
		if (diff < -50) prev();
	});

	/* ---------- INIT ---------- */
	updateSlides();
	resetTimer();
}

/* ---------- USAGE EXAMPLE ---------- */
initSlideshow({
	images: [
		"https://images.unsplash.com/photo-1472905981516-5ac09f35b7f4?q=80&w=1474&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",

		"https://images.unsplash.com/photo-1552592570-8e98dd7d2ccf?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",

		"https://images.unsplash.com/photo-1517373062-f3b2f3f98ada?q=80&w=1373&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",

		"https://images.unsplash.com/photo-1499209974431-9dddcece7f88?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
	],
	intervalTime: 5000,
	steps: 3,
});

//

//

//

//

// Include Smaller Dots For The Last Slide

// function initSlideshow({
// 	selector = ".slideshow",
// 	images = [],
// 	intervalTime = 5000,
// 	steps = 3, // number of small dots between slides
// 	includeLastSlideDots = true, // toggle for last slide small dots
// }) {
// 	const slideshow = document.querySelector(selector);
// 	const slidesContainer = slideshow.querySelector(".slides");
// 	const dotsContainer = slideshow.querySelector(".dots");
// 	const nextBtn = slideshow.querySelector(".arrow.right");
// 	const prevBtn = slideshow.querySelector(".arrow.left");

// 	let currentIndex = 0;
// 	let startX = 0;
// 	let timer;
// 	let stepInterval;
// 	let stepIndex = 0;
// 	let dotSequence = [];

// 	/* ---------- BUILD SLIDES ---------- */
// 	images.forEach((src) => {
// 		const slide = document.createElement("div");
// 		slide.className = "slide";
// 		slide.innerHTML = `<img src="${src}" alt="">`;
// 		slidesContainer.appendChild(slide);
// 	});

// 	const slides = slidesContainer.querySelectorAll(".slide");
// 	const total = slides.length;

// 	/* ---------- BUILD DOT SEQUENCE ---------- */
// 	images.forEach((_, i) => {
// 		// Big dot
// 		const bigDot = document.createElement("div");
// 		bigDot.className = "dot";
// 		bigDot.onclick = () => goTo(i);
// 		dotsContainer.appendChild(bigDot);
// 		dotSequence.push({ type: "big", element: bigDot, slideIndex: i });

// 		// Add small dots after this big dot
// 		// Include for last slide only if includeLastSlideDots is true
// 		if (i < images.length - 1 || includeLastSlideDots) {
// 			for (let s = 0; s < steps; s++) {
// 				const smallDot = document.createElement("div");
// 				smallDot.className = "small-dot";
// 				dotsContainer.appendChild(smallDot);
// 				dotSequence.push({ type: "small", element: smallDot, slideIndex: i });
// 			}
// 		}
// 	});

// 	/* ---------- UPDATE SLIDES ---------- */
// 	function updateSlides() {
// 		slidesContainer.style.transform = `translateX(${-currentIndex * 100}%)`;

// 		// Highlight the current big dot
// 		dotSequence.forEach((dot) => {
// 			if (dot.type === "big") {
// 				dot.element.classList.toggle("active", dot.slideIndex === currentIndex);
// 			}
// 			if (dot.type === "small") {
// 				dot.element.style.backgroundColor = "rgba(255,255,255,0.3)";
// 			}
// 		});

// 		resetStepDots();
// 	}

// 	/* ---------- NAVIGATION ---------- */
// 	function goTo(index) {
// 		currentIndex = (index + total) % total;
// 		updateSlides();
// 		resetTimer();
// 	}

// 	function next() {
// 		goTo(currentIndex + 1);
// 	}

// 	function prev() {
// 		goTo(currentIndex - 1);
// 	}

// 	/* ---------- FILL SMALL DOTS SEQUENTIALLY ---------- */
// 	function resetStepDots() {
// 		clearInterval(stepInterval);
// 		stepIndex = 0;

// 		const currentDots = dotSequence.filter(
// 			(dot) => dot.slideIndex === currentIndex && dot.type === "small",
// 		);
// 		if (currentDots.length === 0) return;

// 		const stepTime = intervalTime / (currentDots.length + 1);

// 		stepInterval = setInterval(() => {
// 			currentDots.forEach((dot, i) => {
// 				dot.element.style.backgroundColor =
// 					i === stepIndex ? "#c2a14a" : "rgba(255,255,255,0.3)";
// 			});
// 			stepIndex++;
// 			if (stepIndex >= currentDots.length) stepIndex = 0;
// 		}, stepTime);
// 	}

// 	function resetTimer() {
// 		clearTimeout(timer);
// 		resetStepDots();
// 		timer = setTimeout(next, intervalTime);
// 	}

// 	/* ---------- BUTTON EVENTS ---------- */
// 	nextBtn.onclick = next;
// 	prevBtn.onclick = prev;

// 	/* ---------- TOUCH EVENTS ---------- */
// 	slidesContainer.addEventListener(
// 		"touchstart",
// 		(e) => (startX = e.touches[0].clientX),
// 	);
// 	slidesContainer.addEventListener("touchend", (e) => {
// 		const diff = startX - e.changedTouches[0].clientX;
// 		if (diff > 50) next();
// 		if (diff < -50) prev();
// 	});

// 	/* ---------- INIT ---------- */
// 	updateSlides();
// 	resetTimer();
// }

// /* ---------- USAGE EXAMPLE ---------- */
// initSlideshow({
// 	images: [
// 		"https://picsum.photos/id/1015/1200/600",
// 		"https://picsum.photos/id/1016/1200/600",
// 		"https://picsum.photos/id/1024/1200/600",
// 		"https://picsum.photos/id/1035/1200/600",
// 	],
// 	intervalTime: 5000,
// 	steps: 3,
// 	includeLastSlideDots: true, // change to false to remove last slide dots
// });
