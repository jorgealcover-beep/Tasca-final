function carregarTasques() {
    let tasques = JSON.parse(localStorage.getItem("tasques")) || [];
    const tasquesPendents = document.getElementById("tasquesPendents");
    tasquesPendents.innerHTML = "<h2>Tasques pendents</h2>";
    tasques.forEach(function(tasca) { 
    if (!tasca.realitzada) {
        const li = document.createElement("li");
        const completarButton = document.createElement("button");
        const eliminarButton = document.createElement("button");
        completarButton.textContent = "Completar";
        completarButton.classList.add("completarButton");
        eliminarButton.textContent = "Eliminar";
        eliminarButton.classList.add("eliminarButton");
        completarButton.addEventListener("click", function() {
            tasca.realitzada = true;
            localStorage.setItem("tasques", JSON.stringify(tasques));
            carregarTasques();
        });
        eliminarButton.addEventListener("click", function() {
            tasques.splice(tasques.indexOf(tasca), 1);
            localStorage.setItem("tasques", JSON.stringify(tasques));
            carregarTasques();
        });
        li.textContent = tasca.titol + " - " + tasca.categoria + " - " + tasca.prioritat + " - " + tasca.dataCreacio;
        li.appendChild(completarButton);
        li.appendChild(eliminarButton);
        tasquesPendents.appendChild(li);
    }});

    const tasquesAcabades = document.getElementById("tasquesAcabades");
    tasquesAcabades.innerHTML = "<h2>Tasques acabades</h2>";
    tasques.forEach(function(tasca) {
    if (tasca.realitzada) {
        const li = document.createElement("li");
        const eliminarButton = document.createElement("button");

        eliminarButton.textContent = "Eliminar";
        eliminarButton.classList.add("eliminarButton");
        eliminarButton.addEventListener("click", function() {
            tasques.splice(tasques.indexOf(tasca), 1);
            localStorage.setItem("tasques", JSON.stringify(tasques));
            carregarTasques();
        });
        li.textContent = tasca.titol + " - " + tasca.categoria + " - " + tasca.prioritat + " - " + tasca.dataCreacio;
        li.appendChild(eliminarButton);
        tasquesAcabades.appendChild(li);
    }
    });     
};

document.getElementById("fetchTasques").addEventListener("submit", async(event) => {
    event.preventDefault();
    const nomArxiu = document.getElementById("nomArxiu").value;
    if (nomArxiu === "") {
        event.preventDefault();
        alert("El nom del arxiu no pot estar buit.");
    }
    try {
        const resposta = await fetch(`dades/${nomArxiu}`);
        const tasquesImportades = await resposta.json();
        let tasques = JSON.parse(localStorage.getItem("tasques")) || [];
        tasques = tasques.concat(tasquesImportades);
        localStorage.setItem("tasques", JSON.stringify(tasques));
        carregarTasques();
        alert("Tasques importades correctament.");
    } catch (error) {
        alert("Error al importar les tasques: " + error.message);
    }
});

carregarTasques();