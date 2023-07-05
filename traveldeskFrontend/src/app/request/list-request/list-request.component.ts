import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { NgConfirmService } from 'ng-confirm-box';
import { UserRequestViewModel } from 'src/app/models/UserRequestViewModel';
import { AuthService } from 'src/app/services/auth.service';
import { RequestService } from 'src/app/services/request.service';

@Component({
  selector: 'app-list-request',
  templateUrl: './list-request.component.html',
  styleUrls: ['./list-request.component.css']
})
export class ListRequestComponent {
  public reqs!: UserRequestViewModel[];
  dataSource!: MatTableDataSource<UserRequestViewModel>;


  displayedColumns: string[] = [
    'id',
    'userName',
    'managerName',
    'departmentName',
    'projectName',
    'reasonForTravelling',
    'status',
    'action',
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private authService: AuthService,
    private reqService:RequestService,
    private router: Router,
    private confirmService: NgConfirmService,
    private toastService: NgToastService
  ) {}

  ngOnInit() {
    if(this.authService.getUserRole()=="Employee"){
    this.getUserRequests(this.authService.getUserId());
    }
    else if(this.authService.getUserRole()=="Manager"){
      this.getManagerRequests(this.authService.getUserId());
    }
    else{
      this.getHRAdminRequests();
    }
  }

  getUserRequests(id:number) {
    // this.userService.GetUsers()
    this.reqService.GetUserRequestsList(id).subscribe({
      next: (res) => {
        this.reqs = res;
        this.dataSource = new MatTableDataSource(this.reqs);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  getManagerRequests(id:number) {
    // this.userService.GetUsers()
    this.reqService.GetManagerRequestsList(id).subscribe({
      next: (res) => {
        this.reqs = res;
        this.dataSource = new MatTableDataSource(this.reqs);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  getHRAdminRequests() {
    // this.userService.GetUsers()
    this.reqService.GetHRAdminRequestsList().subscribe({
      next: (res) => {
        this.reqs = res;
        this.dataSource = new MatTableDataSource(this.reqs);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  edit(id: number) {
    this.router.navigate(['updateRequest', id]);
  }

  deleteRequest(id: number) {
    this.confirmService.showConfirm(
      'Are you sure want to Delete?',
      () => {
        //your logic if Yes clicked
        this.reqService.DeleteRequestById(id).subscribe({
          next: (res) => {
            this.toastService.success({
              detail: 'SUCCESS',
              summary: 'Deleted Successfully',
              duration: 3000,
            });
            this.getUserRequests(this.authService.getUserId());
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
  getUserRole(): string {
    // console.log(this.authService.getUserRole)
    return this.authService.getUserRole();
  }
}
