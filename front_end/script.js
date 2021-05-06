function afficheProduit (){
    fetch("http://localhost:3000/api/teddies")
    .then(response => response.json())
    .then(data => {
        for (const teddy of data){
            document.getElementById("listeProduit").innerHTML += `
            <div class="col-12 my-5">
                <div class="card w-50 mx-auto">
                    <a href="./html/fiche_produit.html?${teddy._id}" class="stretched-link"><img class="w-100 photo" src="${teddy.imageUrl}" alt="Peluche_Norbert"></a>
                    <div class="card-body">
                        <p> Nom : ${teddy.name}</p>
                        <p> Prix : ${teddy.price}€ </p>
                        <p> Description : "${teddy.description}"</p>
                    </div>
                </div>
            </div> 
            `
            
        }
    })
}


function afficheDetailProduit(){
    let url = window.location.href;
    let tId = url.split("?");
    let id = tId[1];
    fetch(`http://localhost:3000/api/teddies/${id}`)
        .then(response => response.json())
        .then(data2 => {
            document.getElementById('image').innerHTML += `<img class="w-100" id="image" src="${data2.imageUrl}" alt="Peluche_Norbert">`
            document.getElementById('produitPanier').innerHTML += `<td id="id">${data2._id}</td>`
            document.getElementById('name').innerHTML += `<td id="name">${data2.name}</td>`
            document.getElementById('price').innerHTML += `<td id="price">${data2.price}€</td>`
            document.getElementById('description').innerHTML += `<td id="description">${data2.description}</td>`
            for (let choix = 0; choix < data2.colors.length; choix++) {
                let element = data2.colors[choix];
                document.getElementById("choix").innerHTML += `<option value="${element}" id="color">${element}</option>`       
            }      
        })   
}


function ajoutProduitPanier() {
    let url = window.location.href;
    let tId = url.split("?");
    let id = tId[1];
    let quantite = localStorage.getItem(id);
    quantite++;
    console.log(quantite);
    localStorage.setItem(id, quantite);
    window.alert("Le produit a été ajouté à votre panier");        
}

function affichePanier(){
    let totalPanier = document.getElementById("prixTotal");
    totalPanier.innerHTML = 0;
    for (let i = 0; i < localStorage.length; i++) {
        let idProduit = localStorage.key(i);
        let quantite = localStorage.getItem(idProduit);
        fetch(`http://localhost:3000/api/teddies/${idProduit}`)
            .then(response3 => response3.json())
            .then(data3 =>{
                document.getElementById("listeProduitPanier").innerHTML += `
                <tr>
                    <td><strong class="ref">${quantite}</strong></td>
                    <td>${data3.name}</td>
                    <td>${quantite*data3.price}€</td>
                    <td><button type="button" onclick="supprimePanier('${idProduit}')">Supprimer</button></td>
                </tr>`
                totalPanier.innerHTML = +totalPanier.innerHTML + quantite*data3.price
            })
        }
}

function supprimePanier(id){
    localStorage.removeItem(id);
    window.location.reload();
    
}

fetch()







    

    