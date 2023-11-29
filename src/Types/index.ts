export interface ICotisation {
    id: string;
    tontine: string;
    cotisation: string;
    createdAt: string;
    user: User;
  }

export interface User{
    firstName:string;
    lastName:string;
    phoneNumber:number;
}  