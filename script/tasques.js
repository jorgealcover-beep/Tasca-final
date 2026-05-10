
function carregarCategories() {
    const categories = JSON.parse(localStorage.getItem("categories")) || [];
    const categoriaSelect = document.getElementById("categoriaTasca");
    categoriaSelect.innerHTML = "";
    categories.forEach(function(categoria) {
        const option = document.createElement("option");
        option.value = categoria.nom;
        option.textContent = categoria.nom;
        categoriaSelect.appendChild(option);
    });
}



document.getElementById("crearTasca").addEventListener("submit", function(event) {
    const titol = document.getElementById("titolTasca").value;
    const descripcio = document.getElementById("descripcioTasca").value;
    const categoria = document.getElementById("categoriaTasca").value;
    const prioritat = document.getElementById("prioritatTasca").value;
    const dataCreacio = document.getElementById("dataTasca").value;
    if (titol === "" || descripcio === "" || categoria === "" || prioritat === "" || dataCreacio === "") {
        event.preventDefault();
        alert("Tots els camps són obligatoris!");
    } else {
        alert("Tasca creada correctament.");
    }
    const tasca = {
        titol: titol,
        descripcio: descripcio,
        categoria: categoria,
        prioritat: prioritat,
        dataCreacio: dataCreacio
    };
    let tasques = JSON.parse(localStorage.getItem("tasques")) || [];
    tasques.push(tasca);
    localStorage.setItem("tasques", JSON.stringify(tasques));
});

carregarCategories();