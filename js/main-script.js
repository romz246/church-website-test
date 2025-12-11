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

// Dark Mode Toggle

function darkModeToggle() {
	const toggleBtn = document.getElementById("theme-toggle");

	// Toggle theme on click
	toggleBtn.addEventListener("click", () => {
		const current = document.documentElement.getAttribute("data-theme");
		const newTheme = current === "dark" ? "light" : "dark";
		document.documentElement.setAttribute("data-theme", newTheme);
		localStorage.setItem("theme", newTheme);
	});

	// Auto update if system preference changes (no user override)
	window
		.matchMedia("(prefers-color-scheme: dark)")
		.addEventListener("change", () => {
			if (!localStorage.getItem("theme")) {
				const systemDark = window.matchMedia(
					"(prefers-color-scheme: dark)",
				).matches;
				document.documentElement.setAttribute(
					"data-theme",
					systemDark ? "dark" : "light",
				);
			}
		});
}

darkModeToggle();

function hamburgerMneu() {
	const hamburgerMenuBtn = document.getElementById("hamburger-menu-btn");

	const navLinks = document.getElementById("nav-links");

	hamburgerMenuBtn.addEventListener("click", () => {
		const currentState = hamburgerMenuBtn.getAttribute("data-state");

		if (!currentState || currentState === "closed") {
			hamburgerMenuBtn.setAttribute("data-state", "opened");
			hamburgerMenuBtn.setAttribute("aria-expanded", "true");
			navLinks.classList.toggle("open");
		} else {
			hamburgerMenuBtn.setAttribute("data-state", "closed");
			hamburgerMenuBtn.setAttribute("aria-expanded", "false");
			navLinks.classList.remove("open");
		}
	});
}

hamburgerMneu();

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
