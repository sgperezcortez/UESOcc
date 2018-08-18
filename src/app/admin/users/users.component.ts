import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { AuthHttp } from 'angular2-jwt';
import { UsersService } from '../../services/users.service';
import { User } from '../../models/user.model';
import { MatTableDataSource } from '@angular/material';
import { Observable } from 'rxjs';
import { UserFormComponent } from './user-form/user-form.component';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  appUser : User[];
  dialogResult = "";
  displayedColumns = ['Nombre', 'Apellido', 'Email', 'Acciones'];
  dataSource;
  
  constructor(
    private appUsersService: UsersService,
    public dialog: MatDialog
  ) { }
  
  ngOnInit() {
    this.getUsers();
  }

  getUsers():void{
    this.appUsersService.getAll()
    .subscribe(response => {
      this.appUser = response.usersList;
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
      this.dialogResult = result;
      this.getUsers();
    })
  }
}   
