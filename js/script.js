function start(numModal) {
  // alignHeader();
  loadModal(numModal);
}

function alignHeader() {
  var ref = document.getElementById("topLeft");
  var pos = ref.getBoundingClientRect();
  var x = pos.left + 4 + "px";
  document.getElementById("projectHeader").style.left = x;
}

function loadModal(numModal) {
  for(var i = 1; i <= numModal; i++) {
    $('#modal' + i).iziModal();
  }
}

function openModal(index) {
  event.preventDefault();
  $('#modal' + index).iziModal('open');
}

