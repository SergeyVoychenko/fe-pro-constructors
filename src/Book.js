import { Author } from './Author.js';
import { User } from './User.js';

/**
 * @param {string} title
 * @param {Date} year
 * @param {User} publicationBy
 * @param {Author[]} authors
 * @constructor
 * @property {string} title
 * @property {Date} year
 * @property {Author[]} authors
 * @property {User[]} likedUsers
 * @property {User} publicationBy
 */
export function Book(title, year, publicationBy, authors) {
    this.title = title;
    this.year = year;
    this.publicationBy = publicationBy;
    this.authors = [];
    this.likedUsers = [];
    this.authors.push(authors);
    authors.books.push(this);
    this.publicationBy.myBooks.push(this);
    authors.publicationUser.push(publicationBy);
    Object.defineProperty(this, 'suggestedBooks', {
        get() {
            return this.authors[0].books.filter(item => item.title !== this.title).map(item => item.title).join(',');
        }
    });
    Object.defineProperty(this, 'suggestedPublicators', {
        get() {
            return this.authors[0].publicationUser.filter(item => item.name !== this.publicationBy.name).map(item => item.name).join(',');
        }
    });
}
