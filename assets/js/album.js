let pageURL  = window.location.search;
const productId = new URLSearchParams(pageURL).get("id");
// myUrl = "https://api.deezer.com/album/"
// `${myUrl}/${productId}/tracks`
// header: {
//   "Access-Control-Allow-Origin": `${myUrl}/${productId}/tracks`
// }
myUrl = "https://striveschool-api.herokuapp.com/api/deezer/album/" + productId;


let newArrayAlbums = localStorage.getItem("arrayAlbums");
newArrayAlbums = JSON.parse(newArrayAlbums);

window.onload = () => {
  getDataAlbum()
  handleNavigation();
  printSideList(newArrayAlbums);
};

// entrando nella pagina album creo url con id album e faccio get con  newArraySongs.album.tracklist

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
  let containerAlbum = document.getElementById("containerAlbum");
  containerAlbum.innerHTML="";
  let newAlbum = `
    <div class="col-2 p-0 overflow-hidden me-3"
      style="max-height: 170px; min-width: 180px">
      <img
        src="${data.cover}"
        width="100%"
        alt="cover album"
      />
    </div>
    <div class="col pt-3 mt-4">
      <div class="d-flex justify-content-between align-items-center">
        <p
          class="type text-uppercase mb-1 text-white fs-11px fw-bold"
        >
          album
        </p>
      </div>
      <h1 class="text-white fw-bold">${data.title}</h1>

      <p class="mb-3 fs-11px text-white">
        <img
          src="
          ${data.artist.picture_small}"
          alt="image artista"
          width="20px"
          height="20px"
          class="artistLink rounded-pill"
          data-id=${data.artist.id}
        />
        <span class="artistLink fw-bold" data-id=${data.artist.id}>${data.artist.name}</span> •
        <span>Anno</span> • <span>numero brani,</span
        ><span class="fw-light"> Durata</span>
      </p>
    </div>`;
 containerAlbum.innerHTML = newAlbum;
// console.log(array[0]);
 const artistLink = document.querySelectorAll(".artistLink");
 artistLink.forEach((el) => {
  const dataId = el.getAttribute("data-id");
  el.onclick = () => {
    goOnPage("artist", dataId)
  }
 })
};

// cambio pagina
function goOnPage(page, id) {
  window.location.href = `${page}.html?id=${id}`;
};

function populateSongsList (data){
  let containerAlbumSongs = document.getElementById("containerAlbumSongs");
  containerAlbumSongs.innerHTML = "";
  // console.log(data.tracks.data[0], "io dovrei essere il primo brano album")
  for (let i = 0; i < data.tracks.data.length; i++) {
    let durationInMinutes = data.tracks.data[i].duration / 60;
    let newSong = 
    `
  <div class="col-1 d-flex justify-content-end">
    <p>${i+1}</p>
  </div>
  <div class="col-5">
    <h6 class="text-white">
      ${data.tracks.data[i].title}
    </h6>
    <p class="fs-11px">
      ${data.tracks.data[i].artist.name}
    </p>
  </div>
  <div class="col-3 d-flex justify-content-end">
    <p>${data.tracks.data[i].rank}</p>
  </div>
  <div class="col-3 d-flex justify-content-end pe-5">
    <p>${durationInMinutes}</p>
  </div>
  ` 
  containerAlbumSongs.innerHTML += newSong
}}


