import { AuthService } from '../services/auth.service';
import { Injectable } from '@angular/core';
import { Router, CanActivate, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  canActivate(route, state: RouterStateSnapshot) {
    let user = this.authService.currentUser;
    if ( user && user.isAdmin ) return true;
    
    this.router.navigate(['/no-access']);
    return false;
  }
}