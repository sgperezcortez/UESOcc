import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { UsersService } from '../../../services/users.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  public user:any;
  constructor(
    private authService: AuthService) { }

  ngOnInit() {
    this.user = this.authService.currentUser;
  }

  socialProfile() {
    console.log(this.authService.currentUser.socialProfile);
    return this.authService.currentUser.socialProfile;
  }

  getUser(){
    const user_id = this.authService.currentUser.sub;
    console.log(user_id);
  }
}
