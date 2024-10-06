document.addEventListener("DOMContentLoaded", function () {
    const ctaButton = document.getElementById("cta-button");
    const contactForm = document.getElementById("contact-form");

    ctaButton.addEventListener("click", function () {
        alert("¡Has hecho clic en el botón!");
    });

    contactForm.addEventListener("submit", function (event) {
        event.preventDefault();
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const message = document.getElementById("message").value;

        alert(`Gracias por tu mensaje, ${name}! Nos pondremos en contacto contigo en ${email}.`);
    });
});