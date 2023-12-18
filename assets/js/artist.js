let pageURL  = window.location.search;
const productId = new URLSearchParams(pageURL).get("id");
myUrl = "https://striveschool-api.herokuapp.com/api/deezer/artist/" + productId;

let newArrayAlbums = localStorage.getItem("arrayAlbums");
newArrayAlbums = JSON.parse(newArrayAlbums);

window.onload = () => {
  getDataAlbum()
  populateSongsList();
  handleNavigation();
  printSideList(newArrayAlbums);
};

function getDataAlbum() {
  fetch(myUrl, {
    method: "GET",
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data, "io sono l'array album");
      populateHero(data);
      populateSongsList(data);
    })
    .catch((error) => console.error("Errore durante la fetch:", error));
}




// accedo alla history di navigazione (torno indietro o vado avanti nelle pagine visitate)
function handleNavigation() {
  const goBackBTN = document.getElementById("goBack");
  const goForwardBTN = document.getElementById("goForward");
  goBackBTN.onclick = goBack;
  goForwardBTN.onclick = goForward;
}
function goBack() {
  window.history.back();
}
function goForward() {
  window.history.forward();
}

function printSideList(array) {
  const containerSideList = document.getElementById("containerSideList");
  containerSideList.innerHTML = "";
  for (let i = 0; i < array.length; i++) {
    const newItem = document.createElement("li");
    newItem.classList.add("my-2");

    newItem.innerText = `${array[i].title}`;

    containerSideList.appendChild(newItem);
  }
}


function populateHero(data) {
  let containerHero = document.getElementById("hero-artist");
  containerHero.innerHTML="";
  let newArtist = `
  <img
  src="${data.picture_big}"
  alt="img-artist"
  width="100%"
  />
<div class="text-hero">
  <div class="bi bi-patch-check text-white"> Verified Artist</div>
  <h1 class="text-white">${data.name}</h1>
  <div class="fw-bold mt-3 text-white">
    <span class="numeriascoltatori">${data.nb_fan}</span> ascoltatori
    mensili
  </div>
</div>`;
containerHero.innerHTML = newArtist;
};


// va fatta un'altra chiamata per popolare le songs

function populateSongsList (data){
  let urlSongs = data.tracklist;
  fetch(urlSongs, {
    method: "GET",
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data, "io sono l'array album");
      generateSongsList(data);
    })
    .catch((error) => console.error("Errore durante la fetch:", error));
  }

function generateSongsList(data){
let containerArtistSongs = document.getElementById("containerArtistSongs");
containerArtistSongs.innerHTML = "";
for (let i = 0; i < data.data.length; i++) {
  let durationInMinutes = data.data[i].duration / 60;
  let newSong = 
  `
  <li class="list-group-item d-flex mb-3 align-items-center">
  <div
    class="overflow-hidden rounded ms-4 me-5"
    style="max-width: 80px; max-height: 80px"
  >
    <img
      src="${data.data[i].album.cover_small}"
      class="rounded"
      alt="img-album"
      width="auto"
      height="80px"
    />
  </div>
  <p class="mb-0 me-5">${data.data[i].title}</p>
  <p class="mb-0">${data.data[i].rank}</p>
  <p class="mb-0 ms-auto">${durationInMinutes}</p>
</li>
` 
containerArtistSongs.innerHTML += newSong
}}