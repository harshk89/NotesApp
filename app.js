console.log("This is app.js for project 1");
showNotes();

//code for 'Add Note' button
let addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", function (e) {
  let addText = document.getElementById("addTxt");
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  notesObj.push(addText.value);
  localStorage.setItem("notes", JSON.stringify(notesObj));
  addText.value = "";
  showNotes();
});

//--function to display all the stored in local storage in the your notes section
function showNotes() {
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  let html = "";
  notesObj.forEach(function (element, index) {
    html += `<div class="noteCard card my-2 mx-2" style="width: 17rem">
            <div class="card-body">
            <h5 class="card-title">Note ${index + 1}</h5>
            <p class="card-text">${element}</p>
            <button class="btn btn-primary" id="${index}" onclick="deleteNode(this.id)">Delete Note</button>
            </div>
            </div>`;
  });
  let notesElm = document.getElementById("notes");
  if (notesObj.length != 0) {
    notesElm.innerHTML = html;
  } else {
    notesElm.innerHTML = `<p>Add a note to display here</p>`;
  }
}

//--code for 'Delete Note' button
function deleteNode(index) {
console.log("delete Node", index);
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  notesObj.splice(index, 1);       //to delete one element from given index of the notesObj array
  localStorage.setItem("notes", JSON.stringify(notesObj));
  showNotes();
};

//--this code filters note cards while we type on the search box--
// let search = document.getElementById('searchTxt');
// search.addEventListener("input", function() {
//     let inputVal = search.value;
//     // console.log("input event fired!", inputVal);
//     let noteCards = document.getElementsByClassName('noteCard');
//     Array.from(noteCards).forEach(function(element) {
//         let cardTxt = element.getElementsByTagName('p')[0].innerText;
//         if(cardTxt.includes(inputVal)) {
//             element.style.display = "block";
//         }
//         else
//             element.style.display = "none";
//     })

// })

//--this code filters note cards only when we press search button or enter key
function handleSearch(){
  // console.log("handleSearch fired!");
  let search = document.getElementById('searchTxt');
  inputVal = search.value;
  let noteCards = document.getElementsByClassName('noteCard');
  Array.from(noteCards).forEach(function(element) {
    let cardTxt = element.getElementsByTagName('p')[0].innerText;
    if(cardTxt.includes(inputVal)) {
      element.style.display = "block";
    }
    else
      element.style.display = "none";
  });
};

function searchOnEnter(e){
  if (!e) e = window.event;
    var keyCode = e.code || e.key;
  if (keyCode == 'Enter'){
    console.log('enter pressed');
    // Enter pressed
    handleSearch();
  }
};

//--function to cancel the search and show all the notes again--
function handleCancelSearch() {
  // console.log("cancel search triggered!");
  document.getElementById('searchTxt').value = "";
  let noteCards = document.getElementsByClassName('noteCard');
  Array.from(noteCards).forEach(function(element) {
    element.style.display = "block";
  });
}
