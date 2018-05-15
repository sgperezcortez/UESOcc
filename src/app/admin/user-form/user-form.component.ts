import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { FileService } from '../../services/file.service';
import { AppUsersService } from './../../services/app-users.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
  form;
  hide=true;
  isAdmin = false;
  
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private fileService: FileService,
    private appUsersService: AppUsersService,
    public dialogRef: MatDialogRef<UserFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.form = fb.group({
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.maxLength(5)]],
    // password: ['', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*?[\@\*\$])[a-zA-Z\d\@\*\$]{6,}$/)]],
      isAdmin: [false, Validators.required],
    // birthDate: [null, [CustomValidators.date, CustomValidators.minDate('1960-01-01'), CustomValidators.maxDate('2010-01-01')]],
    // profileImage: ['', CustomValidators.url]
    })
  }

  ngOnInit() {
  }

  get firstName() {
    return this.form.get('firstName');
  }

  get LastName() {
    return this.form.get('lastName');
  }

  get email() {
    return this.form.get('email');
  }

  get password() {
    return this.form.get('password');
  }

  // getImageUrl($event) {
  //   this.imageUrl = this.baseUrl + $event;
  //   this.form.patchValue({
  //     profileImage: this.imageUrl
  //   })
  // }

  // refreshImages(status){
  //   if (status == true){
  //     this.uploadStatusMessage=  "Imagen subida al servidor como:";
  //     this.isSaved=true;
  //   }
  // }

  onSaveUser() : void{
    this.appUsersService.create(this.form.value)
      .subscribe(result => {        
        this.dialogRef.close("Usuario Guardado satisfactoriamente")
      });
  }


  
  onCancel() : void{
    this.dialogRef.close('Operación cancelada');
  }

  onNoClick() : void {
    this.dialogRef.close();
  }
  
}
