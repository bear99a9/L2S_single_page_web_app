let notes = new Notes();

function loadMessages() {
  var contentDiv = document.getElementById('app'),
   index = location.hash.substr(1);

  content = notes.messages[index];

  contentDiv.innerHTML = content;

}

function createNewNote() {
  let noteInput = document.getElementById('note-input');
  let text = noteInput.value;
  notes.messages.push(text);

  updateDisplayedMessages();
  noteInput.value = '';
}

function updateDisplayedMessages() {
  loadMessages();
  document.getElementById('note-list').innerHTML = '';
  notes.all().forEach(function (note, index) {
    let listLink = document.createElement('a');
    let listItem = document.createElement('li');
    listLink.href = '#' + index;
    listLink.id = 'note' + index;
    listLink.text = note.substring(0, 20);
    listItem.appendChild(listLink);
    document.getElementById('note-list').appendChild(listItem);
  });
}

let createButton = document.getElementById('create-note');
createButton.addEventListener('click', createNewNote);

updateDisplayedMessages();
window.addEventListener('hashchange', loadMessages);
