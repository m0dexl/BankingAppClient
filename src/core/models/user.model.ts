export class User {
  id: number = 0;
  userName: string = '';
  fullName: string = '';
  email: string = '';
  userType: UserType = 0;
}

export enum UserType {
  Admin,
  Employee,
  Customer,
}
