
export class Song {
    // Methods
    constructor(_song_name, _artist, _recommending_user, _release_year, _description) {
        this._song_name = _song_name;
        this._artist = _artist;
        this._recommeding_user = _recommending_user;
        this._release_year = _release_year;
        this._description = _description;
    }

    get songName() {
        return this._song_name;
    }

    get artist() {
        return this._artist;
    }

    get recommendingUser() {
        return this._recommeding_user;
    }

    get releaseYear() {
        return this._release_year;
    }

    get description() {
        return this._description;
    }
}