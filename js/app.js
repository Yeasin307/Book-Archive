// searching books using dynamic url

const searchBook = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    searchField.value = '';
    const url = `https://openlibrary.org/search.json?q=${searchText}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displaySearchResult(data));
};

const displaySearchResult = data => {

    // total searching results
    totalItems = data.num_found;
    const totalSearchingItems = document.getElementById('searching-item');
    totalSearchingItems.textContent = "";
    const h3 = document.createElement('h3');
    h3.classList.add('text-center', 'my-3', 'text-primary');
    h3.innerText = `
    Total searching items: ${totalItems}
    `;
    totalSearchingItems.appendChild(h3);

    // error message
    if (totalItems === 0) {
        const h4 = document.createElement('h4');
        h4.classList.add('text-center', 'my-3', 'text-danger');
        h4.innerText = `
        No books found!!! Searching another books.
        `;
        totalSearchingItems.appendChild(h4);
    };

    // get book details
    const books = data.docs;
    // console.log(books.length);
    const searchResult = document.getElementById('search-result');
    searchResult.textContent = '';
    books.forEach(book => {
        // console.log(book);
        const div = document.createElement('div');
        const publisher = publisherName(book?.publisher);
        // console.log(publisher);
        const author = authorName(book?.author_name);
        // console.log(author);
        div.classList.add('col');
        div.innerHTML = `
                <div class="card h-100">
                    <img src=" https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="card-img-top h-50" alt="">
                    <div class="card-body my-5">
                        <h4 class="card-title text-primary">Book Name: ${book.title}</h4>
                        <h5 class="card-title text-dark">Author: ${author}</h5>
                        <h6 class="card-title text-warning">Publisher: ${publisher}</h6>
                        <h6 class="card-title text-info">First Publish: ${book.first_publish_year}</h6>
                    </div>
                </div>
        `;
        searchResult.appendChild(div);
    });
};

const authorName = authors => authors[0];
const publisherName = publishers => publishers[0];

// additional comment added in here