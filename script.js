const myLibrary = [];

const addButton = document.querySelector('.add-button');
const closeButton = document.querySelector('.cancel-button');
const dialog = document.querySelector('dialog');

addButton.addEventListener('click', () => dialog.showModal());
closeButton.addEventListener('click', () => dialog.close());

console.log(closeButton)


function book(author, title, numOfPages, isRead) {
    this.author = author;
    this.title = title;
    this.numOfPages = numOfPages;
    this.isRead = isRead;
}

function addBookToLibrary() {
    
}