const form = document.querySelector("form");
const btn = document.querySelector(".btn");
const main = document.querySelector("main");
const table = document.getElementById("table");
const bookList = document.querySelector(".book-list");



class Book {
    constructor(title, author, edition) {
        this.title = title;
        this.author = author;
        this.edition = edition;
    }
    addToList(book) {
        const tr = document.createElement("tr");
        tr.innerHTML = `<td>${book.title}</td>
                        <td>${book.author}</td>
                        <td>${book.edition}</td>
                        <a href='#' class = 'delete'>X</a>`;
        table.appendChild(tr);
    };
    static showAddedAlert() {
        const h6 = document.createElement("h6");
        h6.textContent = "Book added sucesfully";
        h6.classList.add("added");
        main.insertBefore(h6, form);
        setTimeout(() => main.removeChild(h6), 2000);
    };
    static clearInputs = function() {
        document.querySelector(".book-title").value = "";
        document.querySelector(".author").value = "";
        document.querySelector(".edition").value = "";
    };
    static showErrorAlert() {
        const h6 = document.createElement("h6");
        h6.textContent = "Invalid input";
        h6.classList.add("error");
        main.insertBefore(h6, form);
        setTimeout(() => main.removeChild(h6), 2500);
    };
    static deleteBook(book) {
        if (book.target.classList.contains("delete")) {
            const event = book.target.parentElement;
            table.removeChild(event)
        };
    };
};

class Store {
    static getBooks() {
        let books;
        if (localStorage.getItem("books") === null) {
            books = [];
        } else {
            books = JSON.parse(localStorage.getItem("books"));
        }
        return books;
    }
    static displayBooks() {
        const books = Store.getBooks();
        const book = new Book;
        books.forEach(Element => {
            book.addToList(Element);
        });
    };
    static addBook(book) {
        const books = Store.getBooks();
        books.push(book);
        localStorage.setItem("books", JSON.stringify(books));
    };
    static removeBook(book) {
        const books = Store.getBooks();
        const book_title = book.target.parentElement.firstChild.textContent;
        books.forEach(Element => {
            if (Element.title === book_title) {
                books.splice(books.indexOf(Element), 1);
            };
        });
        localStorage.setItem("books", JSON.stringify(books));
    };
}
Store.displayBooks();
form.addEventListener("submit", (e) => {
    e.preventDefault();
    const title = document.querySelector(".book-title").value;
    const author = document.querySelector(".author").value;
    const edition = document.querySelector(".edition").value;
    const book = new Book(title, author, edition);
    if (title && author && edition) {
        book.addToList(book);
        Book.clearInputs();
        Book.showAddedAlert();
        Store.addBook(book);
    } else {
        Book.showErrorAlert();
        Book.clearInputs();
    }
});
bookList.addEventListener('click', (e) => {
    Book.deleteBook(e);
    Store.removeBook(e);
})