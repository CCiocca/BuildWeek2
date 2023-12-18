let pageURL  = window.location.search;
const productId = new URLSearchParams(pageURL).get("id");
myUrl = "https://striveschool-api.herokuapp.com/api/deezer/artist/" + productId;

let newArrayAlbums = localStorage.getItem("arrayAlbums");
newArrayAlbums = JSON.parse(newArrayAlbums);

window.onload = () => {
  getDataAlbum()
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
  src="${data.picture_medium}"
  alt="img-artist"
  width="100%"
  />
<div class="text-hero">
  <div class="bi bi-patch-check text-white">Verified Artist</div>
  <h1 class="text-white">${data.name}</h1>
  <div class="fw-bold mt-3 text-white">
    <span class="numeriascoltatori">${data.nb_fan}</span> ascoltatori
    mensili
  </div>
</div>`;
containerHero.innerHTML = newArtist;
};


function populateSongsList (data){
let containerArtistSongs = document.getElementById("containerArtistSongs");
containerArtistSongs.innerHTML = "";
for (let i = 0; i < data.tracks.data.length; i++) {
  let durationInMinutes = data.tracks.data[i].duration / 60;
  let newSong = 
  `
  <div class="d-flex align-items-center mb-4">
  <i class="playBtn color-green fs-2 bi bi-play-circle-fill"></i>
  <button class="btn mx-3 btn-dark text-uppercase fs-11px">
    following
  </button>
  <button
    class="navbar-toggler"
    type="button"
    data-bs-toggle="collapse"
  >
    <span> <i class="bi bi-three-dots"></i></span>
  </button>
</div>
<div class="col-7">
  <h5 class="text-white mb-3">Popolari</h5>
  <ol class="p-0 list-group-numbered">
    <li class="list-group-item d-flex mb-3 align-items-center">
      <div
        class="overflow-hidden rounded ms-4 me-5"
        style="max-width: 80px; max-height: 80px"
      >
        <img
          src="https://images.unsplash.com/photo-1679850988136-5c5d78237d03?q=80&w=2063&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          class="rounded"
          alt="img-album"
          width="auto"
          height="80px"
        />
      </div>
      <p class="mb-0 me-5">Titolo Canzone</p>
      <!--volte in cui è stato ascoltato un brano-->
      <p class="mb-0">666.666.666</p>
      <!--durata della canzone (currentsong.duration)-->
      <p class="mb-0 ms-auto">3:33</p>
    </li>
    <li class="list-group-item d-flex mb-3 align-items-center">
      <div
        class="overflow-hidden rounded ms-4 me-5"
        style="max-width: 80px; max-height: 80px"
      >
        <img
          src="https://images.unsplash.com/photo-1679850988136-5c5d78237d03?q=80&w=2063&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          class="rounded"
          alt="img-album"
          width="auto"
          height="80px"
        />
      </div>
      <p class="mb-0 me-5">Titolo Canzone</p>
      <!--volte in cui è stato ascoltato un brano-->
      <p class="mb-0">666.666.666</p>
      <!--durata della canzone (currentsong.duration)-->
      <p class="mb-0 ms-auto">3:33</p>
    </li>
    <li class="list-group-item d-flex mb-3 align-items-center">
      <div
        class="overflow-hidden rounded ms-4 me-5"
        style="max-width: 80px; max-height: 80px"
      >
        <img
          src="https://images.unsplash.com/photo-1679850988136-5c5d78237d03?q=80&w=2063&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          class="rounded"
          alt="img-album"
          width="auto"
          height="80px"
        />
      </div>
      <p class="mb-0 me-5">Titolo Canzone</p>
      <!--volte in cui è stato ascoltato un brano-->
      <p class="mb-0">666.666.666</p>
      <!--durata della canzone (currentsong.duration)-->
      <p class="mb-0 ms-auto">3:33</p>
    </li>
  </ol>
  <h6>Visualizza altro</h6>
</div>
<div class="col-4 ms-auto">
  <h5 class="text-white">Brani che ti piacciono</h5>
  <div class="row">
    <div
      class="overflow-hidden rounded-circle p-0"
      style="max-width: 80px; max-height: 80px"
    >
      <img
        src="https://images.unsplash.com/photo-1679850988136-5c5d78237d03?q=80&w=2063&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="img-album"
        width="auto"
        height="80px"
      />
    </div>
    <div class="col">
      <p class="text-bold text-white">
        Hai messo Mi piace a 11 brni
      </p>
      <p class="fs-11px">Di Yellowcard</p>
    </div>
  </div>
</div>
` 
containerArtistSongs.innerHTML += newSong
}}