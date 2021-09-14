import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, of as observableOf } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public isLoggedIn$: Observable<boolean>;

  constructor(private authService: AuthService) {
   this.isLoggedIn$= authService.isLoggedIn();
  }

  ngOnInit(): void {

  }

  public loginWithGoogle(): void {
    this.authService.signInWithGoogle();
  }

  public signOut(): any {
    this.authService.signOut();
  }
}
