// Add your javascript here

const stickyClasses = ["fixed", "h-14"];
const unstickyClasses = ["absolute", "h-20"];
const stickyClassesContainer = [
	"border-neutral-300/50",
	"bg-white/80",
	"dark:border-neutral-600/40",
	"dark:bg-neutral-900/60",
	"backdrop-blur-2xl",
];
const unstickyClassesContainer = ["border-transparent"];
let headerElement = null;

document.addEventListener("DOMContentLoaded", () => {
	headerElement = document.getElementById("header");

	if (document.documentElement.classList.contains("dark")) {
		showNight();
	} else {
		showDay();
	}
	stickyHeaderFuncionality();
	applyMenuItemClasses();
	evaluateHeaderPosition();
	mobileMenuFunctionality();
});

window.stickyHeaderFuncionality = () => {
	window.addEventListener("scroll", () => {
		evaluateHeaderPosition();
	});
};

window.evaluateHeaderPosition = () => {
	if (window.scrollY > 16) {
		headerElement.firstElementChild.classList.add(...stickyClassesContainer);
		headerElement.firstElementChild.classList.remove(
			...unstickyClassesContainer,
		);
		headerElement.classList.add(...stickyClasses);
		headerElement.classList.remove(...unstickyClasses);
		document.getElementById("menu").classList.add("top-[56px]");
		document.getElementById("menu").classList.remove("top-[75px]");
	} else {
		headerElement.firstElementChild.classList.remove(...stickyClassesContainer);
		headerElement.firstElementChild.classList.add(...unstickyClassesContainer);
		headerElement.classList.add(...unstickyClasses);
		headerElement.classList.remove(...stickyClasses);
		document.getElementById("menu").classList.remove("top-[56px]");
		document.getElementById("menu").classList.add("top-[75px]");
	}
};

document.getElementById("darkToggle").addEventListener("click", () => {
	document.documentElement.classList.add("duration-300");

	if (document.documentElement.classList.contains("dark")) {
		localStorage.setItem("dark_mode", "false");
		showDay(true);
	} else {
		localStorage.setItem("dark_mode", "true");
		showNight(true);
	}
});

function showDay(animate) {
	document.getElementById("sun").classList.remove("setting");
	document.getElementById("moon").classList.remove("rising");

	let timeout = 0;

	if (animate) {
		timeout = 500;

		document.getElementById("moon").classList.add("setting");
	}

	setTimeout(() => {
		document.getElementById("dayText").classList.remove("hidden");
		document.getElementById("nightText").classList.add("hidden");

		document.getElementById("moon").classList.add("hidden");
		document.getElementById("sun").classList.remove("hidden");

		if (animate) {
			document.documentElement.classList.remove("dark");
			document.getElementById("sun").classList.add("rising");
		}

		const darkToggle = document.getElementById("darkToggle");
		darkToggle?.setAttribute("aria-pressed", "false");
		darkToggle?.setAttribute("aria-label", "Switch to dark mode");
	}, timeout);
}

function showNight(animate) {
	document.getElementById("moon").classList.remove("setting");
	document.getElementById("sun").classList.remove("rising");

	let timeout = 0;

	if (animate) {
		timeout = 500;

		document.getElementById("sun").classList.add("setting");
	}

	setTimeout(() => {
		document.getElementById("nightText").classList.remove("hidden");
		document.getElementById("dayText").classList.add("hidden");

		document.getElementById("sun").classList.add("hidden");
		document.getElementById("moon").classList.remove("hidden");

		if (animate) {
			document.documentElement.classList.add("dark");
			document.getElementById("moon").classList.add("rising");
		}

		const darkToggle = document.getElementById("darkToggle");
		darkToggle?.setAttribute("aria-pressed", "true");
		darkToggle?.setAttribute("aria-label", "Switch to light mode");
	}, timeout);
}

window.applyMenuItemClasses = () => {
	const menuItems = document.querySelectorAll("#menu a");
	const currentPath =
		window.location.pathname.replace(/\/+$/, "") || "/";

	for (let i = 0; i < menuItems.length; i++) {
		const linkPath = menuItems[i].pathname.replace(/\/+$/, "") || "/";

		if (linkPath === currentPath) {
			menuItems[i].classList.add("text-neutral-900", "dark:text-white");
			menuItems[i].setAttribute("aria-current", "page");
		} else {
			menuItems[i].removeAttribute("aria-current");
		}
	}
};

function mobileMenuFunctionality() {
	const openMenu = document.getElementById("openMenu");
	const closeMenu = document.getElementById("closeMenu");
	const mobileMenuBackground = document.getElementById(
		"mobileMenuBackground",
	);

	openMenu.addEventListener("click", () => {
		openMobileMenu();
	});

	closeMenu.addEventListener("click", () => {
		closeMobileMenu();
	});

	mobileMenuBackground.addEventListener("click", () => {
		closeMobileMenu();
	});

	document.addEventListener("keydown", (event) => {
		if (
			event.key === "Escape" &&
			!mobileMenuBackground.classList.contains("hidden")
		) {
			closeMobileMenu();
		}
	});
}

window.openMobileMenu = () => {
	const openMenu = document.getElementById("openMenu");
	const closeMenu = document.getElementById("closeMenu");

	openMenu.classList.add("hidden");
	openMenu.setAttribute("aria-expanded", "true");
	closeMenu.classList.remove("hidden");
	closeMenu.setAttribute("aria-expanded", "true");
	document.getElementById("menu").classList.remove("hidden");
	document.getElementById("mobileMenuBackground").classList.add("opacity-0");
	document.getElementById("mobileMenuBackground").classList.remove("hidden");
	closeMenu.focus();

	setTimeout(() => {
		document
			.getElementById("mobileMenuBackground")
			.classList.remove("opacity-0");
	}, 1);
};

window.closeMobileMenu = () => {
	const openMenu = document.getElementById("openMenu");
	const closeMenu = document.getElementById("closeMenu");

	closeMenu.classList.add("hidden");
	closeMenu.setAttribute("aria-expanded", "false");
	openMenu.classList.remove("hidden");
	openMenu.setAttribute("aria-expanded", "false");
	document.getElementById("menu").classList.add("hidden");
	document.getElementById("mobileMenuBackground").classList.add("hidden");
	openMenu.focus();
};
