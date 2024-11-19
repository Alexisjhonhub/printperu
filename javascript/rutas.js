document.addEventListener("DOMContentLoaded", () => {
    const categories = document.querySelectorAll(".category");

    const routes = [
        "views/impresiones.html",       
        "views/impresion_digital.html",
        "views/impresion_textil.html",
        "views/Diseño_grafico.html",
        "views/Merchandinsing.html",
        "views/Diseño_3D.html"
    ];

    categories.forEach((category, index) => {
        category.addEventListener("click", () => {
            window.location.href = routes[index];
        });
    });
});