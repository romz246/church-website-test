function initSlideshow({
	selector = ".slideshow",
	images = [],
	intervalTime = 5000,
}) {
	const slideshow = document.querySelector(selector);
	const slidesContainer = slideshow.querySelector(".slides");
	const dotsContainer = slideshow.querySelector(".dots");
	const nextBtn = slideshow.querySelector(".arrow.right");
	const prevBtn = slideshow.querySelector(".arrow.left");

	let currentIndex = 1;
	let position = -100;
	let target = -100;
	let lastTime = 0;
	let startX = 0;

	/* ---------- BUILD SLIDES (WITH CLONES) ---------- */
	const sources = [images.at(-1), ...images, images[0]];

	sources.forEach((src) => {
		const slide = document.createElement("div");
		slide.className = "slide";
		slide.innerHTML = `<img src="${src}" alt="">`;
		slidesContainer.appendChild(slide);
	});

	/* ---------- DOTS ---------- */
	images.forEach((_, i) => {
		const dot = document.createElement("div");
		dot.className = "dot";
		dot.onclick = () => goTo(i + 1);
		dotsContainer.appendChild(dot);
	});

	const dots = dotsContainer.children;

	function updateDots() {
		[...dots].forEach((d, i) =>
			d.classList.toggle("active", i === currentIndex - 1),
		);
	}

	/* ---------- MOVEMENT ---------- */
	function goTo(index) {
		currentIndex = index;
		target = -currentIndex * 100;
		updateDots();
	}

	function next() {
		goTo(currentIndex + 1);
	}

	function prev() {
		goTo(currentIndex - 1);
	}

	function animate(time) {
		if (!lastTime) lastTime = time;
		const delta = time - lastTime;
		lastTime = time;

		position += (target - position) * Math.min(delta / 400, 1);
		slidesContainer.style.transform = `translateX(${position}%)`;

		// Snap cleanly after reaching clones
		if (Math.abs(target - position) < 0.05) {
			let snapped = false;

			if (currentIndex === sources.length - 1) {
				currentIndex = 1;
				position = target = -100;
				snapped = true;
			}

			if (currentIndex === 0) {
				currentIndex = sources.length - 2;
				position = target = -currentIndex * 100;
				snapped = true;
			}

			if (snapped) updateDots();
		}

		requestAnimationFrame(animate);
	}

	/* ---------- AUTOPLAY ---------- */
	setInterval(next, intervalTime);

	/* ---------- EVENTS ---------- */
	nextBtn.onclick = next;
	prevBtn.onclick = prev;

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
	updateDots();
	requestAnimationFrame(animate);
}

initSlideshow({
	images: [
		"https://picsum.photos/id/1015/1200/600",
		"https://picsum.photos/id/1016/1200/600",
		"https://picsum.photos/id/1024/1200/600",
		"https://picsum.photos/id/1035/1200/600",
	],
	intervalTime: 5000,
});
