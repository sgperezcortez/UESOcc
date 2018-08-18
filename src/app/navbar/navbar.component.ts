import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit{
  userId: string;
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    // this.userId = this.authService.currentUser.sub;
    // console.log(this.userId);
  }

  onLogout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
