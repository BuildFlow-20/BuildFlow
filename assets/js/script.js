// =======================================
// BuildFlow Support JavaScript
// =======================================

document.addEventListener("DOMContentLoaded", () => {

    console.log("BuildFlow Support Loaded");

    // Smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {

        anchor.addEventListener("click", function (e) {

            e.preventDefault();

            const target = document.querySelector(this.getAttribute("href"));

            if (target) {

                target.scrollIntoView({
                    behavior: "smooth"
                });

            }

        });

    });

    // Button animation
    document.querySelectorAll(".btn-primary, .btn-secondary").forEach(button => {

        button.addEventListener("mouseenter", () => {
            button.style.transform = "scale(1.05)";
        });

        button.addEventListener("mouseleave", () => {
            button.style.transform = "scale(1)";
        });

    });

});

// =======================================
// Current Year
// =======================================

const year = new Date().getFullYear();

document.querySelectorAll(".current-year").forEach(item => {
    item.textContent = year;
});
function calculateSavings() {
    const hours = parseFloat(document.getElementById("hours").value) || 0;
    const wage = parseFloat(document.getElementById("wage").value) || 0;
    const automation = parseFloat(document.getElementById("automation").value) || 0;

    const weeklySavings = hours * wage * (automation / 100);
    const yearlySavings = weeklySavings * 52;

    document.getElementById("result").innerHTML =
        "<h3>Estimated Savings</h3>" +
        "<p><strong>Weekly:</strong> $" + weeklySavings.toFixed(2) + "</p>" +
        "<p><strong>Yearly:</strong> $" + yearlySavings.toFixed(2) + "</p>";
}
const themeToggle = document.getElementById("theme-toggle");

if (themeToggle) {
    themeToggle.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
    });
}
const topBtn = document.getElementById("topBtn");

window.onscroll = function () {
    if (!topBtn) return;

    if (
        document.body.scrollTop > 300 ||
        document.documentElement.scrollTop > 300
    ) {
        topBtn.style.display = "block";
    } else {
        topBtn.style.display = "none";
    }
};

if (topBtn) {
    topBtn.onclick = function () {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };
}
