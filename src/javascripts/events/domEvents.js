import addBookForm from '../components/forms/addBookForm';
import {
  createBook,
  deleteBook,
  getSingleBook,
  updateBook
} from '../helpers/data/bookData';
import { showBooks } from '../components/books';
import addAuthorForm from '../components/forms/addAuthorForm';
import { showAuthors } from '../components/authors';
import {
  // deleteAuthor,
  createAuthor,
  getSingleAuthor,
  updateAuthor,
  deleteSingleAuthor
} from '../helpers/data/authorData';
import viewBook from '../components/viewBook';
import { viewBookDetails } from '../helpers/data/mergedData';

const domEvents = () => {
  document.querySelector('#main-container').addEventListener('click', (e) => {
    // CLICK EVENT FOR DELETING A BOOK
    if (e.target.id.includes('delete-book')) {
      // eslint-disable-next-line no-alert
      if (window.confirm('Want to delete?')) {
        // console.warn('CLICKED DELETE BOOK', e.target.id);
        // console.warn(e.target.id.split('--'));
        const [, id] = e.target.id.split('--');

        deleteBook(id).then(showBooks);
      }
    }

    // CLICK EVENT FOR SHOWING FORM FOR ADDING A BOOK
    if (e.target.id.includes('add-book-btn')) {
      addBookForm();
    }

    // CLICK EVENT FOR SUBMITTING FORM FOR ADDING A BOOK
    if (e.target.id.includes('submit-book')) {
      e.preventDefault();
      const bookObject = {
        title: document.querySelector('#title').value,
        image: document.querySelector('#image').value,
        price: document.querySelector('#price').value,
        sale: document.querySelector('#sale').checked,
        author_id: document.querySelector('#author_id').value
      };

      createBook(bookObject).then((booksArray) => showBooks(booksArray));
    }

    // CLICK EVENT EDITING/UPDATING A BOOK
    if (e.target.id.includes('edit-book-btn')) {
      const [, id] = e.target.id.split('--');
      getSingleBook(id).then((bookObj) => addBookForm(bookObj));
    }

    // CLICK EVENT FOR EDITING A BOOK
    if (e.target.id.includes('update-book')) {
      e.preventDefault();
      const [, firebaseKey] = e.target.id.split('--');
      const bookObject = {
        title: document.querySelector('#title').value,
        image: document.querySelector('#image').value,
        price: document.querySelector('#price').value,
        sale: document.querySelector('#sale').checked,
        author_id: document.querySelector('#author_id').value,
        description: document.querySelector('#description').value,
        firebaseKey
      };

      updateBook(bookObject).then(showBooks);
    }

    // ADD CLICK EVENT FOR DELETING AN AUTHOR
    if (e.target.id.includes('delete-author')) {
      // eslint-disable-next-line no-alert
      if (window.confirm('Want to delete and books?')) {
        console.warn('CLICKED DELETE AUTHOR', e.target.id);
        console.warn(e.target.id.split('--'));
        const [, id] = e.target.id.split('--');

        // deleteSingleAuthor(id).then(showAuthors);
      }
    }

    // ADD CLICK EVENT FOR SHOWING FORM FOR ADDING AN AUTHOR
    if (e.target.id.includes('add-author-btn')) {
      addAuthorForm();
    }

    // ADD CLICK EVENT FOR SUBMITTING FORM FOR ADDING AN AUTHOR
    if (e.target.id.includes('submit-author')) {
      e.preventDefault();
      const authorObject = {
        email: document.querySelector('#email').value,
        first_name: document.querySelector('#first_name').value,
        last_name: document.querySelector('#last_name').value,
        favorite: document.querySelector('#favorite').checked
      };

      createAuthor(authorObject).then(showAuthors);
    }
    // ADD CLICK EVENT FOR EDITING AN AUTHOR
    if (e.target.id.includes('edit-author-btn')) {
      const [, id] = e.target.id.split('--');
      getSingleAuthor(id).then((authorObj) => addAuthorForm(authorObj));
    }

    // CLICK EVENT FOR EDITING A BOOK
    if (e.target.id.includes('update-author')) {
      e.preventDefault();
      const [, firebaseKey] = e.target.id.split('--');
      const authorObject = {
        email: document.querySelector('#email').value,
        first_name: document.querySelector('#first_name').value,
        last_name: document.querySelector('#last_name').value,
        favorite: document.querySelector('#favorite').checked,
        firebaseKey
      };
      updateAuthor(authorObject).then(showAuthors);
    }

    if (e.target.id.includes('view-book-btn')) {
      const [, firebaseKey] = e.target.id.split('--');
      viewBookDetails(firebaseKey).then(viewBook);
    }

    if (e.target.id.includes('view-author-btn')) {
      console.warn('test');
      // const [, firebaseKey] = e.target.id.split('--');
      // viewAuthorDetails(firebaseKey).then(viewAuthor);
    }
  });
};

export default domEvents;
