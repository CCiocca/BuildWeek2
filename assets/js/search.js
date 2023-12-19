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
  console.log(query, "input searchSong func");
  console.log(input, "input searchSong func");
  return query;
}

function loadResults(data) {
  console.log(data);
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
