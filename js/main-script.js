// Automatically hightlights the current page

function currentPgHighlight() {
	document.addEventListener("DOMContentLoaded", () => {
		const navLinks = document.querySelectorAll(".nav-links li a");

		// Normalize the current URL (remove query strings & hashes)
		const current = window.location.href.split(/[?#]/)[0];

		navLinks.forEach((link) => {
			link.removeAttribute("aria-current");

			// Normalize link href in the exact same way
			const linkURL = link.href.split(/[?#]/)[0];

			// Direct comparison of fully-resolved absolute URLs
			if (
				linkURL === current ||
				(current.endsWith("/") && linkURL.endsWith("/index.html"))
			) {
				link.setAttribute("aria-current", "page");
			}
		});
	});
}

currentPgHighlight();

// // Dark Mode Toggle

// function darkModeToggle() {
// 	const toggleBtn = document.getElementById("theme-toggle");

// 	// Toggle theme on click
// 	toggleBtn.addEventListener("click", () => {
// 		const current = document.documentElement.getAttribute("data-theme");
// 		const newTheme = current === "dark" ? "light" : "dark";
// 		document.documentElement.setAttribute("data-theme", newTheme);
// 		localStorage.setItem("theme", newTheme);
// 	});

// 	// Auto update if system preference changes (no user override)
// 	window
// 		.matchMedia("(prefers-color-scheme: dark)")
// 		.addEventListener("change", () => {
// 			if (!localStorage.getItem("theme")) {
// 				const systemDark = window.matchMedia(
// 					"(prefers-color-scheme: dark)",
// 				).matches;
// 				document.documentElement.setAttribute(
// 					"data-theme",
// 					systemDark ? "dark" : "light",
// 				);
// 			}
// 		});
// }

// darkModeToggle();

// function hamburgerMneu() {
// 	const hamburgerMenuBtn = document.getElementById("hamburger-menu-btn");

// 	const navLinks = document.getElementById("nav-links");

// 	hamburgerMenuBtn.addEventListener("click", () => {
// 		const currentState = hamburgerMenuBtn.getAttribute("data-state");

// 		if (!currentState || currentState === "closed") {
// 			hamburgerMenuBtn.setAttribute("data-state", "opened");
// 			hamburgerMenuBtn.setAttribute("aria-expanded", "true");
// 			navLinks.classList.toggle("open");
// 		} else {
// 			hamburgerMenuBtn.setAttribute("data-state", "closed");
// 			hamburgerMenuBtn.setAttribute("aria-expanded", "false");
// 			navLinks.classList.remove("open");
// 		}
// 	});
// }

// hamburgerMneu();

function copyrightYear() {
	const yearSpan = document.getElementById("year");
	const startYear = 2025;

	// Set current text
	const currentYear = new Date().getFullYear();
	yearSpan.textContent =
		startYear === currentYear
			? `${startYear}`
			: `${startYear} - ${currentYear}`;

	// Calculate milliseconds until next year
	const present = new Date();
	const nextYear = new Date(currentYear + 1, 0, 1);
	const msUntilNextYear = nextYear - present;

	// Schedule update at midnight Jan 1
	setTimeout(() => {
		const newYear = new Date().getFullYear();
		yearSpan.textContent =
			startYear === newYear ? `${startYear}` : `${startYear} - ${newYear}`;
		// Schedule the next update recursively
		copyrightYear();
	}, msUntilNextYear);
}

copyrightYear();

//

function scrollToTop() {
	const scrollBtn = document.getElementById("scrollToTop");

	const doc = document.documentElement;

	const body = document.body;

	let isTicking = false;

	// Function to update the scroll progress and button visibility
	const updateScrollProgress = () => {
		// Use window.scrollY for better compatibility and scroll calculation
		const scrollTop = window.scrollY || document.documentElement.scrollTop;
		// Get the total height of the page and the viewport
		const scrollHeight =
			Math.max(
				body.scrollHeight,
				doc.scrollHeight,
				body.offsetHeight,
				doc.offsetHeight,
				doc.clientHeight,
			) - window.innerHeight; // Total scrollable height minus the viewport height

		// Calculate the scroll progress as a percentage
		let progress = scrollHeight === 0 ? 0 : (scrollTop / scrollHeight) * 100;

		// Force progress to 100% when it's very close to the bottom
		if (progress > 99.99) {
			progress = 100;
		}

		// Round the progress to the nearest integer
		progress = Math.round(progress);

		// Toggle the button visibility (only show if scrolled > 100px)
		scrollBtn.classList.toggle("show", scrollTop > 500);

		// Update the custom CSS property for the progress (this updates the progress bar)
		scrollBtn.style.setProperty("--progress", `${progress}%`);

		// Reset the ticking flag
		isTicking = false;
	};

	// Scroll event handler with requestAnimationFrame for better performance
	const handleScroll = () => {
		if (!isTicking) {
			requestAnimationFrame(updateScrollProgress);
			isTicking = true;
		}
	};

	// Smooth scroll to the top when the button is clicked
	const scrollToTopHandler = () => {
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	};

	// Attach event listeners
	scrollBtn.addEventListener("click", scrollToTopHandler);
	window.addEventListener("scroll", handleScroll);
	window.addEventListener("load", updateScrollProgress);
}

scrollToTop();
