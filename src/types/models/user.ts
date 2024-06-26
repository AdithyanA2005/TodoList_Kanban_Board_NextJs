export interface IUser {
  $id: string;
  name: string;
  email: string;
  prefs: Record<any, any>;
}
