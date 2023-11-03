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
        this.element = document.querySelector('.book-card-template').content.cloneNode(true).firstElementChild;
        this.id = undefined;
        this.update(book);
    }

    update (book) {
        const {title, author, pages, isRead} = book;

        const authorTemp = `BY ${author}`;
        const pagesTemp = `NUMBER OF PAGES: ${pages}`;
        const readStatusTemp = `STATUS: `;

        this.id = title;
        this.element.setAttribute('id', this.id);

        this.element.querySelector('.book-title').textContent = title;
        this.element.querySelector('.book-author').textContent = authorTemp;
        this.element.querySelector('.book-pages').textContent = pagesTemp;
        this.element.querySelector('.status-button').textContent = (isRead) ? readStatusTemp + 'READ' : readStatusTemp + 'NOT READ';
    }

}

// NOTE: Books stored within library and their respective card are linked by the book's title property; 
//       There might be a better implementation then this.
const library = (() => {

    let storage = [];

    const addBook = (book) => {
        storage.push(book);
    }

    const removeBook = (title) => {
        storage = storage.filter(storedBook => !(storedBook.title === title));
    }

    const getBook = (title) => {
        return storage.find(book => (book.title === title));
    }

    // debug
    const printLibrary = () => storage;

    return {addBook, removeBook, getBook, printLibrary};

})();

const libraryController = (() => {

    let cards = [];

    //debug
    const printCards = () => cards;

    const libraryDOM = (function libraryDOM () {

        const removeBookHandler = (cardElement) => {
            const title = cardElement.querySelector('.book-title').textContent;
            library.removeBook(title);

            cardElement.remove();
            cards = cards.filter(card => (card.id === cardElement.id));
        }
    
        const updateBookReadStatusHandler = (cardElement) => {
            const title = cardElement.querySelector('.book-title').textContent;

            const book = library.getBook(title);
            book.toggleReadStatus();
            
            const card = cards.find(card => (card.id === title));
            card.update(book);
            
            cardElement.replaceWith(card.element);
        }
    
        const cardEventDelegator = (e) => {
            const cardElement = e.target.closest('.card')
            if (e.target.classList.contains('remove-button')) removeBookHandler(cardElement);
            if (e.target.classList.contains('status-button')) updateBookReadStatusHandler(cardElement);
        }
    
        let screen = document.querySelector('.book-list');
        screen.addEventListener('click', cardEventDelegator);
    
        return screen;
    })();
    
    (function modalDOM () {

        (function FormDOM () {
    
            const addBookHandler = (e) => {
                e.preventDefault();
                const formData = new FormData(form);
    
                // add book into library
                const book = new Book(formData.get('title'), formData.get('author'), formData.get('Pages'), (formData.get('isRead') === 'true') ? true : false);
                library.addBook(book);
    
                // add card onto screen
                const card = new Card(book);
                libraryDOM.append(card.element);
    
                // store card
                cards.push(card);

                closeDialogHandler();
                form.reset();
            }
        
            const form = document.querySelector('#book-form');
            form.addEventListener('submit', addBookHandler);
        
        })();
    
        const openDialogHandler = () => {
            dialog.showModal();
        }
    
        const closeDialogHandler = () => {
            dialog.close();
        }
    
        const buttonEventDelegator = (e) => {
            if (e.currentTarget.classList.contains('open-form-button')) openDialogHandler();
            if (e.target.classList.contains('cancel-button')) closeDialogHandler();
        }
    
        const button = document.querySelector('.open-form-button');
        button.addEventListener('click', buttonEventDelegator);
    
        const dialog = document.querySelector('dialog');
        dialog.addEventListener('click', buttonEventDelegator);
        
    })();

    return {printCards};
})();

