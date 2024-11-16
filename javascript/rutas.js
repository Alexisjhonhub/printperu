document.addEventListener("DOMContentLoaded", () => {
    const categories = document.querySelectorAll(".category");

    const routes = [
        "views/impresiones.html",       
        "views/impresion_digital.html",
        "views/impresion_textil.html",
        "views/ayuda.html",
        "views/personalizados.html",
        "views/moldes_3d.html"
    ];

    categories.forEach((category, index) => {
        category.addEventListener("click", () => {
            // Redirige al usuario a la vista correspondiente
            window.location.href = routes[index];
        });
    });
});