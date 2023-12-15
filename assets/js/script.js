const myUrl = "https://striveschool-api.herokuapp.com/api/deezer/search?q=";
//query exemple [queen];

let arrayAlbums = [];
let arraySongs = [];
let currentSong;

window.onload = () => {
  helloSpoty();
  getData("alt-j");
  getData("queen");
  getData("dua-lipa");
};

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
      handleCurrentSong();
    })
    .catch((error) => console.error("Errore durante la fetch:", error));
}

/*
#1 refactor codice (window.onload etc)
#2 popolato home jumbo + cards
#3 aggiunto filtri per doppioni nelle createArray
#4 aggiunto tag audio nella card con la prew della canzone
#5 aggiunta gestione play/pause del currentTrack in jumbo e actions bar
#6 aggiunta buongiornobuonasera
#7 aggiunta funzione scorrimento barra traccia 
   
   tofix:
#8 next/prev currentSong
*/

// onclick PLAY current song
const playBtn = document.querySelectorAll(".playBtn");
let isPlaying = false;
let songToPlay;
playBtn.forEach((el) => (el.onclick = () => togglePlayPause()));

/***** CALLBACKS *****/
function togglePlayPause(crrSng) {
  crrSng ? "" : (crrSng = arraySongs[0]);
  // check se esiste una traccia audio o è diversa dalla traccia corrente
  if (!songToPlay || songToPlay.src !== crrSng.preview) {
    // creo una nuova traccia con l'oggetto audio
    songToPlay = new Audio(crrSng.preview);
    // resetto lo stato a "paused" quando la traccia è finita
    songToPlay.onended = function () {
      isPlaying = false;
    };
  }
  // toggle play/pause
  if (isPlaying) {
    console.log("PAUSEEE");
    songToPlay.pause();
  } else {
    songToPlay.play();
  }
  // riagggiorna lo stato
  isPlaying = !isPlaying;
  // funzione per la barra di scorrimento
  songTrackBar(songToPlay);
}
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
function printJumbo(crrSng) {
  const jumboTitle = document.getElementById("jumboTitle");
  const type = document.querySelectorAll(".type");
  const artist = document.querySelectorAll(".artist");
  crrSng ? "" : (crrSng = arraySongs[0]);
  jumboTitle.innerText = crrSng.title;
  type.forEach((el) => {
    el.innerText = crrSng?.type;
  });
  artist.forEach((el) => {
    el.innerText = crrSng?.artist.name;
  });
  // return currentSong;
}

// buongiorno e buonasera!
function helloSpoty() {
  const textHello = document.getElementById("helloSpotify");
  let oraCorrente = new Date().getHours();
  oraCorrente < 17
    ? (textHello.innerText = "Buongiorno")
    : (textHello.innerText = "Buonasera");
}

// barra sccorrimento audio
function songTrackBar(track) {
  // mi assicuro di eseguire le funzioni solo mentre i metadati sono caricati
  track.addEventListener("loadedmetadata", function () {
    // durata della canzone in sec
    let trackDuration = track.duration;
    const barTrack = document.getElementById("barTrack");
    barTrack.max = trackDuration; // Imposta il massimo valore della barra di tracciamento

    // value durante la riproduzione
    track.addEventListener("timeupdate", function () {
      barTrack.value = track.currentTime;
    });
  });
  console.log(track, "track");
}

// current song next/prev
function handleCurrentSong() {
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  prevBtn.onclick = () => {
    const currentIndex = arraySongs.indexOf(currentSong);
    const newIndex = (currentIndex - 1 + arraySongs.length) % arraySongs.length;
    currentSong = arraySongs[newIndex];
    printJumbo(currentSong);
    console.log(currentSong, "currentsong prev");
  };

  nextBtn.onclick = () => {
    const currentIndex = arraySongs.indexOf(currentSong);
    const newIndex = (currentIndex + 1) % arraySongs.length;
    currentSong = arraySongs[newIndex];
    printJumbo(currentSong);
    console.log(currentSong, "currentsong prev");
  };
}

/*
currentIndex - 1: Sottrai 1 all'indice corrente. Questo ti dà l'indice del brano precedente.
+ arraySongs.length: Aggiungi la lunghezza dell'array. Questo passo è fondamentale per gestire il caso in cui currentIndex - 1 è negativo. Aggiungendo la lunghezza dell'array, ci assicuriamo che l'indice risultante sia positivo o zero.
% arraySongs.length: L'operazione % arraySongs.length garantisce che il risultato sia un numero nell'intervallo da 0 a arraySongs.length - 1.
*/
