import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RequestService } from 'src/app/services/request.service';
import { Request } from 'src/app/models/Request';
import { UserRequestViewModel } from 'src/app/models/UserRequestViewModel';
import { AuthService } from 'src/app/services/auth.service';
import { filter, fromEvent, take } from 'rxjs';
import { Comment } from 'src/app/models/Comment';
import { CommentService } from 'src/app/services/comment.service';
@Component({
  selector: 'app-request-details',
  templateUrl: './request-details.component.html',
  styleUrls: ['./request-details.component.css']
})
export class RequestDetailsComponent implements OnInit{
  reqId!: number;
  reqDetails: UserRequestViewModel = new UserRequestViewModel;
  showCommentBox = false;
  comment = '';
  comm = new Comment();
  public comments:Comment[]=[];
  // userDetails!: UserViewModel;
  constructor(
    private activatedRoute: ActivatedRoute,
    private reqService: RequestService,
    private authservice:AuthService,
    private router:Router,
    private commentService:CommentService
  ) {}

  // ngOnInit() {
  //   this.activatedRoute.params.subscribe((val) => {
  //     this.reqId = val['id'];
  //     if(this.authservice.getUserRole()=="Employee"){
  //       this.commentService.GetCommentsByRequestId(this.reqId).subscribe((res)=>{
  //       this.comments=res;
  //       console.log(res)
  //       });
  //     }
  //     this.fetchRequestDetails(this.reqId);

  //   });
  // }
  ngOnInit() {
    this.activatedRoute.params.subscribe((val) => {
      this.reqId = val['id'];
  
      if (this.authservice.getUserRole() === "Employee") {
        this.commentService.GetCommentsByRequestId(this.reqId).subscribe((res) => {
          this.comments = res;
          console.log(res);
          console.log(this.comments)
        });
      }
  
      this.fetchRequestDetails(this.reqId);
    });
  }

  // fetchRequestDetails(reqId: number) {
  //   this.reqService
  //     .GetUserRequestDetail(reqId)
  //     //  this.userService.GetUsersListById(userId)
  //     .subscribe({
  //       next: (res) => {
  //         this.reqDetails = res;
  //         console.log(res);
  //       },
  //       error: (err) => {
  //         console.log(err);
  //       },
  //     });
  // }
  fetchRequestDetails(reqId: number) {
    this.reqService.GetUserRequestDetail(reqId).subscribe({
      next: (res) => {
        this.reqDetails = res;
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      },
    });
  
    if (this.authservice.getUserRole() === "Employee") {
      this.commentService.GetCommentsByRequestId(this.reqId).subscribe((res) => {
        this.comments = res;
        console.log(res);
        console.log(this.comments)
      });
    }
  }
  

updatedreq = new Request();
req:any;
Approve(reqId:number){
this.reqService.GetRequestById(reqId).subscribe((data)=>{
this.req = data;
console.log(this.req);
this.updatedreq={
  requestId:reqId,
  userId :this.req.userId,
  projectId:this.req.projectId,
  reasonForTraveling:this.req.reasonForTraveling,
  status:"approved",
  managerId:this.req.managerId,
  documentId:this.req.documentId,
  AadharNumber:this.req.aadharNumber,
  createdBy:this.req.createdBy,
  createdDate:this.req.createdDate,
  modifiedBy:this.authservice.getUserName(),
  modifiedDate:Date.now,
  isActive:true,
}
this.reqService.UpdateRequest(reqId,this.updatedreq).subscribe({
  next: (res) => {
    console.log(res);
this.router.navigate(['/requests']);
  },
  error: (err) => {
    console.log(err);
  },
});
});
}
Reject(reqId: number) {
  this.showCommentBox = true; // Enable the comment box

  // Handle the Enter key press event
  const commentBoxSubscription = fromEvent<KeyboardEvent>(document, 'keyup')
    .pipe(
      filter((event: KeyboardEvent) => event.key === 'Enter'),
      take(1)
    )
    .subscribe(() => {
      // Retrieve the value from the comment box
      this.comm = {
        id: 0,
        requestId: reqId,
        commentName : this.comment,
        createdBy:this.authservice.getUserName(),
        createdDate : Date.now,
        isActive:true
      };
      console.log(this.comm)
      this.commentService.AddComment(this.comm).subscribe((res)=>{
        console.log(res);
      });

      // Unsubscribe from the Enter key press event
      commentBoxSubscription.unsubscribe();

      this.reqService.GetRequestById(reqId).subscribe((data) => {
        this.req = data;
        console.log(this.req);
        this.updatedreq = {
          requestId: reqId,
          userId: this.req.userId,
          projectId: this.req.projectId,
          reasonForTraveling: this.req.reasonForTraveling,
          status: "rejected",
          managerId: this.req.managerId,
          documentId: this.req.documentId,
          AadharNumber: this.req.aadharNumber,
          createdBy: this.req.createdBy,
          createdDate: this.req.createdDate,
          modifiedBy: this.authservice.getUserName(),
          modifiedDate: Date.now,
          isActive: true
        };
        this.reqService.UpdateRequest(reqId, this.updatedreq).subscribe({
          next: (res) => {
            this.router.navigate(['/requests']);
          },
          error: (err) => {
            console.log(err);
          },
        });
      });
    });
}
// Reject(reqId:number){
//     this.reqService.GetRequestById(reqId).subscribe((data)=>{
//       this.req = data;
//       console.log(this.req);
//       this.updatedreq={
//         requestId:reqId,
//         userId :this.req.userId,
//         projectId:this.req.projectId,
//         reasonForTraveling:this.req.reasonForTraveling,
//         status:"rejected",
//         managerId:this.req.managerId,
//         documentId:this.req.documentId,
//         AadharNumber:this.req.aadharNumber,
//         createdBy:this.req.createdBy,
//         createdDate:this.req.createdDate,
//         modifiedBy:this.authservice.getUserName(),
//         modifiedDate:Date.now,
//         isActive:true,
//       }
//       this.reqService.UpdateRequest(reqId,this.updatedreq).subscribe({
//         next: (res) => {
//           console.log(res);
//       this.router.navigate(['/requests']);
//         },
//         error: (err) => {
//           console.log(err);
//         },
//       });
//       });
//   }
  // Return(reqId:number){
  //   this.showCommentBox = !this.showCommentBox;
  //   this.reqService.GetRequestById(reqId).subscribe((data)=>{
  //     this.req = data;
  //     console.log(this.req);
  //     this.updatedreq={
  //       requestId:reqId,
  //       userId :this.req.userId,
  //       projectId:this.req.projectId,
  //       reasonForTraveling:this.req.reasonForTraveling,
  //       status:"returned",
  //       managerId:this.req.managerId,
  //       documentId:this.req.documentId,
  //       AadharNumber:this.req.aadharNumber,
  //       createdBy:this.req.createdBy,
  //       createdDate:this.req.createdDate,
  //       modifiedBy:this.authservice.getUserName(),
  //       modifiedDate:Date.now,
  //       isActive:true,
  //     }
  //     this.reqService.UpdateRequest(reqId,this.updatedreq).subscribe({
  //       next: (res) => {
  //         console.log(res);
  //     // this.router.navigate(['/requests']);
  //       },
  //       error: (err) => {
  //         console.log(err);
  //       },
  //     });
  //     });
  // }
  Return(reqId: number) {
    this.showCommentBox = true; // Enable the comment box
  
    // Handle the Enter key press event
    const commentBoxSubscription = fromEvent<KeyboardEvent>(document, 'keyup')
      .pipe(
        filter((event: KeyboardEvent) => event.key === 'Enter'),
        take(1)
      )
      .subscribe(() => {
        // Retrieve the value from the comment box
        this.comm = {
          id: 0,
          requestId: reqId,
          commentName : this.comment,
          createdBy:this.authservice.getUserName(),
          createdDate : Date.now,
          isActive:true
        };
        console.log(this.comm)
        this.commentService.AddComment(this.comm).subscribe((res)=>{
          console.log(res);
        });
  
        // Unsubscribe from the Enter key press event
        commentBoxSubscription.unsubscribe();
  
        this.reqService.GetRequestById(reqId).subscribe((data) => {
          this.req = data;
          console.log(this.req);
          this.updatedreq = {
            requestId: reqId,
            userId: this.req.userId,
            projectId: this.req.projectId,
            reasonForTraveling: this.req.reasonForTraveling,
            status: "returned",
            managerId: this.req.managerId,
            documentId: this.req.documentId,
            AadharNumber: this.req.aadharNumber,
            createdBy: this.req.createdBy,
            createdDate: this.req.createdDate,
            modifiedBy: this.authservice.getUserName(),
            modifiedDate: Date.now,
            isActive: true
          };
          this.reqService.UpdateRequest(reqId, this.updatedreq).subscribe({
            next: (res) => {
              this.router.navigate(['/requests']);
            },
            error: (err) => {
              console.log(err);
            },
          });
        });
      });
  }
  
  getUserRole():string{
    return this.authservice.getUserRole();
  }
}
