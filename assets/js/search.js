const myUrl = "https://striveschool-api.herokuapp.com/api/deezer/search?q=";

// recuperare l'elemento che compie l'azione
const searchBTN = document.getElementById("searchBtn");

searchBTN.onclick = () => loadSong(searchSong());
let query = "";

function loadSong(query) {
  let url = `${myUrl}[${query}]`;
  console.log(url, "url");
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log(data, "data");
      loadResults(data.data);
    })
    .catch((error) => console.error("Errore:", error));
}

function searchSong() {
  const input = document.getElementById("inputSearch");
  query = input.value;
  return query;
}

function loadResults(data) {
  const containerSearchResults = document.getElementById(
    "containerSearchResults"
  );
  const titleResult = document.getElementById("titleResult");
  titleResult.innerText =
    data.length > 0 ? "Risultati" : "Ci dispiace, non ci sono risultati!";
  containerSearchResults.innerHTML = "";
  data.forEach((element) => {
    console.log(element, "elemt");
    let newElement = `
        <div class="col-4">
          <div class="card border-0 mb-3" style="max-width: 540px">
            <div class="row g-0">
              <div class="col overflow-hidden" style="max-width: 80px">
                <img
                  src="${element.album.cover}"
                  alt="img-album"
                />
              </div>
              <div class="col-md-8 text-white">
                <div class="card-body px-3 p-2">
                  <p class="card-text">
                    <small
                      >${element.title}</small
                    >
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        `;
    containerSearchResults.innerHTML += newElement;
  });
}
function nascondiColonna() {
  const mainRightOpened = document.getElementById("mainRightOpened");
  mainRightOpened.style.display = "none";

  const colCentral = document.querySelector(".col-8");
  colCentral.classList.add("col-10");
}
document.addEventListener("DOMContentLoaded", function () {
  let rightColumn = document.getElementById("mainRightOpened");
  let centerColumn = document.querySelector(".col-8");

  let peopleIcon = document.getElementById("peopleIcon");

  function mostraColonnaDestra() {
    // Mostra la colonna destra
    rightColumn.style.display = "block";

    // Ripristina le dimensioni della colonna centrale
    centerColumn.classList.remove("col-10");
    centerColumn.classList.add("col-8");
  }

  // Aggiungi un gestore di eventi per il click sull'icona delle persone
  peopleIcon.addEventListener("click", mostraColonnaDestra);
});
