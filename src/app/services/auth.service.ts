import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { BehaviorSubject, Observable, Subject, of as observableOf } from 'rxjs';
import { User } from '../models/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isLoggedIn$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private userDetails$: Subject<User | undefined> = new Subject<User | undefined>();

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router) {
    const saveUserString = localStorage.getItem('user');
    if (saveUserString != null)
      this.isLoggedIn$.next(true);
    afAuth.authState.subscribe(user => {
      if (!!user) {
        this.userDetails$.next(user as User);
        const userString: string = JSON.stringify(user);
        localStorage.setItem('user', userString);
        this.isLoggedIn$.next(true);
      }
      else {
        localStorage.removeItem('user');
        this.isLoggedIn$.next(false);
      }
    })
  }

  public isLoggedIn(): Observable<boolean> {
    return this.isLoggedIn$.asObservable();
  }

  public signInWithGoogle() {
    this.authLogin(new firebase.default.auth.GoogleAuthProvider());
  }

  public signOut(): Promise<void> {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['/']);
      this.userDetails$.next(undefined);
    });
  }

  private setUserData(user?: User): Promise<void> | void {
    if (!user) return;
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(
      `users/${user?.uid}`
    )

    const userData: User = {
      uid: user.uid,
      email: user.email,
      photoURL: user.photoURL,
      displayName: user.displayName
    }

    return userRef.set(userData, {
      merge: true
    })
  }

  private authLogin(provider: firebase.default.auth.AuthProvider) {
    return this.afAuth.signInWithPopup(provider).then(res => {
      this.isLoggedIn$.next(true);
      this.setUserData(res.user as User);
      this.router.navigate(['Chat']);
    })
  }
}
