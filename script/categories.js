
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


function carregarCategories() {
    const categories = JSON.parse(localStorage.getItem("categories")) || [];
    const categoriesList = document.getElementById("MostrarCategories");
    categoriesList.innerHTML = "";
    categories.forEach(function(categoria) {
        const div = document.createElement("div");
        const li = document.createElement("li");
        const deleteButton = document.createElement("button");
        div.style.backgroundColor = categoria.color;
        div.style.borderRadius = "10px";
        div.style.width = "10px";
        div.style.height = "10px";
        
        deleteButton.textContent = "Eliminar";
        deleteButton.classList.add("deleteButton");
        deleteButton.addEventListener("click", function() {
            categories.splice(categories.indexOf(categoria), 1);
            localStorage.setItem("categories", JSON.stringify(categories));
            carregarCategories();
        });
        li.appendChild(div);
        li.appendChild(document.createTextNode(categoria.nom));
        li.appendChild(deleteButton);
        categoriesList.appendChild(li);
    });
}
carregarCategories();