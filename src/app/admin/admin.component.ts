import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  constructor(private authService: AuthService) { }

  isAdmin() {
    if (this.authService.currentUser.isAdmin) {
      return true;
    } else return false;
  }

  ngOnInit() {
    let user = this.authService.currentUser;
  }

}
