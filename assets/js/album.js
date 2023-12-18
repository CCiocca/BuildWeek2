window.onload = () => {
  handleNavigation();
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
