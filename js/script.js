function loadModal(numModal) {
  for(var i = 1; i <= numModal; i++) {
    $('#modal' + i).iziModal();
  }
}

function openModal(index) {
  event.preventDefault();
  $('#modal' + index).iziModal('open');
}

