import { Component } from '@angular/core';
import { Router, RouterOutlet} from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Easypay-app';
  userRole: string | null = null;

  constructor(public router: Router, private authService: AuthService) {
    this.authService.userRole$.subscribe(role => {
      this.userRole = role;
    });
  }

  get isLoginPage(): boolean {
    return this.router.url === '/' || this.router.url === '/login';
  }

  logout(): void {
    this.authService.clearRole();
    localStorage.clear();
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/login']);
    });
  }
}
