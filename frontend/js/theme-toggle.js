document.addEventListener('DOMContentLoaded', () => {
    const themeToggleButton = document.getElementById('theme-toggle');
    themeToggleButton.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
        // Guardar el tema en localStorage para recordar la preferencia del usuario
        if (document.body.classList.contains('dark-theme')) {
            localStorage.setItem('theme', 'dark');
        } else {
            localStorage.setItem('theme', 'light');
        }
    });

    // Aplicar el tema guardado en localStorage al cargar la página
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
    }
});