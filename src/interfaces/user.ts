export interface IUser {
  id: number;
  name: string;
  email: string;
  role: string;
  token: string;
  last_access: Date;
}