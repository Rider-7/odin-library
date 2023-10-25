// Book Object - Temporary Storage
const myLibrary = [];

// Book Object - Constructor
function Book(title, author, numOfPages, isRead) {
    this.title = title;
    this.author = author;
    this.numOfPages = numOfPages;
    this.isRead = isRead;
}


// Book Object - Storage Functions
function addBookToLibrary() {
    const book = new Book();
    const formData = new FormData(bookFormEl);
    for (const [name, value] of formData) {
        book[name] = value;
    }
    myLibrary.push(book);
}

function removeBookFromLibrary(bookTitle) {
    for (const book of myLibrary) {
        if (book.title === bookTitle) {
            idx = myLibrary.indexOf(book);
            myLibrary.splice(idx, 1);
        }
    }
}

// Book Card Element - Dynamic DOM Functions
function addnewBookCardEl(book) {
    const bookCardTemplateEl = document.querySelector('.book-card-template');
    const bookListEl = document.querySelector('.book-list');

    const newBookCardEl = bookCardTemplateEl.content.cloneNode(true);
    
    newBookCardEl.querySelector('.book-title').textContent=`${book['title']}`;
    newBookCardEl.querySelector('.book-author').textContent=`BY ${book['author']}`;
    newBookCardEl.querySelector('.book-pages').textContent=`NUMBER OF PAGES: ${book['numOfPages']}`;
    const readStatus = book['isRead'] ? 'READ' : 'NOT READ';
    newBookCardEl.querySelector('.book-status').textContent=`STATUS: ${readStatus}`;

    bookListEl.appendChild(newBookCardEl);
}

function removeBookCardEl(bookCardEl) {
    bookCardEl.remove();
}



// Event Listeners/ Handling

// Modal Dialog - Opening/Closing Element
const openFormButtonEl = document.querySelector('.open-form-button');
const closeFormButtonEl = document.querySelector('.cancel-button');
const dialogEl = document.querySelector('dialog');
openFormButtonEl.addEventListener('click', () => dialogEl.showModal());
closeFormButtonEl.addEventListener('click', () => dialogEl.close());

// Form - Submit Input
const addBookButtonEl = document.querySelector('.add-button')
const bookFormEl = document.getElementById('book-form');
bookFormEl.addEventListener('submit', (e) => {
    e.preventDefault();
    addBookToLibrary();
    addnewBookCardEl(myLibrary[myLibrary.length-1]);
    dialogEl.close();
    console.log(myLibrary);
});

// Book Card - Remove Card
const bookListEl = document.querySelector('.book-list');
bookListEl.addEventListener('click', (e) => {
    if (e.target.className === 'remove-button') {
        const bookTitle = e.target.closest('.book').querySelector('.book-title').textContent;
        const bookCardEl = e.target.closest('.card');
        removeBookFromLibrary(bookTitle);
        removeBookCardEl(bookCardEl);
        console.log(myLibrary);
        }
    });