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
    this.publicationBy.myBooks.push(this);
    this.authors.forEach(({ books }) => books.push(this));
    Object.defineProperty(this, 'suggestedBooks', {
        get() {

            return [...new Set(this.authors.reduce((acum, { books }) => {
                return acum.concat(books);
            }, []))].filter(({ title }) => title !== this.title).map(({ title }) => title).join(', ');
        }
    });
    Object.defineProperty(this, 'suggestedPublicators', {
        get() {
            const name = this.authors.reduce((acum, { books }) => {
                return acum.concat(books);
            }, []).reduce((acum, { publicationBy }) => {
                return acum.concat(publicationBy.name);
            }, []).filter((name) => name !== this.publicationBy.name);
            let names = [...new Set(name)].map((name) => name).join(', ');
            return names;
        }
    });
}
