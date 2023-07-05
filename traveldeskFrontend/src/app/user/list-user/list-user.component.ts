import { Router } from '@angular/router';
import { User } from 'src/app/models/User';
import { UserViewModel } from 'src/app/models/UsersViewModel';
import { UserService } from 'src/app/services/user.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { NgConfirmService } from 'ng-confirm-box';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css'],
})
export class ListUserComponent implements OnInit {
  // public users!: User[];
  public users!: UserViewModel[];
  // dataSource!: MatTableDataSource<User>;
  dataSource!: MatTableDataSource<UserViewModel>;

  // displayedColumns: string[] = ['id', 'firstName', 'lastName', 'email', 'contactNumber', 'managerId', 'departmentId', 'roleId', 'createdBy', 'action'];

  displayedColumns: string[] = [
    'id',
    'firstName',
    'lastName',
    'email',
    'managerId',
    'departmentId',
    'roleId',
    'action',
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private userService: UserService,
    private router: Router,
    private confirmService: NgConfirmService,
    private toastService: NgToastService
  ) {}

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    // this.userService.GetUsers()
    this.userService.GetUsersList().subscribe({
      next: (res) => {
        this.users = res;
        this.dataSource = new MatTableDataSource(this.users);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  edit(id: number) {
    this.router.navigate(['updateUser', id]);
  }

  deleteUser(id: number) {
    this.confirmService.showConfirm(
      'Are you sure want to Delete?',
      () => {
        //your logic if Yes clicked
        this.userService.DeleteUserBy(id).subscribe({
          next: (res) => {
            this.toastService.success({
              detail: 'SUCCESS',
              summary: 'Deleted Successfully',
              duration: 3000,
            });
            this.getUsers();
          },
          error: (err) => {
            this.toastService.error({
              detail: 'ERROR',
              summary: 'Something went wrong!',
              duration: 3000,
            });
          },
        });
      },
      () => {
        //yor logic if No clicked
      }
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
