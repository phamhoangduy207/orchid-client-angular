import { Injectable, NgZone } from '@angular/core';
import { User } from "../models/user";
import { AngularFireAuth } from "@angular/fire/auth";
import firebase from 'firebase/app';
import 'firebase/auth'
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from "@angular/router";
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData: any;
  
  constructor(
    public afs: AngularFirestore,
    public afAuth: AngularFireAuth,
    public router: Router,
    public ngZone: NgZone
  ) {
    this.afAuth.authState.subscribe(user => {
      if(user){
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user'));
      }
      else{
        localStorage.setItem('user', null);
        JSON.parse(localStorage.getItem('user'));
      }
    })
   }

   async SignIn(email: string, password: string) {
    return await this.afAuth.signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.ngZone.run(() => {
          this.router.navigate(['admin/dashboard']);
        });
        this.SetUserData(result.user);
        //console.log(this.userData.displayName);
      }).catch((error) => {
        window.alert(error.message)
      })
  }

   async SignUp(email: string, password: string) {
    return await this.afAuth.createUserWithEmailAndPassword(email, password)
      .then((result) => {
        /* Call the SendVerificaitonMail() function when new user sign
        up and returns promise */
        this.SendVerificationMail();
        this.SetUserData(result.user);
      }).catch((error) => {
        console.log(error.message);
      })
  }

  // Send email verfificaiton when new user sign up
  async SendVerificationMail() {
    return (await this.afAuth.currentUser).sendEmailVerification()
    .then(() => {
      this.router.navigate(['verify-email']);
    })
  }

  // Reset Forggot password
  async ForgotPassword(passwordResetEmail: string) {
    try {
      await this.afAuth.sendPasswordResetEmail(passwordResetEmail);
      window.alert('Password reset email sent, check your inbox.');
    } catch (error) {
      console.log(error);
    }
  }

  // Returns true when user is looged in and email is verified
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return (user !== null /*&& user.email !== false*/) ? true : false;
  }

  // Sign in with Google
  GoogleAuth() {
    return this.AuthLogin(new firebase.auth.GoogleAuthProvider());
  }

  FacebookAuth(){
    return this.AuthLogin(new firebase.auth.FacebookAuthProvider());
  }

  // Auth logic to run auth providers
  async AuthLogin(provider: firebase.auth.AuthProvider) {
    try {
      const result = await this.afAuth.signInWithPopup(provider);
      this.ngZone.run(() => {
        this.router.navigate(['admin/dashboard']);
      });
      this.SetUserData(result.user);
      //console.log(this.userData.displayName);
    } catch (error) {
      console.log(error);
    }
  }

  /* Setting up user data when sign in with username/password,
  sign up with username/password and sign in with social auth
  provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
  SetUserData(user: firebase.User) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified
    }
    return userRef.set(userData, {
      merge: true
    })
  }

  // Sign out
  async SignOut() {
    await this.afAuth.signOut();
    localStorage.removeItem('user');
    this.router.navigate(['login']);
  }
}
