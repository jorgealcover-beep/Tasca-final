
document.getElementById("Categories").addEventListener("submit", function(event) {
    const nom = document.getElementById("novaCategoria").value;
    const color = document.getElementById("colorCategoria").value;
    if (nom === "") {
        event.preventDefault();
        alert("El nom de la categoria no pot estar buit.");
        return;
    }else {
        alert("Categoria afegida correctament.");
    }
    const categoria = {
        nom: nom,
        color: color};
    let categories = JSON.parse(localStorage.getItem("categories")) || [];
    categories.push(categoria);
    localStorage.setItem("categories", JSON.stringify(categories));
    });