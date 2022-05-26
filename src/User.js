import { Book } from './Book.js';

/**
 * @param {string} name
 * @param {Date} date
 * @constructor
 * @property {string} name
 * @property {Date} date
 * @property {Book[]} myBooks
 * @property {User[]} friends
 * @property {Book[]} likes
 */
export function User(name, date) {
    this.name = name;
    this.date = date;
    this.myBooks = [];
    this.friends = [];
    this.likes = [];
    this.addToFriends = function (user) {
        if (this.friends.includes(user)) {
            user.friends.splice(user.friends.indexOf(this), 1);
            this.friends.splice(this.friends.indexOf(user), 1);
        } else {
            user.friends.push(this);
            this.friends.push(user);
        }
    }
    this.removeFriend = this.addToFriends;
    this.likeBook = function (book) {
        if (this.likes.includes(book)) {
            book.likedUsers.splice(book.likedUsers.indexOf(this), 1);
            this.likes.splice(this.likes.indexOf(book), 1);
        } else {
            book.likedUsers.push(this);
            this.likes.push(book);
        }
    }
    this.unlikeBook = this.likeBook;
    Object.defineProperty(this, 'friendsNames', {
        get () {
            return this.friends.map(({name}) => name).join(',');
        }
    });
    Object.defineProperty(this, 'likedBooks', {
        get () {
            return this.likes.map(({title}) => title).join(',');
        }
    });
    Object.defineProperty(this, 'publishedBooks', {
        get () {
            return this.myBooks.map(({title}) => title).join(',');
        }
    });
}
