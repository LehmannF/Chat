export class UserModel {

  public username: string;
  public password: string;

  constructor(username?: string, password?: string) {
    this.username = username;
    this.password = password;
  }

  getUsername(): string {
    return this.username;
  }

}
