import { User } from 'src/app/models/User';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { UserViewModel } from 'src/app/models/UsersViewModel';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css'],
})
export class UserDetailsComponent {
  userId!: number;
  userDetails!: User;
  // userDetails!: UserViewModel;
  constructor(
    private activatedRoute: ActivatedRoute,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe((val) => {
      this.userId = val['id'];
      this.fetchUserDetails(this.userId);
    });
  }

  fetchUserDetails(userId: number) {
    this.userService
      .GetUsersById(userId)
      //  this.userService.GetUsersListById(userId)
      .subscribe({
        next: (res) => {
          this.userDetails = res;
          console.log(res);
        },
        error: (err) => {
          console.log(err);
        },
      });
  }
}
