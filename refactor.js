class Book {

    constructor (title, author, pages, isRead) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.isRead = isRead;
    }

    toggleReadStatus () {
        this.isRead = !this.isRead;
    }

}

class Card {
    
    constructor (book) {
        this.card = document.querySelector('.book-card-template').content.cloneNode(true);

        this.title = this.card.querySelector('.book-title');
        this.author = this.card.querySelector('.book-author');
        this.pages = this.card.querySelector('.book-pages');
        this.readStatus = this.card.querySelector('.status-button');

        this.update(book);
    }

    update (book) {
        const {title, author, pages, isRead} = book;

        this.title.textContent = title;
        this.author.textContent = author;
        this.pages.textContent = pages; 
        this.readStatus.textContent = (isRead) ? 'READ' : 'NOT READ';
    }

}

const library = (class Library {

    constructor () {
        this.storage = [];
    }

    addBook (book) {
        this.storage.push(book);
    }

    removeBook (title) {
        this.storage = this.storage.filter(storedBook => !(storedBook.title === title));
    }

    getBook (title) {
        return this.storage.find(book => book.title === title);
    }

})();

const libraryDOM = (class LibraryDOM {

    constructor () {
        let screen = document.querySelector('.book-list');
        screen.addEventListener('click', this.cardEventDelegator);
    }

    removeBookHandler (card) {
        // remove book from library
        library.removeBook(card.title);

        // remove card from screen
        card.remove();
    }

    updateBookReadStatusHandler(card) {
        // update book in library
        const book = library.getBook(card);
        book.toggleReadStatus();

        // update card on screen
        card.update(book);
    }

    cardEventDelegator (e) {
        if (e.target.classList.contains('remove-button')) this.removeBookHandler(e.target);
        if (e.target.classList.contains('status-button')) this.updateBookReadStatusHandler(e.target);
    }

})();

const formDOM = (class FormDOM {
    
    constructor () {
        let form = document.querySelector('.book-form');
        form.addEventListener('submit', this.addBookHandler);
    }

    addBookHandler (e) {
        e.preventDefault();
        const formData = new FormData(form);

        const book = new Book(formData.get('title'), formData.get('author'), formData.get('Pages'), (formData.get('isRead') === 'true') ? true : false);
        // add book into library
        library.addBook(book);
        // add card onto screen
        this.screen.appendChild(new Card(book));
    }

})();

const dialogDOM = (class modalDOM {

    constructor () {
        let dialog = document.querySelector('dialog');
        dialog.addEventListener('click', this.butonEventDelegator);
    }

    openDialogHandler () {
        dialog.showModal();
    }

    closeDialogHandler () {
        dialog.close();
    }

    butonEventDelegator (e) {
        if (e.target.classList.contains('.open-form-button')) this.openDialogHandler();
        if (e.target.classList.contains('.cancel-button')) this.closeDialogHandler();
    }
    
})();