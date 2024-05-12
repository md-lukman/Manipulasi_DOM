document.addEventListener("DOMContentLoaded", function() {
    membuatBuku();
});

function membuatBuku() {
    const unfinishedList = document.getElementById("unfinished-list");
    const finishedList = document.getElementById("finished-list");

    unfinishedList.innerHTML = "";
    finishedList.innerHTML = "";

    let unfinishedBooks = JSON.parse(localStorage.getItem("unfinishedBooks")) || [];
    let finishedBooks = JSON.parse(localStorage.getItem("finishedBooks")) || [];

    unfinishedBooks.forEach(book => {
        const li = menambahBuku(book, "unfinishedBooks");
        unfinishedList.appendChild(li);
    });

    finishedBooks.forEach(book => {
        const li = menambahBuku(book, "finishedBooks");
        finishedList.appendChild(li);
    });
}

function menambahBuku(book, shelf) {
    const li = document.createElement("li");
    li.dataset.id = book.id; 
    li.innerHTML = `
        <span>ID: ${book.id} - ${book.title} - ${book.author} (${book.year})</span>
        <button class="move-btn" onclick="pindahBuku('${shelf}', ${book.id})">Pindahkan</button>
        <button class="delete-btn" onclick="deleteBook('${shelf}', ${book.id})">Hapus</button>
    `;
    return li;
}
function pindahBuku(sourceShelf, id) {
    let sourceBooks = JSON.parse(localStorage.getItem(sourceShelf)) || [];
    let destinationShelf = sourceShelf === "unfinishedBooks" ? "finishedBooks" : "unfinishedBooks";
    let destinationBooks = JSON.parse(localStorage.getItem(destinationShelf)) || [];
    const index = sourceBooks.findIndex(book => book.id === id);
    if (index !== -1) {
        const [book] = sourceBooks.splice(index, 1);
        destinationBooks.push(book);
        localStorage.setItem(sourceShelf, JSON.stringify(sourceBooks));
        localStorage.setItem(destinationShelf, JSON.stringify(destinationBooks));
        membuatBuku();
    }
}
function deleteBook(shelf, id) {
    let books = JSON.parse(localStorage.getItem(shelf)) || [];
    books = books.filter(book => book.id !== id);
    localStorage.setItem(shelf, JSON.stringify(books));
    membuatBuku();
}

function menambahElemenBuku() {
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const year = document.getElementById("year").value;
    const isComplete = document.getElementById("isComplete").checked;

    const newBook = {
        id: +new Date(),
        title: title,
        author: author,
        year: parseInt(year),
        isComplete: isComplete
    };

    let shelfName = isComplete ? "finishedBooks" : "unfinishedBooks";

    let books = JSON.parse(localStorage.getItem(shelfName)) || [];
    books.push(newBook);
    localStorage.setItem(shelfName, JSON.stringify(books));

    membuatBuku();
    closeModal();
}

function menambahElemenBukuBelumSelesai() {
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const year = parseInt(document.getElementById("year").value);
    const isComplete = document.getElementById("isComplete").checked;

    const newBook = {
        id: +new Date(),
        title: title,
        author: author,
        year: year,
        isComplete: isComplete
    };

    let shelfName = isComplete ? "finishedBooks" : "unfinishedBooks";

    let books = JSON.parse(localStorage.getItem(shelfName)) || [];
    books.push(newBook);
    localStorage.setItem(shelfName, JSON.stringify(books));

    membuatBuku();
    closeModal();
}


function openModal() {
    document.querySelector(".modal-bg").style.display = "flex";
}

function closeModal() {
    document.querySelector(".modal-bg").style.display = "none";
}
