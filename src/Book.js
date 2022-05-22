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
    this.authors = authors;
    this.likedUsers = [];
    this.authors.books.push(this);
    this.publicationBy.myBooks.push(this);
    this.authors.publicationUser.push(publicationBy);
    Object.defineProperty(this, 'suggestedBooks', {
        get() {
            return this.authors.books.filter(item => item.title !== this.title).map(item => item.title).join(',');
        }
    });
    Object.defineProperty(this, 'suggestedPublicators', {
        get() {
            return this.authors.publicationUser.filter(item => item.name !== this.publicationBy.name).map(item => item.name).join(',');
        }
    });
}
