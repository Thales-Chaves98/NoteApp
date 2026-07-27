//Header
const searchInput = document.querySelector(".search-input");
const themeBtn = document.querySelector(".theme-toggle");
 
//Toolbar
const createNoteBtn = document.querySelector(".create-note-btn");
const filterTabs = document.querySelectorAll(".filter-tab");
const sortSelect = document.querySelector(".sort-select");

//Note Content
const noteTitle = document.querySelector(".note-title");
const noteText = document.querySelector(".note-text");
const noteCategory = document.querySelector(".note-category");
const noteTags = document.querySelector(".note-tags");
const noteDates = document.querySelector(".note-dates");
//Note Container
const noteContainer = document.getElementById("notes-container");

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

    closeModal(noteModal);

    renderNotes();
    
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

function createNoteCard(note){

    const noteCardElement = document.createElement("article");
    noteCardElement.classList.add("note-card");

    //Note Header Element
    const noteHeaderElement = document.createElement("div");
    noteHeaderElement.classList.add("note-header");
    noteHeaderElement.dataset.color = note.color;

    const pinBtnElement = document.createElement("button");
    pinBtnElement.classList.add("pin-btn");
    const pinIcon = document.createElement("span");
    pinIcon.classList.add("material-symbols-outlined", "icon-outline");
    pinIcon.textContent = "keep";
    

    const favoriteBtnElement = document.createElement("button");
    favoriteBtnElement.classList.add("favorite-btn");
    const favoriteIcon = document.createElement("span");
    favoriteIcon.classList.add("material-symbols-outlined", "icon-outline");
    favoriteIcon.textContent = "star";

    pinBtnElement.addEventListener("click", () => {
        note.isPinned = !note.isPinned;

        updateIcon(pinIcon, note.isPinned);
    });

    favoriteBtnElement.addEventListener("click", () => {
        note.isFavorite = !note.isFavorite;

        updateIcon(favoriteIcon, note.isFavorite);
    });

    const noteMenuBtnElement = document.createElement("button");
    noteMenuBtnElement.classList.add("note-menu-btn");
    const menuVertIcon = document.createElement("span");
    menuVertIcon.classList.add("material-symbols-outlined");
    menuVertIcon.textContent = "more_vert";

    const menuElement = createNoteMenu(note);

    noteMenuBtnElement.addEventListener("click", () =>{
        const isOpen = menuElement.classList.contains("show");

        document.querySelectorAll(".note-menu").forEach(menu =>{
            menu.classList.remove("show");
        });

        if(!isOpen){
            menuElement.classList.add("show");
        }
    });

    updateIcon(pinIcon, note.isPinned);
    updateIcon(favoriteIcon, note.isFavorite);

    //Note Content Element
    const noteContentElement = document.createElement("div")
    noteContentElement.classList.add("note-content");

    const noteTitleElement = document.createElement("div")
    noteTitleElement.classList.add("note-title");
    const titleTextElement = document.createElement("h2")
    titleTextElement.textContent = note.title;

    const noteTextElement = document.createElement("div")
    noteTextElement.classList.add("note-text");
    const contentTextElement = document.createElement("p");
    contentTextElement.textContent = note.content;

    const noteCategoryElement = document.createElement("div")
    noteCategoryElement.classList.add("note-category");
    const noteCategoryTextElement = document.createElement("span");
    noteCategoryTextElement.textContent = note.category;

    const noteTagsElement = document.createElement("div")
    noteTagsElement.classList.add("note-tags");

    note.tags.forEach(tag =>{
        const tagElement = document.createElement("span");
        tagElement.classList.add("tag-item");
        tagElement.textContent = `#${tag}`;
        noteTagsElement.appendChild(tagElement);
    })

    const noteDatesElement = document.createElement("div");
    noteDatesElement.classList.add("note-dates");
    const createdAtDateElement = document.createElement("small");
    createdAtDateElement.textContent = `Criada: ${formatDate(note.createdAt)}`;
    noteDatesElement.appendChild(createdAtDateElement);

    if(note.updatedAt){
        const updatedAtDateElement = document.createElement("small");
        updatedAtDateElement.textContent = `Editada: ${formatDate(note.updatedAt)}`;
        noteDatesElement.appendChild(updatedAtDateElement);
    }


    //Card Element
    noteCardElement.append(noteHeaderElement);
    noteCardElement.append(noteContentElement);

    //Card Header Element
    noteHeaderElement.appendChild(pinBtnElement);
    pinBtnElement.appendChild(pinIcon);

    noteHeaderElement.appendChild(favoriteBtnElement);
    favoriteBtnElement.appendChild(favoriteIcon);

    noteHeaderElement.appendChild(noteMenuBtnElement);
    noteMenuBtnElement.appendChild(menuVertIcon);

    noteHeaderElement.appendChild(menuElement);

    //Card Content Element
    noteContentElement.appendChild(noteTitleElement);
    noteTitleElement.append(titleTextElement);

    noteContentElement.appendChild(noteTextElement);
    noteTextElement.appendChild(contentTextElement);

    noteContentElement.appendChild(noteCategoryElement);
    noteCategoryElement.appendChild(noteCategoryTextElement);

    noteContentElement.appendChild(noteTagsElement);
    

    noteContentElement.appendChild(noteDatesElement);

    return noteCardElement;
}
function renderNotes(){

    noteContainer.innerHTML = "";

    notes.forEach(note =>{
        const card = createNoteCard(note);
        console.log(note);

        noteContainer.appendChild(card);
    });
}

function formatDate(date){
    return date.toLocaleString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
    });
}

function updateIcon(icon, state){
    icon.style.fontVariationSettings = `"FILL" ${state ? 1 : 0}`;
};

function createNoteMenu(note){

    const menuElement = document.createElement("div");
    menuElement.classList.add("note-menu");

    const editBtnElement = document.createElement("button");
    const editIconElement = document.createElement("span")
    editBtnElement.classList.add("menu-item");
    editIconElement.textContent = "stylus";
    editIconElement.classList.add("material-symbols-outlined");
    editBtnElement.appendChild(editIconElement);
    editBtnElement.append("Editar")

    const archiveBtnElement = document.createElement("button");
    const archiveIconElement = document.createElement("span");
    archiveBtnElement.classList.add("menu-item");
    archiveIconElement.textContent = "package_2";
    archiveIconElement.classList.add("material-symbols-outlined");
    archiveBtnElement.appendChild(archiveIconElement);
    archiveBtnElement.append("Arquivar");

    const deleteBtnElement = document.createElement("button");
    const deleteIconElement = document.createElement("span");
    deleteBtnElement.classList.add("menu-item");
    deleteIconElement.textContent = "delete_forever";
    deleteIconElement.classList.add("material-symbols-outlined");
    deleteBtnElement.appendChild(deleteIconElement);
    deleteBtnElement.append("Deletar");


    menuElement.appendChild(editBtnElement);
    menuElement.appendChild(archiveBtnElement);
    menuElement.appendChild(deleteBtnElement);
    
    return menuElement;
}

enableCloseOnBackdrop(noteModal);
enableCloseOnBackdrop(deleteModal);