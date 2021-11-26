import { Injectable } from '@angular/core';

export interface IProfile {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  age: number;
}

@Injectable({ providedIn: 'root' })
export class ProfileService {
  public user: IProfile|undefined;
  constructor() { }

  getProfileUser(): Promise<IProfile>{
    return new Promise((resolve, reject) =>{
      setTimeout(() => {
        if(Math.round(Math.random())){
          this.user = {
            firstName: 'Michael',
            lastName: 'Collins',
            username: 'michael.collins',
            email: 'michael.collins@blueface.com',
            age: 30
          };
          resolve(this.user);
        } else {
          reject({ error: 'Profile not found' });
        }
      }, Math.random() * 5000);
    });
  }

  setName(userdata:IProfile) {
    return new Promise((resolve, reject)=>{
      setTimeout(()=> {
        if(Math.round(Math.random())){
          if(this.user){
            this.user.firstName = JSON.parse(JSON.stringify(userdata.firstName));
            this.user.lastName = JSON.parse(JSON.stringify(userdata.lastName));
            resolve(this.user);
          }
        }else{
          reject({ error: 'Invalid name' });
        }
      }, Math.random() * 5000);
    });
  }

  setUserEmail(userdata:IProfile){
    return new Promise((resolve, reject)=>{
      setTimeout(()=> {
        if(Math.round(Math.random())){
          if(this.user){
            // lowercase firstname and last name then remove all white space
            let userFirstName = (userdata.firstName.toLocaleLowerCase()).replace(/\s/g,'');
            let userLastName = (userdata.lastName.toLocaleLowerCase()).replace(/\s/g,'');
            // generate user email by concatinating firstname and last name
            this.user.email = userFirstName+"."+userLastName+"@​blueface.com";
            resolve(this.user);
          }
        }else{
          reject({ error: 'Error on email generation' });
        }
      }, Math.random() * 5000);
    });
  }
}
