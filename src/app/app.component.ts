import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'chat';

  constructor(public authService: AuthService) { }

  singInWithGoogle() {
    this.authService.singInWithGoogle();
  }
}
