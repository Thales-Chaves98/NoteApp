//Header
const searchInput = document.querySelector(".search-input");
const themeBtn = document.querySelector(".theme-toggle");
 
//Toolbar
const createNoteBtn = document.querySelector(".create-note-btn");
const filterTabs = document.querySelectorAll(".filter-tab");
const sortSelect = document.querySelector(".sort-select");

//Notes Card
const pinBtn = document.querySelector(".pin-btn");
const favoriteBtn = document.querySelector(".favorite-btn");
const noteMenuBtn = document.querySelector(".note-menu-btn");
//Note Content
const noteTitle = document.querySelector(".note-title");
const noteText = document.querySelector(".note-text");
const noteCategory = document.querySelector(".note-category");
const noteTags = document.querySelector(".note-tags");
const noteDates = document.querySelector(".note-dates");

//Note Form
const inputNoteTitle = document.getElementById("note-title");
const inputNoteContent = document.getElementById("note-content");
const inputNoteCategory = document.getElementById("category-selector");
const inputNoteColor = document.querySelectorAll(".color-option");
const inputNoteTag = document.getElementById("tag-input");
const addTagBtn = document.querySelector(".add-tag-btn");
const cancelNoteBtn = document.getElementById("cancel-note-btn");
const saveNoteBtn = document.getElementById("save-note-btn");

//Confirm Delete Note Modal
const cancelDeleteBtn = document.getElementById("cancel-delete-btn");
const confirmDeleteBtn = document.getElementById("confirm-delete-btn");

//Modals
const noteModal = document.getElementById("note-modal");
const deleteModal = document.getElementById("delete-modal");



createNoteBtn.addEventListener("click", () => {
    openModal(noteModal);
});
cancelNoteBtn.addEventListener("click", () => {
    closeModal(noteModal);
});
saveNoteBtn.addEventListener("click", () => {
    closeModal(noteModal);
});


function openModal(modal){
    modal.classList.add("show");
}

function closeModal(modal){
    modal.classList.remove("show");
}