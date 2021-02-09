import { AngularFireAuthModule } from '@angular/fire/auth';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { resolve } from 'url';
import { reject } from 'q';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  isLoggenId = false; //verifica se o usuario esta logado;
  authState: any = null;

  constructor(
    private afAuth: AngularFireAuthModule,
    private router: Router) {
    /*this.afAuth.authState.subscribe((auth) => {
      this.authState = auth
    });*/

  }

  registerUser(user) {
    return new Promise<any>((resolve, reject) => {
      firebase.auth().createUserWithEmailAndPassword(user.email, user.password).then(
        res => resolve(res),
        err => reject(err)
      )
    });
  }

  loginUser(user) {
    return new Promise<any>((resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(user.email, user.password).then(
        res => resolve(res),
        err => reject(err)
      )
    });
  }

  logouUser() {
    return new Promise<any>((resolve, reject) => {
      if (firebase.auth().currentUser) {
        firebase.auth().signOut().then(() => {
          this.setLoggedIn(false);
          console.log("log out");
          resolve();
        }).catch((erro) => {
          reject();
        });
      }
    });
  }

  setLoggedIn(value) {
    this.isLoggenId = value;
  }

  isAuthentication(): boolean {
    return this.isLoggenId;
  }

  userDetails() {
    return firebase.auth().currentUser;
  }
}
