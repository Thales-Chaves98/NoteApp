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
const tagList = document.querySelector(".tag-list");

//Confirm Delete Note Modal
const cancelDeleteBtn = document.getElementById("cancel-delete-btn");
const confirmDeleteBtn = document.getElementById("confirm-delete-btn");

//Modals
const noteModal = document.getElementById("note-modal");
const deleteModal = document.getElementById("delete-modal");


const notes = [];
const currentTags = [];



createNoteBtn.addEventListener("click", () => {
    openModal(noteModal);

});
cancelNoteBtn.addEventListener("click", () => {
    closeModal(noteModal);
});

saveNoteBtn.addEventListener("click", saveNote);

addTagBtn.addEventListener("click", addTag);

inputNoteColor.forEach(color =>{
        color.addEventListener("click", selectColor);
});

function openModal(modal){
    modal.classList.add("show");
}

function closeModal(modal){
    modal.classList.remove("show");
    clearNoteForm();
}

function enableCloseOnBackdrop(modal){
    modal.addEventListener("click", (event) => {
        
        if(event.target === modal){
            closeModal(modal);
        }
    });
}

function saveNote(){
    
    if(!validateNoteForm()) return;
    
    const note = createNoteObject();

    notes.push(note);
    
    clearNoteForm();

    closeModal(noteModal);
    
}

function validateNoteForm(){
    let isValid = true;

    const selectedColor = document.querySelector(".color-option.selected");

    if(inputNoteTitle.value.trim() === "") isValid = false;
    if(inputNoteContent.value.trim() === "") isValid = false;
    if(inputNoteCategory.value.trim() === "") isValid = false;
    if(!selectedColor) isValid = false;
    if(currentTags.length === 0) isValid = false;
    

    return isValid;
}

function createNoteObject(){
    const selectedColor = document.querySelector(".color-option.selected");

    const isPinned = false;
    const isFavorite = false;
    const isArchived = false

    const title = inputNoteTitle.value.trim().toUpperCase();
    const content = inputNoteContent.value.trim();
    const category = inputNoteCategory.value;
    const color = selectedColor ? selectedColor.dataset.color : "blue";
    const tags = [...currentTags];
    // const createdAt = we didnt created it yet
    // const updatedAt = we didnt created it yet



    const note = {
        id: Date.now(),
        title,
        content,
        category,
        color,
        tags,
        createdAt: new Date(),
        updatedAt: null,
        isPinned,
        isFavorite,
        isArchived
    }

    return note;
}

function addTag(){
    const tag = inputNoteTag.value.trim().toUpperCase();
    
    if(tag === ""){
        return;
    }
    if(currentTags.includes(tag)){
        return;
    }

    currentTags.push(tag);

    renderTags();
    inputNoteTag.value = "";
}

function removeTag(tag){

    const index = currentTags.indexOf(tag);
    currentTags.splice(index, 1);

    renderTags();
}

function renderTags(){
    tagList.innerHTML = "";

    currentTags.forEach(tag =>{

        const tagElement = document.createElement("span");
        tagElement.classList.add("tag-item");

        const tagText = document.createElement("span");
        tagText.textContent = tag;

        const removeBtn = document.createElement("button");
        removeBtn.classList.add("remove-tag-btn");

        const removeIcon = document.createElement("span");
        removeIcon.classList.add("material-symbols-outlined");
        removeIcon.textContent = "close";

        removeBtn.appendChild(removeIcon);

        removeBtn.addEventListener("click", () => {
            removeTag(tag);
        });

        tagElement.appendChild(tagText);
        tagElement.appendChild(removeBtn);

        tagList.appendChild(tagElement);
    });
}

function selectColor(event){

    inputNoteColor.forEach(color =>{
        color.classList.remove("selected")
    });

    event.target.classList.add("selected");
}

function clearNoteForm(){
    inputNoteTitle.value = "";
    inputNoteContent.value = "";
    inputNoteCategory.value = "";
    inputNoteTag.value = "";
    currentTags.length = 0;
    tagList.innerHTML = "";

    inputNoteColor.forEach(color =>{
        color.classList.remove("selected")
    });
}

function renderNotes(){
    clearNoteForm();
}

enableCloseOnBackdrop(noteModal);
enableCloseOnBackdrop(deleteModal);