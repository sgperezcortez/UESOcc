import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from './../services/auth.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form;
  hide=true;
  isInvalid = false;
  user;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router) {
    this.form = fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*?[\@\*\$])[a-zA-Z\d\@\*\$]{6,}$/)]]
    });
  }

  ngOnInit() {
    this.authService.logout();
  }

  get email() {
    return this.form.get('email');
  }

  get password(){
    return this.form.get('password');
  }

  login() {
    if (this.form.value.email === '' && this.form.value.password === '') {
      this.isInvalid = true;
    } else {
      this.authService.login(this.form.value)
        .subscribe(result => {
          let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
          this.router.navigate([returnUrl || '/admin']);
        }, error => {
          this.isInvalid = true;
        });
    }
  }

  logout() {
    this.authService.logout();
    this.user = null;
  }
}
