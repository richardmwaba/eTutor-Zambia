import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import firebase from 'firebase/app';


@Injectable()
export class AuthProvider {

  constructor(public afAuth: AngularFireAuth) {

  }

  //Login user
  loginUser(newEmail: string, newPassword: string): firebase.Promise<any> {
    return this.afAuth.auth.signInWithEmailAndPassword(newEmail, newPassword);
  }

  //Reset password
  resetPassword(email: string): firebase.Promise<any> {
    return this.afAuth.auth.sendPasswordResetEmail(email);
  }

  //Logout user
  logoutUser(): firebase.Promise<any> {
    return this.afAuth.auth.signOut();
  }

  //Register new user
  signupUser(newEmail: string, newPassword: string): firebase.Promise<any> {
    return this.afAuth.auth.createUserWithEmailAndPassword(newEmail, newPassword);
  }


}
