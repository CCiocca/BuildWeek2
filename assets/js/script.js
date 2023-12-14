const myUrl = "https://striveschool-api.herokuapp.com/api/deezer/search?q=";

//poi add [queen];

let arrayAlbums = [];
let arraySongs = [];

getData("alt-j");
getData("queen");
getData("dua-lipa");

//recupero i dati dall API e li uso per riempire gli array
function getData(query) {
  fetch(`${myUrl}[${query}]`, {
    method: "GET",
  })
    .then((response) => response.json())
    .then((data) => {
      // console.log(data)
      handleCreateArrays(data);
      handlePrintData();
    })
    .catch((error) => console.error("Errore durante la fetch:", error));
}

/***** CALLBACKS *****/
// creo gli array con i dati che devo stampare
function handleCreateArrays(data) {
  createArrayAlbums(data);
  createArraySongs(data);
}
function createArrayAlbums(data) {
  for (let i = 0; i < data.data.length; i++) {
    let album = data.data[i].album;
    const isExistingAlbum = arrayAlbums.some(
      (alb) => alb.id.toString() === album.id.toString()
    );
    if (!isExistingAlbum) arrayAlbums.push(album);
  }
}

function createArraySongs(data) {
  for (let i = 0; i < data.data.length; i++) {
    let song = data.data[i];
    const isExistingSong = arraySongs.some(
      (sng) => sng.id.toString() === song.id.toString()
    );
    if (!isExistingSong) arraySongs.push(song);
  }
}

// stampo in home page
function handlePrintData() {
  printAlbums();
  printSideList();
  printSongs();
  printJumbo();
}

function printAlbums() {
  const containerBuonasera = document.getElementById("containerBuonasera");
  containerBuonasera.innerHTML = "";
  for (let i = 0; i < 6; i++) {
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
    `;
    containerBuonasera.appendChild(newCard);
  }
}

function printSideList() {
  const containerSideList = document.getElementById("containerSideList");
  containerSideList.innerHTML = "";
  for (let i = 0; i < arrayAlbums.length; i++) {
    const newItem = document.createElement("li");
    newItem.classList.add("my-2");

    newItem.innerText = `${arrayAlbums[i].title}`;

    containerSideList.appendChild(newItem);
  }
}

function printSongs() {
  const containerAltroPiace = document.getElementById("containerAltroPiace");
  containerAltroPiace.innerHTML = "";
  for (let i = 0; i < 10; i++) {
    const newCard = document.createElement("div");
    newCard.classList.add("col");
    newCard.innerHTML = `
                <div class="card h-100 p-3 border-0 bg-dark-grey">
                  <img
                    src="${arraySongs[i].album.cover}"
                  />
                  <div class="card-body pt-3 p-0">
                    <h6 class="card-title text-white">${arraySongs[i].title}</h6>
                    <p class="card-text">
                      Album: ${arraySongs[i].album.title}
                    </p>
                    <p class="mt-auto card-text">
                    ${arraySongs[i].duration}sec
                    </p>
                    <audio controls class='w-100'>
                      <source src="${arraySongs[i].preview}" type="audio/mp3">
                      Your browser does not support the audio element.
                    </audio>
                  </div>
                </div>
    `;
    containerAltroPiace.appendChild(newCard);
  }
}

function printJumbo() {
  const jumboTitle = document.getElementById("jumboTitle");
  const type = document.querySelectorAll(".type");
  const artist = document.querySelectorAll(".artist");
  let currentSong = arraySongs[0];
  jumboTitle.innerText = currentSong.title;
  type.forEach((el) => {
    el.innerText = currentSong?.type;
  });
  artist.forEach((el) => {
    el.innerText = currentSong?.artist.name;
  });
  return currentSong;
}

// onclick play current song
const playBtn = document.querySelectorAll(".playBtn");
let isPlaying = false;
let songToPlay;

playBtn.forEach((el) => (el.onclick = () => togglePlayPause()));

function togglePlayPause() {
  let currentSong = arraySongs[0];
  // check se esiste una traccia audio o è diversa dalla traccia corrente
  if (!songToPlay || songToPlay.src !== currentSong.preview) {
    // creo una nuova traccia con l'oggetto audio
    songToPlay = new Audio(currentSong.preview);
    // resetto lo stato a "paused" quando la traccia è finita
    songToPlay.onended = function () {
      isPlaying = false;
    };
  }
  // toggle play/pause
  if (isPlaying) {
    songToPlay.pause();
  } else {
    songToPlay.play();
  }
  // riagggiorna lo stato
  isPlaying = !isPlaying;
  // aggiorno il testo in base alla condiz
  //   playBtn.innerText = isPlaying ? "Pause" : "Play";
}
