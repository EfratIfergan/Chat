import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, of as observableOf, Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  private subscription: Subscription = new Subscription();
  public isLoggedIn: boolean = false;

  constructor(private authService: AuthService) {
  }
  
  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

  ngOnInit(): void {
    this.subscription.add(
      this.authService.isLoggedIn().subscribe(data => {
        this.isLoggedIn = data
      })
    )
  }

  public loginWithGoogle(): void {
    this.authService.signInWithGoogle();
  }

  public signOut(): any {
    this.authService.signOut();
  }
}
