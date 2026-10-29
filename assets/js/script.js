// BuildFlow Support shared interactions
document.addEventListener("DOMContentLoaded", () => {
    // Smooth-scroll only for valid in-page targets; preserve normal link behavior otherwise.
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener("click", (event) => {
            const selector = anchor.getAttribute("href");
            if (!selector || selector === "#") return;
            const target = document.querySelector(selector);
            if (!target) return;
            event.preventDefault();
            target.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
        });
    });

    // Theme toggle: the site starts in dark mode and can switch to a readable light theme.
    const themeToggle = document.getElementById("theme-toggle");
    if (themeToggle) {
        const syncThemeButton = () => {
            const light = document.body.classList.contains("light-mode");
            themeToggle.textContent = light ? "🌙 Dark Mode" : "☀️ Light Mode";
            themeToggle.setAttribute("aria-pressed", String(light));
            themeToggle.setAttribute("aria-label", light ? "Switch to dark mode" : "Switch to light mode");
        };
        syncThemeButton();
        themeToggle.addEventListener("click", () => {
            document.body.classList.toggle("light-mode");
            syncThemeButton();
        });
    }

    const topBtn = document.getElementById("topBtn");
    const updateTopButton = () => {
        if (topBtn) topBtn.style.display = window.scrollY > 300 ? "block" : "none";
    };
    window.addEventListener("scroll", updateTopButton, { passive: true });
    updateTopButton();
    if (topBtn) topBtn.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
    });

    // Savings calculator: use text nodes rather than injecting HTML.
    const calculator = document.querySelector("[data-savings-calculator]");
    if (calculator) {
        const calculate = () => {
            const read = (id) => Math.max(0, Number.parseFloat(document.getElementById(id)?.value) || 0);
            const hours = read("hours");
            const wage = read("wage");
            const automation = Math.min(100, read("automation"));
            const weekly = hours * wage * (automation / 100);
            const result = document.getElementById("result");
            if (!result) return;
            result.replaceChildren();
            const heading = document.createElement("h3");
            heading.textContent = "Estimated Savings";
            const week = document.createElement("p");
            week.textContent = "Weekly: $" + weekly.toFixed(2);
            const year = document.createElement("p");
            year.textContent = "Yearly: $" + (weekly * 52).toFixed(2);
            result.append(heading, week, year);
        };
        const button = calculator.querySelector("[data-calculate-savings]");
        if (button) button.addEventListener("click", calculate);
    }
});


// Keep the calculator's existing inline button compatible.
window.calculateSavings = function () {
    const read = (id) => Math.max(0, Number.parseFloat(document.getElementById(id)?.value) || 0);
    const hours = read("hours");
    const wage = read("wage");
    const automation = Math.min(100, read("automation"));
    const weekly = hours * wage * (automation / 100);
    const result = document.getElementById("result");
    if (!result) return;
    result.replaceChildren();
    const heading = document.createElement("h3");
    heading.textContent = "Estimated Savings";
    const week = document.createElement("p");
    week.textContent = "Weekly: $" + weekly.toFixed(2);
    const year = document.createElement("p");
    year.textContent = "Yearly: $" + (weekly * 52).toFixed(2);
    result.append(heading, week, year);
};
