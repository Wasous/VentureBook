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
            progressBar.style.transition = 'width 8s cubic-bezier(0.42, 0, 0.58, 1)';
            progressBar.style.width = '100%';
        }, 10);
    }

    function startCarousel() {
        interval = setInterval(showNextItem, 8000);
        progressPaused = false;
        progressBar.style.transition = `width ${8 - (progressBarWidth / 100) * 8}s cubic-bezier(0.42, 0, 0.58, 1)`;
        progressBar.style.width = `${100 - progressBarWidth}%`;
    }

    function stopCarousel() {
        clearInterval(interval);
        progressPaused = true;
        const computedStyle = window.getComputedStyle(progressBar);
        progressBarWidth = parseFloat(computedStyle.width) / progressBar.parentElement.clientWidth * 100;
        progressBar.style.transition = 'none';
        progressBar.style.width = `${progressBarWidth}%`;
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
        item.addEventListener("mouseleave", startCarousel);
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