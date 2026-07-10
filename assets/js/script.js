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

