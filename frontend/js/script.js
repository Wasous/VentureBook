document.addEventListener("DOMContentLoaded", function () {
    const ctaButton = document.getElementById("cta-button");
    const contactForm = document.getElementById("contact-form");
    let currentIndex = 0;
    const carouselItems = document.querySelectorAll(".carousel-item");

    function showNextItem() {
        currentIndex = (currentIndex + 1) % carouselItems.length;
        carouselItems.forEach((item, index) => {
            item.style.transform = `translateX(-${currentIndex * 100}%)`;
        });
    }

    setInterval(showNextItem, 8000);

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