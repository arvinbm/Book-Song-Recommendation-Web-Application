
export class UserController {
    // Attributes
    users = [];

    // Methods
    constructor() {
        this.users = JSON.parse(localStorage.userArray || '[]');
    }

    addUser(user) {
        this.users.push(user);
        localStorage.userArray = JSON.stringify(this.users);
    }

    getAllUsers() {
        return JSON.parse(localStorage.userArray);
    }
}