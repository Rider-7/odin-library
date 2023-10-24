const myLibrary = [];

const openFormButton = document.querySelector('.open-form-button');
const closeFormButton = document.querySelector('.cancel-button');
const addBookButton = document.querySelector('.add-button')
const dialog = document.querySelector('dialog');

openFormButton.addEventListener('click', () => dialog.showModal());
closeFormButton.addEventListener('click', () => dialog.close());

const bookForm = document.getElementById('book-form');

function Book(title, author, numOfPages, isRead) {
    this.title = title;
    this.author = author;
    this.numOfPages = numOfPages;
    this.isRead = isRead;
}

function addNewBookCardDOM(book) {
    const bookCardTemplate = document.querySelector('.book-card-template');
    const bookList = document.querySelector('.book-list');

    const newBookCard = bookCardTemplate.content.cloneNode(true);
    
    newBookCard.querySelector('.book-title').innerText=`${book['title']}`;
    newBookCard.querySelector('.book-author').textContent=`BY ${book['author']}`;
    newBookCard.querySelector('.book-pages').textContent=`NUMBER OF PAGES: ${book['numOfPages']}`;

    const readStatus = book['isRead'] ? 'READ' : 'NOT READ';
    newBookCard.querySelector('.book-status').textContent=`STATUS: ${readStatus}`;

    bookList.appendChild(newBookCard);

}

function addBookToLibrary() {
    const book = new Book();
    const formData = new FormData(bookForm);
    for (const [name, value] of formData) {
        book[name] = value;
    }
    myLibrary.push(book);
    addNewBookCardDOM(book);
}

bookForm.addEventListener('submit', (e) => {
    e.preventDefault();
    addBookToLibrary();
});


