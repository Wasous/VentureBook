document.addEventListener("DOMContentLoaded", function () {
    const ctaButton = document.getElementById("cta-button");
    const contactForm = document.getElementById("contact-form");
    let currentIndex = 0;
    const carouselItems = document.querySelectorAll(".carousel-item");
    const progressBar = document.getElementById("progress-bar");
    const prevBtn = document.getElementById("prev-btn");
    const nextBtn = document.getElementById("next-btn");
    let interval;
    let progressPaused = false;
    let progressBarWidth = 0;
    let startTime;

    function showNextItem() {
        currentIndex = (currentIndex + 1) % carouselItems.length;
        updateCarousel();
    }

    function showPrevItem() {
        currentIndex = (currentIndex - 1 + carouselItems.length) % carouselItems.length;
        updateCarousel();
    }

    function updateCarousel() {
        carouselItems.forEach((item, index) => {
            item.style.transform = `translateX(-${currentIndex * 100}%)`;
            item.style.transition = 'transform 1s cubic-bezier(0.42, 0, 0.58, 1)';
        });
        resetProgressBar();
    }

    function resetProgressBar() {
        progressBar.style.transition = 'none';
        progressBarWidth = 0;
        progressBar.style.width = '0';
        setTimeout(() => {
            progressBar.style.transition = 'width 8s linear';
            progressBar.style.width = '100%';
            startTime = Date.now();
        }, 10);
    }

    function startCarousel() {
        interval = setInterval(() => {
            if (!progressPaused) {
                showNextItem();
            }
        }, 8000);
        progressPaused = false;
        startTime = Date.now() - (progressBarWidth / 100) * 8000;
        requestAnimationFrame(updateProgressBar);
    }

    function stopCarousel() {
        progressPaused = true;
        const elapsedTime = Date.now() - startTime;
        progressBarWidth = (elapsedTime / 8000) * 100;
        progressBar.style.transition = 'none';
        progressBar.style.width = `${progressBarWidth}%`;
    }

    function updateProgressBar() {
        if (!progressPaused) {
            const elapsedTime = Date.now() - startTime;
            progressBarWidth = (elapsedTime / 8000) * 100;
            progressBar.style.width = `${progressBarWidth}%`;
            if (progressBarWidth < 100) {
                requestAnimationFrame(updateProgressBar);
            }
        }
    }

    nextBtn.addEventListener("click", () => {
        stopCarousel();
        showNextItem();
        startCarousel();
    });

    prevBtn.addEventListener("click", () => {
        stopCarousel();
        showPrevItem();
        startCarousel();
    });

    carouselItems.forEach((item) => {
        item.addEventListener("mouseenter", stopCarousel);
        item.addEventListener("mouseleave", () => {
            progressPaused = false;
            startTime = Date.now() - (progressBarWidth / 100) * 8000;
            requestAnimationFrame(updateProgressBar);
        });
    });

    startCarousel();

    ctaButton.addEventListener("click", function () {
        alert("¡Gracias por tu interés! Pronto nos pondremos en contacto para agendar tu consulta.");
    });

    contactForm.addEventListener("submit", function (event) {
        event.preventDefault();
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const subject = document.getElementById("subject").value;
        const message = document.getElementById("message").value;

        alert(`Gracias por tu mensaje, ${name}. Nos pondremos en contacto contigo en ${email} sobre el asunto: ${subject}.`);
    });
});