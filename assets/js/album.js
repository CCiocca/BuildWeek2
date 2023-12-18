let pageURL  = window.location.search;
const productId = new URLSearchParams(pageURL).get("id");

window.onload = () => {
  let newArraySongs = localStorage.getItem("arraySongs");
  let newArrayAlbums = localStorage.getItem("arrayAlbums");
  newArraySongs = JSON.parse(newArraySongs);
  newArrayAlbums = JSON.parse(newArrayAlbums);  
  populatePage(newArraySongs);
  handleNavigation();
  printSideList(newArrayAlbums);
};
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

function populatePage(array) {
  let containerAlbum = document.getElementById("containerAlbum");
  containerAlbum.innerHTML="";
  let newAlbum = `
    <div class="col-2 p-0 overflow-hidden me-3"
      style="max-height: 170px; min-width: 180px">
      <img
        src="${array[0].album.cover}"
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
      <h1 id=" " class="text-white fw-bold">${array[0].album.title}</h1>

      <p class="mb-3 fs-11px text-white">
        <img
          src="
          ${array[0].album.cover}"
          alt="image artista"
          width="20px"
          height="20px"
          class="rounded-pill"
        />
        <span class="artist fw-bold">${array[0].artist.name}</span> •
        <span>Anno</span> • <span>numero brani,</span
        ><span class="fw-light"> Durata</span>
      </p>
    </div>`;
 containerAlbum.innerHTML = newAlbum;
console.log(array[0]);
}


// dall'array songs, mi creo un nuovo array contenente tutte le canzoni che hanno come album.title il nome dell'album presente nel div superiore che è array[0].album.title

// Esempio di utilizzo:
let desiredAlbumTitle = array[0].album.title;
let arrayAlbumSingolo = filtraOggettiPerChiave(arrayDiOggetti, chiaveDiRicercaDesiderata);
console.log(nuovoArray);



/*
parte sotto da reimpire con le canzioni dell'album
    <div class="row fs-11px">
    <div class="col-1 d-flex justify-content-end">
      <p>num</p>
    </div>
    <div class="col-5">
      <h6 class="text-white">
        Brano dal nome abbastanza lungo da vedere se fitta
      </h6>
      <p class="fs-11px">
        autore altrettanto lungo ma non troppissimo dai
      </p>
    </div>
    <div class="col-3 d-flex justify-content-end">
      <p>2.000.000</p>
    </div>
    <div class="col-3 d-flex justify-content-end pe-5">
      <p>50:00</p>
    </div>
    </div>
*/
