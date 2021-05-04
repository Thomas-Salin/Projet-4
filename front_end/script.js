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
            document.getElementById('id').innerHTML += `<td id="id">${data2._id}</td>`
            document.getElementById('name').innerHTML += `<td id="id">${data2.name}</td>`
            document.getElementById('price').innerHTML += `<td id="id">${data2.price}€</td>`
            document.getElementById('description').innerHTML += `<td id="id">${data2.description}</td>`
            for (let choix = 0; choix < data2.colors.length; choix++) {
                let element = data2.colors[choix];
                document.getElementById("choix").innerHTML += `<option value="${element}" id="color">${element}</option>`       
            }               
        })

}







    

    