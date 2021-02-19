let notes = new Notes();

function loadMessages() {
  index = location.hash.substr(1);
  getEmojis(notes.messages[index], 'app');
}

function createNewNote() {
  let noteInput = document.getElementById('note-input');
  let text = noteInput.value;
  notes.messages.push(text);

  updateDisplayedMessages();
  noteInput.value = '';
}

function getEmojis(body, id) {
  fetch('https://makers-emojify.herokuapp.com/', {
    method: 'POST',
    body: JSON.stringify({ text: body }),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(
      function (response) {
        response.json().then(function (data) {
          console.log(data);
          document.getElementById(id).innerHTML = data.emojified_text;
        });
      }
    );
}

function updateDisplayedMessages() {
  loadMessages();
  document.getElementById('note-list').innerHTML = '';
  notes.all().forEach(function (note, index) {
    let listLink = document.createElement('a');
    let listItem = document.createElement('li');
    listLink.href = '#' + index;
    listLink.id = 'note' + index;
    getEmojis(note.substring(0, 20), listLink.id); // listLink.text =
    listItem.appendChild(listLink);
    document.getElementById('note-list').appendChild(listItem);
  });
}

let createButton = document.getElementById('create-note');
createButton.addEventListener('click', createNewNote);

updateDisplayedMessages();
window.addEventListener('hashchange', loadMessages);
