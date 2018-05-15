import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { AuthHttp } from 'angular2-jwt';
import { AppUsersService } from './../../services/app-users.service';
import { AppUser } from './../../models/app-user.model';
import { MatTableDataSource } from '@angular/material';
import { Observable } from 'rxjs/Rx';
import { UserFormComponent } from '../user-form/user-form.component';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  appUser : AppUser[];
  dialogResult = "";
  displayedColumns = ['Nombre', 'Apellido', 'Email', 'Acciones'];
  dataSource;
  
  constructor(
    private appUsersService: AppUsersService,
    public dialog: MatDialog
  ) { }
  
  ngOnInit() {
    this.appUsersService.getAll()
    .subscribe(response => {
      this.appUser = response.users;
      this.dataSource = new MatTableDataSource(this.appUser);
    });
  }

  getUsers():void{
    this.appUsersService.getAll()
    .subscribe(response => {
      this.appUser = response.users;
      this.dataSource = new MatTableDataSource(this.appUser);
    });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  openDialog():void {
    let dialogRef = this.dialog.open(UserFormComponent, {
      width: '800px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      this.dialogResult = result;
      this.getUsers();
    })
  }
}   
