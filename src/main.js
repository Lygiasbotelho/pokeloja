
const listPokeCarrinho = [];

const listPoke = [];
let total=0;
const $contCarrinho = $("#cont-carrinho");

console.log('You have connected...')

document.addEventListener("DOMContentLoaded", () => {
    renderEverything();
})

$(document).on("click", ".add-click", function () {
    const $self = $(this);
    const $card = $self.parent().parent();
    const id = $card.find(".poke-id").val();
    const name = $card.find(".card-title").text();
    const price = $card.find(".price").text();
    const image = $card.find(".card-img-top").attr("srcset");
    let pokeObj = { id: id, name: name, price: price, image: image };
    addPokeCarrinho(pokeObj);
});
//remove o poke do carrinho 
$(document).on("click", ".fa-trash", function () {
    const $self = $(this);
    const pokeId = $self.data("pokeid");
    removePokeCarrinho(pokeId);
    $self.closest("li").remove();
});

//remove todo o carrinho 
$(document).on("click", ".finalizarCompra", function () {
    const $self = $(this);
    console.log($self);
    const $card = $self.parent();
    console.log($card);
    finalizarCarrinho();
});

function renderPagination(total, limite, offSetAPI) {
    

    console.log("limite: ", limite);
    let pagina = 1;

    const $ulPagination = $(".pagination");
   // let nextPage = parseInt(pagina) + 1;
    //let backPage =  parseInt(pagina) - 1;

    //console.log("Proxima pagina: " + nextPage + "Pagina anterior: " + backPage);

    let li = "";
   // let classDisabled = (pagina == 0) ? "disabled" : "";

    //console.log(classDisabled);

    // li = `<li class="page-item ${classDisabled}">
    // <a class="page-link" href="http://127.0.0.1:5500/?limite=${backPage}">Anterior</a></li>`;
    
    $ulPagination.append(li);

    for (let index = 0; index < total; index += limite) {

        pagina = Math.round(index/limite);

        console.log("Pagina", pagina);
        console.log("index: ", index);

        offSetAPI = pagina * limite;
        console.log("Foram: ", offSetAPI);

         //let classActive = (index == offSetAPI) ? "active" : "";
         let classActive = "";
         console.log("Ativo: ", classActive);

        //   li = `<li class="page-item ${classActive}">
        //   <a class="page-link" href="#">${pagina+1}</a></li>`;
        //   $ulPagination.append(li);
        // "https://pokeapi.co/api/v2/pokemon?limit="+ limite + "&offset=" + offSetAPI;
        li = `<li class="page-item ${classActive}">
        <a class="page-link" href="#">${pagina+1}</a></li>`;
        $ulPagination.append(li);


        /* Atual
        li = `<li class="page-item ${classActive}">
        <a class="page-link" href="http://127.0.0.1:5500/?limit=${limite}&offset=${offSetAPI}">${pagina+1}</a></li>`;
        $ulPagination.append(li);*/

        /* li = `<li class="page-item ${classActive}">
        <a class="page-link" href="http://127.0.0.1:5500/?limit=${limite}&offset=${offSetAPI}">${pagina+1}</a></li>`;
        $ulPagination.append(li);*/
        

        // li = `<li class="page-item ${classActive}">
        //     <a class="page-link" href="http://127.0.0.1:5500/?limite=${limite}&offSetAPI=${offSetAPI}">${index}</a></li>`;
        // $ulPagination.append(li);
    }
    // classDisabled = (limite == totalPages - 1) ? "disabled" : "";

    // li = `<li class="page-item ${classDisabled}">
    //     <a class="page-link" href="http://127.0.0.1:5500/?limite=${nextPage}&offSetAPI=${offSetAPI}">Próximo</a></li>`;

    //$ulPagination.append(li);
}
/*
function renderPagination(totalPages, limite, offSetAPI) {
    console.log(limite);

    const $ulPagination = $(".pagination");
    let nextPage = parseInt(limite) + 1;
    let backPage =  parseInt(limite) - 1;

    let li = "";
    let classDisabled = (limite == 0) ? "disabled" : "";


    console.log(classDisabled);

    li = `<li class="page-item ${classDisabled}">
    <a class="page-link" href="http://127.0.0.1:5500/?limite=${backPage}&offSetAPI=${offSetAPI}">Anterior</a></li>`;
    
    $ulPagination.append(li);

    for (let index = 1; index <= totalPages; index++) {

        let classActive = (index == limite) ? "active" : "";

        li = `<li class="page-item ${classActive}">
            <a class="page-link" href="http://127.0.0.1:5500/?limite=${index}&offSetAPI=${offSetAPI}">${index}</a></li>`;
        $ulPagination.append(li);
    }
    classDisabled = (limite == totalPages - 1) ? "disabled" : "";

    li = `<li class="page-item ${classDisabled}">
        <a class="page-link" href="http://127.0.0.1:5500/?limite=${nextPage}&offSetAPI=${offSetAPI}">Próximo</a></li>`;

    $ulPagination.append(li);
}*/

function renderEverything() {
    let allPokemonContainer = document.querySelector('#poke-container')
    allPokemonContainer.innerText = "";
    //const page = getParameters("page");
    const total = 40;
    const limite = 8;
    //const offSetAPI = 0;
    const offSetAPI = getParameters("offSetAPI");
   // fetchKantoPokemon(limite, offSetAPI);
   fetchKantoPokemon(total, limite, offSetAPI);

}

//limite original 151
//function fetchKantoPokemon(limite, offSetAPI) {
function fetchKantoPokemon(total, limite, offSetAPI) {
  //Exemplo: Exiba 4 resultados, eliminando os 60 primeiros
  //const url = "https://pokeapi.co/api/v2/pokemon?limit=" + limite + "&offset=" + offSetAPI;
  //const url = "https://pokeapi.co/api/v2/pokemon/?limit=8&offset=40";
  const url = "https://pokeapi.co/api/v2/pokemon/?limit="+ limite + "&offset=" + offSetAPI;
    // const lim = limite;
    // const fora = offSetAPI;
    // const totalp = total;
    fetch(url)
        .then(response => response.json())
        .then(function (allpokemon) {

            const count = allpokemon.count;
            // const totalPages = Math.round(count / value);
            //const totalPages = Math.round(count / size);
            // const totalPages = Math.round(count / limite);
            // console.log("Total de páginas: ", totalPages)
                        
            //renderPagination(totalPages, pageNumber, size);
           //renderPagination(totalp, lim, fora);
            renderPagination(total, limite, offSetAPI);
           
            allpokemon.results.forEach(function (pokemon) {
                fetchPokemonData(pokemon);
            })
        })
}
//V
function fetchPokemonData(pokemon) {
    let url = pokemon.url // <--- this is saving the pokemon url to a variable to use in the fetch. 
    //Example: https://pokeapi.co/api/v2/pokemon/1/"
    fetch(url)
        .then(response => response.json())
        .then(function (pokeData) {            
            //console.log(pokeData);
            renderPokemon(pokeData)        
        })
}


function renderPokemon(pokeData) {
    //let allPokemonContainer = document.getElementById('poke-container');

    //Ly
    row = document.querySelector(".row");

    div = document.createElement("div") //div will be used to hold the data/details for indiviual pokemon.{}
    div.className = "col-md-3 col-sm-12 col-produtos";
    

    card = document.createElement("div");//?
    card.className = "card mb-4 box-shadow";


    //createPokeImage(pokeData.id, card);
    //let sprites = pokeData.sprites;
   // console.log(sprites.front_default);

    image = document.createElement("img");
    image.className = "card-img-top img-poke";
    //image.src = sprites.front_default;
    //image.src = sprites.front_shiny;
    image.srcset = `https://pokeres.bastionbot.org/images/pokemon/${pokeData.id}.png`;

    //Lyh
    cardBody = document.createElement("div"); 
    cardBody.className = "card-body";

    pokeId = document.createElement('input')
    pokeId.setAttribute("type", "hidden");
    pokeId.className = "poke-id";
    pokeId.value = pokeData.id

    duasColunas = document.createElement("div");
    //duasColunas.className = "duascolunas";

    spnLeft = document.createElement("div");
    spnLeft.className = "text-center";

    pokeName = document.createElement('h5')
    pokeName.className = "card-title";
    pokeName.innerHTML = pokeData.name

    spnRight = document.createElement("div"); //cardBody = ?
    spnRight.className = "text-center";

    moeda = document.createElement('span')
    moeda.innerHTML = "R$ ";

    pokePrice = document.createElement('span')
    pokePrice.className = "price";
    //pokePrice.innerHTML = `R$ ${pokeData.id}`
    pokePrice.innerHTML = pokeData.id;

    cardFooter = document.createElement("div"); //cardBody = ?
    cardFooter.className = "card-footer";

    addProdutoCarrinho = document.createElement("button");
    addProdutoCarrinho.className = "btn btnPrimary add-click";
    addProdutoCarrinho.innerHTML = "Eu quero";

    /*addProdutoCarrinho = document.createElement("i");
    addProdutoCarrinho.className = "btn btnPrimary add-click";
    addProdutoCarrinho.innerHTML = "Eu quero";*/


    /// Adicao dos elementos no DOM

    row.appendChild(div);
    div.appendChild(card);
    card.appendChild(image);
    card.appendChild(cardBody);
    cardBody.appendChild(duasColunas);
    duasColunas.append(spnLeft, spnRight);
    spnLeft.appendChild(pokeName);
    spnLeft.appendChild(pokeId);
    spnRight.appendChild(moeda);
    spnRight.appendChild(pokePrice);
    card.appendChild(cardFooter);
    cardFooter.appendChild(addProdutoCarrinho);
    
    //addPokeLista(pokeData);                

    // let pokeObj2 = { id: pokeData.id, name: pokeData.name, price: pokeData.id };
    // listPoke.push(pokeObj2);
    /*
    const id = $card.find(".poke-id").val();
    const name = $card.find(".card-title").text();
    const price = $card.find(".price").text();
    const image = $card.find(".card-img-top").attr("srcset");
    let pokeObj = { id: id, name: name, price: price, image: image };
    addPokeCarrinho(pokeObj);
    */
   // listPoke.push(pokeData);
   // console.log("Lista de Pokemons:", listPoke.length);

}
/*
function createTypes(types, ul){
    types.forEach(function(type){
        let typeLi = document.createElement('li');
        typeLi.innerText = type['type']['name'];
        ul.append(typeLi)
    })
}*/
/*
function createPokeImage(pokeID, div) {

    let pokeImage = document.createElement('img')
    pokeImage.className = "card-img-top";//lyh
    pokeImage.srcset = `https://pokeres.bastionbot.org/images/pokemon/${pokeID}.png`

    div.append(pokeImage);
}*/

function addPokeLista(objectPoke) {
    listPoke.push(objectPoke);
    verListaPoke();
}

function addPokeCarrinho(objectPoke) {
    listPokeCarrinho.push(objectPoke);

    const $ul = $(".ulCarrinho");
    const $spTotal = $("#sp-total");
   

    total = total + parseFloat(objectPoke.price);

    const $li = `<li class="list-group-item itemCarrinho">
        <div class="duasColunas">
            <div class="spnLeft">
                <img src=${objectPoke.image} class="card-img-top" alt="...">
                <span class="carrinhoNome">${objectPoke.name}</span>
            </div>
            <div class="spnRight">
                <span>R$ ${objectPoke.price}</span>
                <button type="button" class="remove">
                    <i class="fa fa-trash" aria-hidden="true" data-pokeid=${objectPoke.id}></i>
                </button>
            </div>
        </div>
    </li>`;
    $ul.append($li);
    $spTotal.text("R$ " + total + ",00");
    $contCarrinho.text(listPokeCarrinho.length);
    console.log("Carrinho:", listPokeCarrinho.length);
}

function removePokeCarrinho(pokeId) {
    const pokes = listPokeCarrinho.filter(x => x.id == pokeId);
    const $spTotal = $("#sp-total");
    total = total - parseFloat(pokes[0].price);
    $spTotal.text("R$ " + total + ",00");
    listPokeCarrinho.splice(listPokeCarrinho.indexOf(pokes[0]), 1);
    $contCarrinho.text(listPokeCarrinho.length);
    console.log(listPokeCarrinho.length);
}

function getParameters(parameter) {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const value = urlParams.get(parameter);
    return value;
}


function finalizarCarrinho() {

    if (!listPokeCarrinho.length) {
        console.log("Está vazia!!");
        $(carrinhoVazio).modal('show');
    }
    else {
        const $spTotal = $("#sp-total");
        $(modalSucesso).modal('show');

        total = 0;
        $spTotal.text("R$ " + total + ",00");

        listPokeCarrinho.splice(0, listPokeCarrinho.length);
        var itens = $(".itemCarrinho").remove();
        $contCarrinho.text(listPokeCarrinho.length);
    }

}

function verListaPoke(){
    // for(let i=0; i< listPoke.length; i++) {
    //      console.log("item:", listPoke[i]);
    // }
    // listPoke.forEach((name) => {
    //     console.log(name);
    // });
    //for (var chave in objeto) console.log(objeto[chave]);
    //  for(let i=0; i< listPoke.length; i++) {
    //      console.log("item:", listPoke[i]);
    //  }
    // listPoke.forEach(function (item, indice, array) {
    //     console.log(item, indice);
    //   });
}
/*var fruits = ['apple', 'banana', 'grapes', 'mango', 'orange'];

/**
 * Array filters items based on search criteria (query)
 *
function filterItems(query) {
  return fruits.filter(function(el) {
      return el.toLowerCase().indexOf(query.toLowerCase()) > -1;
  })
}

console.log(filterItems('ap')); // ['apple', 'grapes']
console.log(filterItems('an')); // ['banana', 'mango', 'orange']
*/

function filterItems(query) {
    return listPokeCarrinho.filter(function(el) {
        return el.toLowerCase().indexOf(query.toLowerCase()) > -1;
    })
  }

  

/**/











/*
 function createPokeImage(pokeID, containerDiv){
     let pokeImgContainer = document.createElement('div')
     //pokeImgContainer.classList.add('image') //????
     //pokeImgContainer.className = "card mb-4 box-shadow";

     let pokeImage = document.createElement('img')
     pokeImage.className = "card-img-top";//lyh
     pokeImage.srcset = `https://pokeres.bastionbot.org/images/pokemon/${pokeID}.png`

     pokeImgContainer.append(pokeImage);
     containerDiv.append(pokeImgContainer);
}*/
/*
function deleteEverything(event){
    event.target.style = 'none';
    let allPokemonContainer = document.querySelector('#poke-container')
    allPokemonContainer.innerText = ""

    let generateBtn = document.createElement('button')
    generateBtn.innerText = "Generate Pokemon"
    generateBtn.id = 'generate-pokemon'
    generateBtn.classList.add('ui', 'secondary', 'button')
    generateBtn.addEventListener('click', renderEverything);

    allPokemonContainer.append(generateBtn)
}*/

/*button.addEventListener ("click", function() {
  alert("did something");
});*/