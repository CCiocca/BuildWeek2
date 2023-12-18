let pageURL  = window.location.search;
const productId = new URLSearchParams(pageURL).get("id");

window.onload = () => {
  let newArraySongs = localStorage.getItem("arraySongs");
  let newArrayAlbums = localStorage.getItem("arrayAlbums");
  newArraySongs = JSON.parse(newArraySongs);
  newArrayAlbums = JSON.parse(newArrayAlbums);
  handleNavigation();
  printSideList(newArrayAlbums)
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


