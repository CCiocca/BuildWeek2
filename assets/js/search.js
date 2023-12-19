myUrl = "https://striveschool-api.herokuapp.com/api/deezer/search?q="

function search(){
    const query = document.getElementById("research").value;
    getResults(query);
}

function getResults(query){
    fetch(myUrl + query, {
    method: "GET",
    headers: {
        "Content-Type": "application/json",
    }
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .then (data => {
        loadResults(data)})
    .catch(err => alert(err));
}

function loadResults(data){
    console.log(data);
    const containerSearchResults = document.getElementById("containerSearchResults");
    containerSearchResults.innerHTML="";

    data.forEach(element => {
        let newElement = `
        <h4 class="mt-3 text-white">Risultati</h4>
        <div class="col-4">
          <div class="card border-0 mb-3" style="max-width: 540px">
            <div class="row g-0">
              <div class="col overflow-hidden" style="max-width: 80px">
                <img
                  src="${element.data.album.cover}"
                  alt="img-album"
                />
              </div>
              <div class="col-md-8 text-white">
                <div class="card-body px-3 p-2">
                  <p class="card-text">
                    <small
                      >${element.data.title}</small
                    >
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        `
        containerSearchResults.innerHTML += newElement;
})
};


