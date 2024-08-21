export interface Auth {
  email: string;
  password: string;
}
export interface RenewedUser {
  userId : string;
  iat: number;
  exp: number;
}