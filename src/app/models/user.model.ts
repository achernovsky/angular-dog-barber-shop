export class User {
    constructor(public userid: string, public username: string, private _token: string) {

    }

    get token() {
        return this._token
    }
}