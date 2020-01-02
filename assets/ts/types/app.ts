export enum LoginStatus {
  success = 0,
  fail = -1
}

export interface ILoginResult {
  loginStatus: LoginStatus;
  message?: string
}
