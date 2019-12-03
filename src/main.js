import {addNote,removeNote,updateSearch} from './actions/actions'
import store from './store/store'
import { stringify } from 'querystring';

// ------ HTML references ------
let notesUList = document.getElementById('notes');
let addNoteForm = document.getElementById('add-note');
let addNoteTitle = addNoteForm['title'];     //ดึงinput ที่มีชื่อว่าtitle มาเก็บในตัวแปร 
let addNoteContent = addNoteForm['content'];
let searchInput = document.getElementById('search');



// ------ Redux ------

store.subscribe(function(){
  console.log('store is update') //เมื่อไหร่state ที่มีการเปลี่ยนแปลงจะทำfunction renderNotes()
  localStorage.setItem('notes',JSON.stringify(store.getState())) 
  renderNotes()
})


function deleteNote(id) {     //function handler
  console.log(id);
  let action = removeNote(id)
  store.dispatch(action)
}

function renderNotes() {
  notesUList.innerHTML =''  //จะเป็นการclear ทุกอย่างออก
  let state = store.getState()
  let search = state.search
  let notes = state.notes

  if (search) {
  notes = notes.filter(note => note.title.includes(search))
  }

  for (let note of notes){
    notesUList.innerHTML += `
      <li>
        <b>${note.title}</b>
        <button data-id=${note.id}>x</button>
        <br />
        <span>${note.content}</span>
      </li>
    `
  }
  setDeleteNoteButtonsEventListeners()
}


// ------ Event Listeners ------
addNoteForm.addEventListener('submit', (e) => {   //เป็น handleEvent เวลากดปุ่ม Add Note
  e.preventDefault();  //ป้องกันไม่ให้ form html reload
  let title = addNoteTitle.value
  let content = addNoteContent.value
  let action = addNote(title,content)
  // console.log(action)
  // console.log('Title:', addNoteTitle.value, 'Content:', addNoteContent.value);

  store.dispatch(action)
  // console.log(store.getState())
  addNoteTitle.value = ''
  addNoteContent.value = ''
});


function setDeleteNoteButtonsEventListeners() {
  let buttons = document.querySelectorAll('ul#notes li button');
  
  for(let button of buttons) {
    button.addEventListener('click', () => {
      deleteNote(button.dataset.id);
    });
  }
 }
 
searchInput.addEventListener('keyup',() =>{
  store.dispatch(updateSearch(searchInput.value))
})

// ------ Render the initial Notes ------
renderNotes(); 