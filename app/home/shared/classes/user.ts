export class User{
    token: number;
    email: string;
    password: string;
    logo: string;
    passwordCheck: string;
    id: number
    name: string;

    constructor(mail: string,password: string,passwordCheck: string){
        this.password = password;
        this.email = mail;
        this.passwordCheck = passwordCheck;
    }
}