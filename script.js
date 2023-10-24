const myLibrary = [];

const openFormButton = document.querySelector('.open-form-button');
const closeFormButton = document.querySelector('.cancel-button');
const addBookButton = document.querySelector('.add-button')
const dialog = document.querySelector('dialog');

openFormButton.addEventListener('click', () => dialog.showModal());
closeFormButton.addEventListener('click', () => dialog.close());

const bookForm = document.getElementById('book-form');
const bookList = document.querySelector('.book-list');

function Book(title, author, numOfPages, isRead) {
    this.title = title;
    this.author = author;
    this.numOfPages = numOfPages;
    this.isRead = isRead;
}

function addBookToLibrary() {
    const book = new Book();
    const formData = new FormData(bookForm);
    for (const [name, value] of formData) {
        book[name] = value;
    }
    myLibrary.push(book);
}

bookForm.addEventListener('submit', (e) => {
    e.preventDefault();
    addBookToLibrary();
});


