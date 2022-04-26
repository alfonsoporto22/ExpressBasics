export class User {
    constructor( {name, password} ) {
        this.name = name;
        this.password = password;
        this.id = Date.now();
    }
}

export const users = [];