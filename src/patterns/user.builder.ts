import { User, UserModel } from '../model/user.model';

interface IUserInfo {
  name: string;
  email: string;
  id: string;
  createDate: string;
}

export class UserInterface {
  private userInfo: IUserInfo = {
    createDate: '',
    email: '',
    id: '',
    name: '',
  };
  public setName(name: string) {
    this.userInfo.name = name;
    return this;
  }
  public setEmail(email: string) {
    this.userInfo.email = email;
    return this;
  }
  public setUserId(id: string) {
    this.userInfo.id = id;
    return this;
  }
  public setCreateDate(createDate: string) {
    this.userInfo.createDate = createDate;
    return this;
  }
  public getUserInfo() {
    return this.userInfo;
  }
}

export class UserBuilder extends UserModel {
  protected email: string = '';
  protected name: string = '';
  protected password: string = '';
  protected id: string = '';
  protected create_date: string = '';
  protected update_date?: string;
  public setCreateDate(create_date: string): UserBuilder {
    this.create_date = create_date;
    return this;
  }
  public setEmail(email: string): UserBuilder {
    this.email = email;
    return this;
  }
  public setName(name: string): UserBuilder {
    this.name = name;
    return this;
  }
  public setPassword(password: string): UserBuilder {
    this.password = password;
    return this;
  }
  public setUpdateDate(update_date?: string): UserBuilder {
    if (update_date) {
      this.update_date = update_date;
    }
    return this;
  }
  public setUserId(id: string): UserBuilder {
    this.id = id;
    return this;
  }
  public async excuteCreateUser() {
    return await User.create({
      create_date: this.create_date,
      email: this.email,
      id: this.id,
      name: this.name,
      password: this.password,
    });
  }
  public async excuteUpdateUser() {
    if (!this.update_date) {
      throw new Error('Error from server: Update user must be has update date');
    }
    return await User.update(
      {
        name: this.name,
        password: this.password,
        update_date: this.update_date,
      },
      { where: { id: this.id } }
    );
  }
  public async excuteGetUserInfoFromId() {
    if (!this.id) {
      throw new Error(
        'ExcuteGetUserInfo Error, no have user id, please set user id'
      );
    }
    return await User.findOne({ where: { id: this.id } });
  }
  public async excuteGetUserInfoFromEmail() {
    if (!this.email) {
      throw new Error(
        'ExcuteGetUserInfo Error, no have email, please set email'
      );
    }
    return await User.findOne({ where: { email: this.email } });
  }
}
