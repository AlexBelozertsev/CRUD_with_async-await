import './styles.css';

const BASE_URL = 'http://localhost:4040';
//async-await нельзя вызвать вне fn, если такая необходимость есть - пользоваться then-catch
async function addBook(book) {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(book),
  };
    const response = await fetch(`${BASE_URL}/books`, options);
    const newBook = await response.json();
    return newBook; //сама функция асинхронна => вернет промис
};

// try-catch ставить во внешней функции, после объявления функции addBook
// вне тела функции вызов addBook производить с then-catch
async function addBookAndUpdateUI() {
    try {
        const book = await addBook({});
        console.log(book);
    } catch (error) {
        console.log(error);
    }
};

addBookAndUpdateUI();


async function fetchBooks() {
    const resp = await fetch(`${BASE_URL}/books`);
    const books = await resp.json();
  return books;
}

async function fetchBookById(bookId) {
    const resp = await fetch(`${BASE_URL}/books/${bookId}`);
    const book = await resp.json();
  return book;
}

async function removeBook(bookId) {
  const url = `${BASE_URL}/books/${bookId}`;
  const options = {
    method: 'DELETE',
  };

    const resp = await fetch(url, options);
    const remove = await resp.json();
    return remove;
}

async function updateBookById(update, bookId) {
  const options = {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(update),
  };

    const resp = await fetch(`${BASE_URL}/books/${bookId}`, options);
    const updateBook = await resp.json();
  return updateBook;
}
