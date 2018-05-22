import { Injectable } from '@angular/core';

@Injectable()
export class ValidateService {

  constructor() { }

  validateRegister(superUser){
    if(superUser.firstname == undefined || superUser.lastname == undefined || superUser.email == undefined || superUser.username == undefined || superUser.password == undefined)
    {
      return false;
    }
    else
    {
      return true;
    }
  }

  validateLogin(superUser){
    if(superUser.username == undefined || superUser.password == undefined)
    {
      return false;
    }
    else
    {
      return true;
    }
  }

  validateEmail(email){
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  validateSubject(subject){
    if(subject.subjectName == undefined || subject.subjectGrade == undefined || subject.subjectDescription == undefined || subject.subjectCategory == undefined)
    {
      return false;
    }
    else
    {
      return true;
    }
  }

}
