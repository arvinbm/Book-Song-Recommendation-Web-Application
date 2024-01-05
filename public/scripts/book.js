
export class Book {
    // Methods
    constructor(_book_name, _author, _recommending_user, _publish_year, _description) {
        this._book_name = _book_name;
        this._author = _author;
        this._recommeding_user = _recommending_user;
        this._publish_year = _publish_year;
        this._description = _description;
    }

    get bookName() {
        return this._book_name;
    }

    get author() {
        return this._author;
    }

    get recommendingUser() {
        return this._recommeding_user;
    }

    get releaseYear() {
        return this._publish_year;
    }

    get description() {
        return this._description;
    }
}