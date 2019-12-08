// BART Sébastien KROL Mikolaï Groupe 3
window.addEventListener('load', initNote);

function initNote(){
  document.forms.form_note_station.addEventListener('submit', noteStation);
}

function noteStation(ev){
  ev.preventDefault();
  let form = document.forms.form_note_station;
  let args = new FormData(this);
  args.append('id', form.dataset.id);
  fetchFromJson("services/noteStation.php", { method: 'post', body: args, credentials: 'same-origin' })
  .then(processAnswer)
  .then(validNote, errorNote);
}

function validNote(answer){
  completeTable();
  showResult(true, "Note attribuée.");
}

function errorNote(error){
  showResult(false, error.message);
}
