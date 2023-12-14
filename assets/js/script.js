const url = "https://striveschool-api.herokuapp.com/api/deezer/search?q=";

//poi add [queen];

let arrayAlbums = [];
let arrayArtists = [];
let arraySongs = [];


//recupero i dati dall API e li uso per riempire gli array 
function getData(query){
    fetch(`${url}[${query}]`, {
        method: "GET",
    })
  .then(response => response.json())
  .then(data => {
    // console.log(data)
    createArrayAlbums(data);
    createArraySongs(data);
    handlePrintData();
  })
  .catch((error) => console.error("Errore durante la modifica:", error));
};


function createArrayAlbums(data){
    for (let i = 0; i < data.data.length; i++){
        let album = data.data[i].album;
        arrayAlbums.push(album);
    }
};


function createArraySongs(data){
    let song = data;
    arraySongs.push(song);
};


getData("alt-j");
// getData("queen");
// getData("dua-lipa");


// console.log(arrayArtists, "array artists");
// console.log(arrayAlbums, "array albulms");


// stampiamo in home page i risultati della ns fetch
function handlePrintData(){
    printAlbums();
    // printArtists();
    printSideList();
    printSongs();
}

function printAlbums(){
    const containerBuonasera = document.getElementById("containerBuonasera"); 
    containerBuonasera.innerHTML = "";
    for (let i = 0; i < 6; i++){
        // console.log(containerBuonasera, "container before")
        const newCard = document.createElement("div");
        newCard.classList.add("col-4");

        newCard.innerHTML = `
        <div class="card overflow-hidden border-0 mb-3" style="max-width: 540px">
            <div class="row g-0">
                <div class="col overflow-hidden" style="max-width: 80px">
                <img
                    src="${arrayAlbums[i].cover_small}"
                    alt="img-album"
                    width="100%"
                />
                </div>
                <div class="col-md-8 text-white">
                <div class="card-body px-3 p-2">
                    <p class="card-text">
                        <small>${arrayAlbums[i].title}</small>
                    </p>
                </div>
                </div>
            </div>
        </div>
    `
    containerBuonasera.appendChild(newCard);
    // console.log(containerBuonasera, "container after")

}
};


function printSideList(){
    const containerSideList = document.getElementById("containerSideList"); 
    containerSideList.innerHTML = "";
    for (let i = 0; i < arrayAlbums.length; i++){
        // console.log(containerSideList, "container before")
        const newItem = document.createElement("li");
        newItem.classList.add("my-2");

        newItem.innerText = `${arrayAlbums[i].title}`
    
        containerSideList.appendChild(newItem);
        // console.log(containerSideList, "container after")
}
};

function printSongs(){
    console.log(arraySongs, "array songs");
    const containerAltroPiace = document.getElementById("containerAltroPiace"); 
    containerAltroPiace.innerHTML = "";
    for (let i = 0; i < arraySongs.length; i++){
        // console.log(containerAltroPiace, "container before")
        const newCard = document.createElement("div");
        newCard.classList.add("col");

        newCard.innerHTML = `
                <div class="card p-3 border-0 bg-dark-grey">
                  <img
                    src="${arraySongs[i].cover_small}"
                  />
                  <div class="card-body pt-3 p-0">
                    <h6 class="card-title text-white">Card title</h6>
                    <small class="card-text">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    </small>
                  </div>
                </div>
    `
    containerAltroPiace.appendChild(newCard);
    // console.log(containerAltroPiace, "container after")

}

};
