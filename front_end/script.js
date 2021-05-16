// Fonction permettant l'affichage des fiches produit // 

function affichageProduit (){
    // Récuperation des informations produits via l'API // 
    fetch("http://localhost:3000/api/teddies")
    .then(response => response.json())
    .then(data => {
        for (const teddy of data){
            document.getElementById("listeProduit").innerHTML += `
            <div class="col-12 col-md-8 mx-auto px-auto my-5">
                <div class="card w-100 mx-auto">
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


// Fonction permettant l'affichage de la fiche produit choisi par le client // 

function affichageDetailProduit(){
    // Récupération de l'ID produit dans l'URL de la fiche produit //
    let url = window.location.href;
    let tId = url.split("?");
    let id = tId[1];
    // Récupération des informations du produit provenant de l'API grâce à l'ID //
    fetch(`http://localhost:3000/api/teddies/${id}`)
        .then(response => response.json())
        .then(data2 => {
            document.getElementById('image').innerHTML += `<img class="w-100 mx-auto" id="image" src="${data2.imageUrl}" alt="Peluche_Norbert">`
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

// Fonction permettant l'ajout de produit sélectionné par le client dans le panier // 

function ajoutProduitPanier() {
    // Récupération de l'ID produit dans l'URL de la fiche produit //
    let url = window.location.href;
    let tId = url.split("?");
    let id = tId[1];
    // Ajout de l'ID et la quantité dans le localStorage // 
    let quantite = localStorage.getItem(id);
    quantite++;
    localStorage.setItem(id, quantite);
    // Message de confirmation de la mise dans le panier // 
    window.alert("Le produit a été ajouté à votre panier");        
}

// Fonction permettant l'affichage du panier gràce au localStorage  // 

function affichagePanier(){
    let totalPanier = document.getElementById("prixTotal");
    totalPanier.innerHTML = 0;
    // Récupération de l'ID et de la quantité du localStorage // 
    for (let i = 0; i < localStorage.length; i++) {
        let idProduit = localStorage.key(i);
        let quantite = localStorage.getItem(idProduit);
        // Récuperation du nom et du prix dans l'API grâce à l'ID et création de la ligne du produit dans le panier et de la ligne du total prix// 
        fetch(`http://localhost:3000/api/teddies/${idProduit}`)
            .then(response3 => response3.json())
            .then(data3 =>{
                document.getElementById("listeProduitPanier").innerHTML += `
                <tr>
                    <td><strong class="ref" id="quantite">${quantite}</strong></td>
                    <td>${data3.name}</td>
                    <td>${quantite*data3.price}€</td>
                    <td><button type="button" onclick="suppressionPanier('${idProduit}')">Supprimer</button></td>
                </tr>`
                totalPanier.innerHTML = +totalPanier.innerHTML + quantite*data3.price
            })
        }
}

// Fonction permettant la création d'un array avec les ID des produits affichés dans le panier  // 

function commandePanier (){
    let tableauPanier = []
    for (let i = 0; i < localStorage.length; i++) {  
        let _id = localStorage.key(i);
        let id =_id + "/";
        let quantite = parseInt(localStorage[_id]);
        let produitIds = id.repeat(quantite);
        let arrayProduitId = produitIds.split("/");
        const supp = arrayProduitId.pop();
        for (const idProduit of arrayProduitId) {
            tableauPanier.push(idProduit);
            
        }
    }   
    return tableauPanier
}

// Fonction permettant la suppression d'une ligne produit du panier // 

function suppressionPanier(id){
    localStorage.removeItem(id);
    window.location.reload();
    
}


// Fonction permettant la validation du panier et le chargement d'une page de confirmation // 
function validationCommande(){ 
    
    let produitPanier = commandePanier(); // array correspondant au ID produit du panier // 
    let form = document.getElementById("form");
    let regExEmail = new RegExp ('^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$', 'g');// regex permettant de valider l'email rentrée par le client // 
    let regExAddress = new RegExp ('([0-9]*) ?([a-zA-Z,\. ])$');// regex permettant de valider l'adresse rentrée par le client // 
    let regExPrenomNomCity = new RegExp ('^[A-Za-z\é\è\É\È]\'?[- A-Za-z\é\è\ê\î\ï\ô\ö]+$', 'i');// regex permettant de valider le nom, le prénom ainsi que la ville rentrés par le client // 
    let regExPanier = new RegExp ('[a-z0-9,]')// regex permettant de valider que le panier n'est pas vide // 
    let validAddress = regExAddress.test(form.address.value) // test de validation des données rentrées par le client  par rapport à la regex Adress  // 
    let validPanier = regExPanier.test(produitPanier); // test de validation des données du panier par rapport à la regex Panier // 
    let validPrenom = regExPrenomNomCity.test(form.firstname.value); // test de validation des données rentrées par le client  par rapport à la regex pour le prénon, le nom et la ville //  
    let validEmail = regExEmail.test(form.email.value);  // test de validation des données rentrées par le client  par rapport à la regex Email //
    let validCity =  regExPrenomNomCity.test(form.city.value);  // test de validation des données rentrées par le client  par rapport à la regex pour le prénon, le nom et la ville //
    let validNom = regExPrenomNomCity.test(form.lastname.value);  // test de validation des données rentrées par le client  par rapport à la regex pour le prénon, le nom et la ville //

    if(validEmail == true && validPrenom == true && validNom == true && validCity == true && validPanier == true && validAddress == true){
        // Si tous les tests de regex sont true, création d'un objet client ppur pouvoir faire la requete POST et valider la commande // 
        let client = {
            contact: {
                firstName: document.getElementById("firstname").value,
                lastName: document.getElementById("lastname").value,
                address: document.getElementById("address").value,
                city: document.getElementById("city").value,
                email: document.getElementById("email").value,
            },
            products: produitPanier  
        }
    // Requete POST pour envoyer les informations client ainsi que les produit du panier //
        fetch('http://localhost:3000/api/teddies/order', {
        method: "POST",
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(client)   
        })

        .then(response4 =>{
            if(response4.ok){
                response4.json()
                .then(data4 => {
                        let idCommande = data4.orderId; 
                        window.location.href = `confirmation.html?${idCommande}`; // Chargement de la page de confirmation si la réponse est ok //  
        });
            }else { 
                alert.window("erreur serveur");
            }

        }) 

    }else {
        alert("Veuillez remplir tous les champs avec les informations demandées.");
    }
}



// Fonction permettant de donner un numéro de commande dans la page de confirmation // 

function affichageConfirmationCommande (){
    // Récupération de l'ID envoyée par l'API que l'on retrouve dans l'URL //
    let urlConfirmation = window.location.href;
    let tIdConfirmation = urlConfirmation.split("?");
    let idConfirmation = tIdConfirmation[1];
    // Affichage de l'ID récupérer dans l'URL comme numéro de commande // 
    document.getElementById("idCommandeClient").innerHTML += `
    <strong class="idCommandeClient">${idConfirmation}</strong>`
}