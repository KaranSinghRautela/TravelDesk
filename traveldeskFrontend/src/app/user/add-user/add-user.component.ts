import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { ActivatedRoute, Route, Router } from '@angular/router';
import { User } from 'src/app/models/User';
import { Manager } from 'src/app/models/Manager';
import { Roles } from 'src/app/models/Roles';
import { UserService } from 'src/app/services/user.service';
import { NgToastService } from 'ng-angular-popup';
import { CommonserviceService } from 'src/app/services/commonservices.service';
import { Department } from 'src/app/models/Department';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css'],
})
export class AddUserComponent implements OnInit {
  dataForm!: FormGroup;
  //  user !: User ;

  roles: Roles[] = [];
  departments: Department[] = [];
  managers: Manager[] = [];

  private userIdToUpdate!: number;
  public isUpdateActive: boolean = false;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private toastService: NgToastService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private commonService: CommonserviceService
  ) {}

  ngOnInit(): void {
    this.GetRoles();
    this.GetManagerList();
    this.GetDepartmentList();

    this.dataForm = this.fb.group({
      firstName: [''],
      lastName: [''],
      email: [''],
      contactNumber: [''],
      managerId: [null],
      departmentId: [''],
      roleId: [''],
      password: [''],
      createdBy: [''],
    });

    this.activatedRoute.params.subscribe((val) => {
      this.userIdToUpdate = val['id'];
      if (this.userIdToUpdate) {
        this.isUpdateActive = true;
        this.userService.GetUsersById(this.userIdToUpdate).subscribe({
          next: (res) => {
            this.fillFormToUpdate(res);
          },
          error: (err) => {
            console.log(err);
          },
        });
      }
    });
  }

  GetRoles() {
    this.commonService.GetRoles().subscribe((res) => {
      this.roles = res;
      console.log(this.roles);
    });
  }

  GetManagerList() {
    this.userService.GetManagerList().subscribe(
      (res) => {
        this.managers = res;
        console.log(this.managers);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  GetDepartmentList() {
    this.commonService.GetDepartment().subscribe(
      (res) => {
        this.departments = res;
        console.log(this.departments);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  submit() {
    this.userService.AddUser(this.dataForm.value).subscribe((res) => {
      this.toastService.success({
        detail: 'SUCCESS',
        summary: 'Registration Successful',
        duration: 3000,
      });
      this.dataForm.reset();
      this.router.navigate(['/userList']);
    });
  }

  updateUser() {
    this.userService
      .EditUser(this.userIdToUpdate, this.dataForm.value)
      .subscribe((res) => {
        this.toastService.success({
          detail: 'SUCCESS',
          summary: 'User Details Updated Successful',
          duration: 3000,
        });
        this.router.navigate(['/userList']);
        this.dataForm.reset();
      });
  }

  fillFormToUpdate(user: User) {
    console.log('in the fill form ');
    this.dataForm.setValue({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      contactNumber: user.contactNumber,
      managerId: user.managerId,
      departmentId: user.departmentId,
      roleId: user.roleId,
      password: user.password,
      createdBy: user.createdBy,
    });
  }
}
